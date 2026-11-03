import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const VALID_VOICES = new Set(["Puck", "Charon", "Kore", "Fenrir", "Zephyr"]);

interface DialogueTurn {
  speaker: string;
  text: string;
  style?: string;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "2mb" }));

  // Single-speaker and Multi-speaker TTS endpoint using gemini-3.8-flash-tts
  app.post("/api/tts", async (req, res) => {
    try {
      const {
        mode = "single",
        text,
        voiceName = "Kore",
        style = "Warm, articulate literary storyteller with gentle pacing and emotional clarity",
        turns,
        speakers,
      } = req.body as {
        mode?: "single" | "dialogue";
        text?: string;
        voiceName?: string;
        style?: string;
        turns?: DialogueTurn[];
        speakers?: {
          speaker: string;
          voiceName: string;
        }[];
      };

      const selectedVoice = VALID_VOICES.has(voiceName) ? voiceName : "Kore";

      if (mode === "dialogue" && Array.isArray(turns) && turns.length > 0 && Array.isArray(speakers) && speakers.length === 2) {
        const parts = turns.map((turn) => ({
          text: `${turn.speaker}: ${turn.text}`,
          speechMetadata: {
            speaker: turn.speaker,
            style: turn.style || style,
          },
        }));

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash-tts",
          contents: [
            {
              role: "user",
              parts,
            },
          ],
          config: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              multiSpeakerVoiceConfig: {
                speakerVoiceConfigs: speakers.map((sp) => ({
                  speaker: sp.speaker,
                  voiceConfig: {
                    prebuiltVoiceConfig: {
                      voiceName: VALID_VOICES.has(sp.voiceName) ? sp.voiceName : "Kore",
                    },
                  },
                })),
              },
            },
          },
        });

        const base64Audio =
          response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

        if (!base64Audio) {
          res.status(502).json({
            error: "No audio data was returned from gemini-3.8-flash-tts.",
          });
          return;
        }

        res.json({
          audioBase64: base64Audio,
          mimeType: "audio/wav",
          model: "gemini-3.8-flash-tts",
        });
        return;
      }

      if (!text || typeof text !== "string" || !text.trim()) {
        res.status(400).json({ error: "Please provide non-empty text to synthesize." });
        return;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash-tts",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: text.trim(),
                speechMetadata: {
                  style,
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: selectedVoice,
              },
            },
          },
        },
      });

      const base64Audio =
        response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (!base64Audio) {
        res.status(502).json({
          error: "No audio data was returned from gemini-3.8-flash-tts.",
        });
        return;
      }

      res.json({
        audioBase64: base64Audio,
        mimeType: "audio/wav",
        model: "gemini-3.8-flash-tts",
      });
    } catch (error: unknown) {
      console.error("Gemini TTS Error:", error);
      const errMessage =
        error instanceof Error ? error.message : "Failed to synthesize speech.";
      res.status(500).json({
        error: errMessage,
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
