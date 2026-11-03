import React, { useState, useRef, useEffect } from "react";
import {
  Volume2,
  Pause,
  Play,
  RotateCcw,
  Download,
  AlarmClock,
  Sparkles,
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  Award,
  Languages,
  ChevronRight,
  Mic,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  URDU_ALARM_STORY,
  COMPANION_ENGLISH_STORY,
  StoryPassage,
  DramatizedDialogueScene,
} from "./data/stories";

type LanguageDisplayMode = "urdu" | "bilingual" | "english";
type VoiceName = "Kore" | "Puck" | "Charon" | "Fenrir" | "Zephyr";

interface VoiceOption {
  id: VoiceName;
  labelUrdu: string;
  labelEnglish: string;
  timbre: string;
}

const VOICE_OPTIONS: VoiceOption[] = [
  {
    id: "Kore",
    labelUrdu: "کورے (Kore)",
    labelEnglish: "Kore — Warm & Expressive Storyteller",
    timbre: "Warm, articulate narrative voice",
  },
  {
    id: "Puck",
    labelUrdu: "پک (Puck)",
    labelEnglish: "Puck — Lively & Humorous (Ahmed)",
    timbre: "Bright, spirited, youthful tone",
  },
  {
    id: "Charon",
    labelUrdu: "کیرون (Charon)",
    labelEnglish: "Charon — Calm & Dignified (Mr. Khalid)",
    timbre: "Deep, composed teacher persona",
  },
  {
    id: "Fenrir",
    labelUrdu: "فینریر (Fenrir)",
    labelEnglish: "Fenrir — Steady & Encouraging (Ali)",
    timbre: "Clear, resolute friend persona",
  },
  {
    id: "Zephyr",
    labelUrdu: "زیفر (Zephyr)",
    labelEnglish: "Zephyr — Gentle Evening Reader",
    timbre: "Soft, soothing literary cadence",
  },
];

const STYLE_PRESETS = [
  {
    id: "storyteller",
    labelUrdu: "روایتی داستان گو (Warm Storyteller)",
    prompt:
      "Warm, expressive Urdu literary storyteller with clear pronunciation, gentle humor, and engaging pacing",
  },
  {
    id: "comedic",
    labelUrdu: "شوخ اور مزاحیہ انداز (Playful & Witty)",
    prompt:
      "Playful, lighthearted, and cheerful storytelling tone capturing the humor of Ahmed and his mischievous alarm clock",
  },
  {
    id: "orator",
    labelUrdu: "پرجوش تقریری انداز (School Speech Orator)",
    prompt:
      "Confident, inspiring school auditorium speaker delivering a speech on the importance of time with clarity and conviction",
  },
  {
    id: "calm",
    labelUrdu: "پرسکون مطالعہ (Calm Bedtime Reader)",
    prompt:
      "Soft, unhurried, soothing bedtime story narrator with warm emotional resonance",
  },
];

const SPEECH_QUIZ_STEPS = [
  {
    id: "q1",
    promptUrdu: "احمد کے اسکول میں ہونے والے تقریری مقابلے کا موضوع کیا تھا؟",
    promptEnglish: "What was the topic of the school speech competition?",
    options: [
      { urdu: "وقت کی اہمیت", english: "The Importance of Time", correct: true },
      { urdu: "صحت اور صفائی", english: "Health and Hygiene", correct: false },
      { urdu: "میرا پسندیدہ کھیل", english: "My Favorite Sport", correct: false },
    ],
    explanationUrdu: "درست جواب! تقریری مقابلے کا موضوع \"وقت کی اہمیت\" تھا جس میں علی نے پہلا انعام جیتا۔",
  },
  {
    id: "q2",
    promptUrdu: "جب استاد مسٹر خالد نے دیر سے آنے کی وجہ پوچھی تو احمد نے کیا بہانہ بنایا؟",
    promptEnglish: "What excuse did Ahmed give Mr. Khalid for arriving late?",
    options: [
      {
        urdu: "سر! میری الارم گھڑی مجھ سے پہلے جاگ گئی تھی، لیکن مجھے جگانا بھول گئی!",
        english: "My alarm clock woke up before me, but forgot to wake me up!",
        correct: true,
      },
      {
        urdu: "سر! راستے میں ٹریفک بہت زیادہ تھی۔",
        english: "There was heavy traffic on the way.",
        correct: false,
      },
      {
        urdu: "سر! گھڑی کے سیل ختم ہو گئے تھے۔",
        english: "The clock batteries ran out.",
        correct: false,
      },
    ],
    explanationUrdu: "بالکل درست! احمد کے اس معصومانہ اور مزاحیہ جملے پر پوری کلاس اور علی بھی ہنس پڑے۔",
  },
  {
    id: "q3",
    promptUrdu: "احمد نے اپنی تقریر کے آخر میں سب سے اہم سبق کیا بیان کیا؟",
    promptEnglish: "What key lesson did Ahmed share at the end of his speech?",
    options: [
      {
        urdu: "الارم گھڑی کو بند کرنے سے وقت نہیں رکتا، اس لیے سستی چھوڑ کر محنت کرنی چاہیے!",
        english: "Turning off the alarm clock does not stop time—we must leave laziness and work hard!",
        correct: true,
      },
      {
        urdu: "ہمیں دو الارم گھڑیاں خریدنی چاہئیں۔",
        english: "We should buy two alarm clocks.",
        correct: false,
      },
      {
        urdu: "تقریر ایک رات پہلے یاد کرنی چاہیے۔",
        english: "Speeches should be memorized in one night.",
        correct: false,
      },
    ],
    explanationUrdu: "شاباش! اس سچے اور خوبصورت پیغام پر پورا اسکول ہال تالیوں سے گونج اٹھا۔",
  },
];

export default function App() {
  // Display & Story State
  const [activeEdition, setActiveEdition] = useState<"urdu-alarm" | "english-determination">("urdu-alarm");
  const [languageMode, setLanguageMode] = useState<LanguageDisplayMode>("urdu");
  const [ttsLanguage, setTtsLanguage] = useState<"urdu" | "english">("urdu");
  const [selectedVoice, setSelectedVoice] = useState<VoiceName>("Kore");
  const [selectedStyleId, setSelectedStyleId] = useState<string>("storyteller");
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  // Audio Playback State
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullStoryQueueActive, setIsFullStoryQueueActive] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [lastAudioDataUrl, setLastAudioDataUrl] = useState<string | null>(null);
  const [lastAudioLabel, setLastAudioLabel] = useState<string>("");

  // Cache synthesized audio clips by key so re-playing is instant
  const audioCacheRef = useRef<Map<string, string>>(new Map());
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const queueIndexRef = useRef<number>(-1);
  const isQueueRunningRef = useRef<boolean>(false);

  // Custom TTS Studio State
  const [customStudioText, setCustomStudioText] = useState<string>(
    "دوستو! میں نے یہ سیکھا ہے کہ الارم گھڑی کو بند کرنے سے وقت نہیں رکتا، اس لیے ہمیں سستی چھوڑ کر محنت کرنی چاہیے!"
  );

  // Interactive 6:00 AM Alarm Clock & Morning Habit Simulator State
  const [alarmTime, setAlarmTime] = useState<string>("06:00 AM");
  const [isAlarmRinging, setIsAlarmRinging] = useState<boolean>(false);
  const [alarmDecision, setAlarmDecision] = useState<"none" | "snooze" | "wakeup">("none");
  const [streakDays, setStreakDays] = useState<number>(5);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [imageFallbackMap, setImageFallbackMap] = useState<Record<string, boolean>>({});

  const currentStylePrompt =
    STYLE_PRESETS.find((s) => s.id === selectedStyleId)?.prompt ||
    STYLE_PRESETS[0].prompt;

  // Web Audio API synthesized mechanical twin-bell alarm sound ("ٹرررر! ٹرررر!")
  const triggerAlarmBellSound = () => {
    setIsAlarmRinging(true);
    setAlarmDecision("none");
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      for (let burst = 0; burst < 3; burst++) {
        const burstStart = now + burst * 0.42;
        for (let strike = 0; strike < 6; strike++) {
          const t = burstStart + strike * 0.05;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(strike % 2 === 0 ? 1180 : 1480, t);
          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.048);
        }
      }

      setTimeout(() => {
        setIsAlarmRinging(false);
      }, 1500);
    } catch {
      setTimeout(() => {
        setIsAlarmRinging(false);
      }, 1200);
    }
  };

  const stopCurrentAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsFullStoryQueueActive(false);
    isQueueRunningRef.current = false;
  };

  useEffect(() => {
    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
    };
  }, []);

  const playAudioDataUrl = (
    dataUrl: string,
    id: string,
    label: string,
    onEndedCallback?: () => void
  ) => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    const audio = new Audio(dataUrl);
    audio.playbackRate = playbackRate;
    audioElementRef.current = audio;
    setActiveAudioId(id);
    setLastAudioDataUrl(dataUrl);
    setLastAudioLabel(label);
    setIsPlaying(true);

    audio.onended = () => {
      setIsPlaying(false);
      if (onEndedCallback) {
        onEndedCallback();
      }
    };

    audio.onerror = () => {
      setIsPlaying(false);
      setAudioError("آڈیو چلانے میں دشواری پیش آئی۔ براہ کرم دوبارہ کوشش کریں۔");
    };

    audio.play().catch((err) => {
      console.error("Audio playback error:", err);
      setIsPlaying(false);
    });
  };

  const synthesizeAndPlaySingle = async (
    id: string,
    textToSpeak: string,
    label: string,
    styleOverride?: string,
    onEndedCallback?: () => void
  ) => {
    if (activeAudioId === id && isPlaying && audioElementRef.current) {
      audioElementRef.current.pause();
      setIsPlaying(false);
      setIsFullStoryQueueActive(false);
      isQueueRunningRef.current = false;
      return;
    }

    setAudioError(null);
    const styleToUse = styleOverride || currentStylePrompt;
    const cacheKey = `single:${selectedVoice}:${styleToUse}:${textToSpeak}`;

    const cachedUrl = audioCacheRef.current.get(cacheKey);
    if (cachedUrl) {
      playAudioDataUrl(cachedUrl, id, label, onEndedCallback);
      return;
    }

    setActiveAudioId(id);
    setIsGeneratingAudio(true);

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "single",
          text: textToSpeak,
          voiceName: selectedVoice,
          style: styleToUse,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.audioBase64) {
        throw new Error(
          data.error || "Gemini 3.8 Flash TTS failed to synthesize audio."
        );
      }

      const dataUrl = `data:${data.mimeType || "audio/wav"};base64,${data.audioBase64}`;
      audioCacheRef.current.set(cacheKey, dataUrl);
      setIsGeneratingAudio(false);
      playAudioDataUrl(dataUrl, id, label, onEndedCallback);
    } catch (err: unknown) {
      setIsGeneratingAudio(false);
      setIsFullStoryQueueActive(false);
      isQueueRunningRef.current = false;
      const msg =
        err instanceof Error
          ? err.message
          : "آڈیو تیار کرنے میں مسئلہ پیش آیا۔";
      setAudioError(msg);
    }
  };

  const synthesizeAndPlayDialogue = async (scene: DramatizedDialogueScene) => {
    const id = `scene-${scene.id}`;
    if (activeAudioId === id && isPlaying && audioElementRef.current) {
      audioElementRef.current.pause();
      setIsPlaying(false);
      return;
    }

    setAudioError(null);
    setIsFullStoryQueueActive(false);
    isQueueRunningRef.current = false;

    const cacheKey = `dialogue:${scene.id}`;
    const cachedUrl = audioCacheRef.current.get(cacheKey);
    if (cachedUrl) {
      playAudioDataUrl(cachedUrl, id, scene.urduTitle);
      return;
    }

    setActiveAudioId(id);
    setIsGeneratingAudio(true);

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "dialogue",
          speakers: scene.speakers.map((s) => ({
            speaker: s.speaker,
            voiceName: s.voiceName,
          })),
          turns: scene.turns.map((t) => ({
            speaker: t.speaker,
            text: t.text,
            style: t.style,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.audioBase64) {
        throw new Error(
          data.error || "Failed to generate dual-speaker dialogue."
        );
      }

      const dataUrl = `data:${data.mimeType || "audio/wav"};base64,${data.audioBase64}`;
      audioCacheRef.current.set(cacheKey, dataUrl);
      setIsGeneratingAudio(false);
      playAudioDataUrl(dataUrl, id, scene.urduTitle);
    } catch (err: unknown) {
      setIsGeneratingAudio(false);
      const msg =
        err instanceof Error
          ? err.message
          : "مکالمہ تیار کرنے میں مسئلہ پیش آیا۔";
      setAudioError(msg);
    }
  };

  // Full Story Sequential Narration Queue
  const allPassages: StoryPassage[] = URDU_ALARM_STORY.chapters.flatMap(
    (ch) => ch.passages
  );

  const playPassageAtQueueIndex = (index: number) => {
    if (!isQueueRunningRef.current || index >= allPassages.length) {
      setIsFullStoryQueueActive(false);
      isQueueRunningRef.current = false;
      queueIndexRef.current = -1;
      return;
    }

    queueIndexRef.current = index;
    const passage = allPassages[index];
    const textToSpeak =
      ttsLanguage === "urdu" ? passage.urduText : passage.englishText;

    const el = document.getElementById(`passage-card-${passage.id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    synthesizeAndPlaySingle(
      passage.id,
      textToSpeak,
      `پوری کہانی (${index + 1}/${allPassages.length})`,
      passage.speechStyle,
      () => {
        if (isQueueRunningRef.current) {
          playPassageAtQueueIndex(index + 1);
        }
      }
    );
  };

  const handleToggleFullStoryNarration = () => {
    if (isFullStoryQueueActive || isPlaying) {
      stopCurrentAudio();
      return;
    }
    setActiveEdition("urdu-alarm");
    setIsFullStoryQueueActive(true);
    isQueueRunningRef.current = true;
    playPassageAtQueueIndex(0);
  };

  const handlePlayChapter = (chapterIndex: number) => {
    const chapter = URDU_ALARM_STORY.chapters[chapterIndex];
    if (!chapter) return;
    const combinedText = chapter.passages
      .map((p) => (ttsLanguage === "urdu" ? p.urduText : p.englishText))
      .join(" ");
    setIsFullStoryQueueActive(false);
    isQueueRunningRef.current = false;
    synthesizeAndPlaySingle(
      `chapter-full-${chapter.id}`,
      combinedText,
      chapter.urduTitle
    );
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col">
      {/* Strict 3-Zone Top Navigation Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-[#E5DEC9] px-6 py-3.5">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-[#1C1917] font-editorial whitespace-nowrap shrink-0"
          >
            داستانِ وقت · Chronicle Editions
          </a>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]">
            <a
              href="#story-canvas"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              مکمل کہانی (Story)
            </a>
            <a
              href="#dramatized-studio"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              ڈرامائی مکالمے (Audio Studio)
            </a>
            <a
              href="#alarm-simulator"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              شرارتی الارم (6:00 AM Clock)
            </a>
            <a
              href="#morals-section"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              اخلاقی اسباق (Morals)
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              onClick={handleToggleFullStoryNarration}
              disabled={isGeneratingAudio && !isPlaying}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-60"
            >
              {isGeneratingAudio && isFullStoryQueueActive ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>آواز تیار ہو رہی ہے...</span>
                </>
              ) : isFullStoryQueueActive || isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>کہانی روکیں · Pause Narration</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>مکمل کہانی سنیں · Listen to Story</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main id="top" className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-10 space-y-16">
        {/* Operational Utility & Edition Switcher Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5DEC9]">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
            <span>کراچی، پاکستان</span>
            <span aria-hidden="true">·</span>
            <span>مصنفہ و انتخاب: تعلیمی کہانی سیریز</span>
            <span aria-hidden="true">·</span>
            <span>آواز: Gemini 3.8 Flash TTS</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">4 Chapters / 15 Passages</span>
          </div>

          {/* Interactive Edition & Language Mode Segmented Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-[#EFECE4] rounded-lg">
              <button
                onClick={() => setActiveEdition("urdu-alarm")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeEdition === "urdu-alarm"
                    ? "bg-white text-[#1C1917] shadow-xs"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                احمد، علی اور شرارتی الارم گھڑی (اردو)
              </button>
              <button
                onClick={() => setActiveEdition("english-determination")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeEdition === "english-determination"
                    ? "bg-white text-[#1C1917] shadow-xs"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                The Boy Who Never Gave Up (English)
              </button>
            </div>

            {activeEdition === "urdu-alarm" && (
              <div className="flex items-center gap-1 p-1 bg-[#EFECE4] rounded-lg">
                <button
                  onClick={() => {
                    setLanguageMode("urdu");
                    setTtsLanguage("urdu");
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    languageMode === "urdu"
                      ? "bg-white text-[#1C1917] shadow-xs"
                      : "text-[#57534E] hover:text-[#1C1917]"
                  }`}
                >
                  خالص اردو
                </button>
                <button
                  onClick={() => {
                    setLanguageMode("bilingual");
                    setTtsLanguage("urdu");
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    languageMode === "bilingual"
                      ? "bg-white text-[#1C1917] shadow-xs"
                      : "text-[#57534E] hover:text-[#1C1917]"
                  }`}
                >
                  اردو + English
                </button>
                <button
                  onClick={() => {
                    setLanguageMode("english");
                    setTtsLanguage("english");
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    languageMode === "english"
                      ? "bg-white text-[#1C1917] shadow-xs"
                      : "text-[#57534E] hover:text-[#1C1917]"
                  }`}
                >
                  English Translation
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Alert Banner if TTS fails */}
        {audioError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between gap-4 text-sm text-red-900">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-700 shrink-0" />
              <span>{audioError}</span>
            </div>
            <button
              onClick={() => setAudioError(null)}
              className="px-3 py-1 text-xs font-medium bg-white border border-red-200 rounded-md hover:bg-red-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              بند کریں · Dismiss
            </button>
          </div>
        )}

        {activeEdition === "urdu-alarm" ? (
          <>
            {/* Editorial Marquee Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left / RTL Right: Editorial Typography & Moral Callout */}
              <div
                dir="rtl"
                className="lg:col-span-6 flex flex-col justify-between bg-[#F3EFE6] border border-[#E5DEC9] rounded-2xl p-8 lg:p-10 text-right"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-xs text-[#78716C]">
                    <span>کراچی کی کہانی</span>
                    <span aria-hidden="true">·</span>
                    <span>وقت کی اہمیت</span>
                    <span aria-hidden="true">·</span>
                    <span>صوتی ایڈیشن</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1C1917] font-urdu-heading">
                    {URDU_ALARM_STORY.urduTitle}
                  </h1>

                  <p
                    dir="ltr"
                    className="text-base font-medium text-[#57534E] font-editorial italic text-right"
                  >
                    {URDU_ALARM_STORY.englishTitle}
                  </p>

                  {/* Moral Callout Box using top/bottom hairline borders (No thick left accent border) */}
                  <div className="py-5 border-y border-[#D6CEBE] space-y-2">
                    <p className="text-lg sm:text-xl font-bold text-[#9A3412] font-urdu">
                      {URDU_ALARM_STORY.urduMoralBanner}
                    </p>
                    <p
                      dir="ltr"
                      className="text-xs text-[#57534E] text-right"
                    >
                      {URDU_ALARM_STORY.englishMoralBanner}
                    </p>
                  </div>

                  <p className="text-base text-[#292524] font-urdu">
                    احمد بہت ذہین اور خوش مزاج لڑکا تھا، مگر صبح دیر تک سونے کی عادت اور اس کی نئی الارم گھڑی کے دلچسپ واقعات نے اسے اور اس کے دوست علی کو وقت کی اصل قیمت سکھا دی۔
                  </p>
                </div>

                {/* Primary Hero Actions & Voice Selector Bar */}
                <div className="pt-8 mt-8 border-t border-[#E5DEC9] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={handleToggleFullStoryNarration}
                      disabled={isGeneratingAudio && !isPlaying}
                      className="inline-flex items-center gap-2.5 px-5 py-3 text-sm font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-60"
                    >
                      {isGeneratingAudio && isFullStoryQueueActive ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>آڈیو بن رہی ہے...</span>
                        </>
                      ) : isFullStoryQueueActive || isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span>تلاوت روکیں (Pause)</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          <span>پوری کہانی آواز میں سنیں</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        triggerAlarmBellSound();
                        synthesizeAndPlaySingle(
                          "hero-alarm-line",
                          "صبح چھ بجے الارم بجنے لگا۔ ٹرررر! ٹرررر! ٹرررر! سر! میری الارم گھڑی مجھ سے پہلے جاگ گئی تھی، لیکن مجھے جگانا بھول گئی!",
                          "احمد کا مشہور جملہ",
                          "Playful, witty young boy speaking with innocent humor"
                        );
                      }}
                      className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#1C1917] bg-[#FBF9F5] hover:bg-white border border-[#D6CEBE] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <AlarmClock className="w-4 h-4 text-[#9A3412]" />
                      <span>ٹرررر! الارم اور احمد کا جملہ سنیں</span>
                    </button>
                  </div>

                  {/* Quick Voice & Language Selector */}
                  <div
                    dir="ltr"
                    className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#57534E]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#1C1917]">Narrator Voice:</span>
                      <select
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(e.target.value as VoiceName)}
                        className="bg-[#FBF9F5] border border-[#D6CEBE] rounded-md px-2.5 py-1 text-xs text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                      >
                        {VOICE_OPTIONS.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.labelEnglish}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span>Audio Lang:</span>
                      <button
                        onClick={() => setTtsLanguage("urdu")}
                        className={`px-2 py-0.5 rounded text-xs font-medium cursor-pointer whitespace-nowrap shrink-0 ${
                          ttsLanguage === "urdu"
                            ? "bg-[#1C1917] text-white"
                            : "bg-[#EFECE4] text-[#57534E]"
                        }`}
                      >
                        اردو آواز
                      </button>
                      <button
                        onClick={() => setTtsLanguage("english")}
                        className={`px-2 py-0.5 rounded text-xs font-medium cursor-pointer whitespace-nowrap shrink-0 ${
                          ttsLanguage === "english"
                            ? "bg-[#1C1917] text-white"
                            : "bg-[#EFECE4] text-[#57534E]"
                        }`}
                      >
                        English Voice
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Hero Artwork Plate with Fallback */}
              <div className="lg:col-span-6 flex flex-col justify-between bg-[#F3EFE6] border border-[#E5DEC9] rounded-2xl p-4 sm:p-6">
                <div className="relative w-full h-full min-h-[320px] rounded-xl overflow-hidden bg-[#EBE6DF] border border-[#D6CEBE]">
                  {!imageFallbackMap["hero"] ? (
                    <img
                      src={URDU_ALARM_STORY.heroImage}
                      alt="احمد صبح چھ بجے اپنی نئی الارم گھڑی کو بند کرتے ہوئے"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImageFallbackMap((prev) => ({ ...prev, hero: true }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#F3EFE6] to-[#E5DEC9]">
                      <AlarmClock className="w-12 h-12 text-[#9A3412] mb-3" />
                      <p className="font-urdu text-lg font-bold text-[#1C1917]">
                        احمد، علی اور شرارتی الارم گھڑی
                      </p>
                    </div>
                  )}
                </div>
                <div
                  dir="rtl"
                  className="pt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E]"
                >
                  <span className="font-urdu">
                    تصویر اول: کراچی کی صبح، چھ بجے کا الارم اور احمد کی میٹھی نیند۔
                  </span>
                  <span dir="ltr" className="font-mono text-[11px] text-[#78716C] tabular-nums">
                    PLATE 01 · 06:00 AM KARACHI
                  </span>
                </div>
              </div>
            </section>

            {/* Full-Width Key Story Characters & Values Strip */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div
                dir="rtl"
                className="p-5 rounded-xl bg-[#F3EFE6] border border-[#E5DEC9] space-y-1.5"
              >
                <div className="text-xs text-[#78716C]">مرکزی کردار · Protagonist</div>
                <div className="text-base font-bold text-[#1C1917] font-urdu-heading">
                  احمد (ذہین اور خوش مزاج)
                </div>
                <p className="text-xs text-[#57534E] font-urdu">
                  صبح دیر تک سونے کا عادی، مگر اپنی غلطی سے سیکھنے والا طالب علم۔
                </p>
              </div>

              <div
                dir="rtl"
                className="p-5 rounded-xl bg-[#F3EFE6] border border-[#E5DEC9] space-y-1.5"
              >
                <div className="text-xs text-[#78716C]">بہترین دوست · Best Friend</div>
                <div className="text-base font-bold text-[#1C1917] font-urdu-heading">
                  علی (وقت کا پابند)
                </div>
                <p className="text-xs text-[#57534E] font-urdu">
                  ہمیشہ وقت پر اسکول پہنچنے والا اور تقریری مقابلے کا پہلا انعام جیتنے والا دوست۔
                </p>
              </div>

              <div
                dir="rtl"
                className="p-5 rounded-xl bg-[#F3EFE6] border border-[#E5DEC9] space-y-1.5"
              >
                <div className="text-xs text-[#78716C]">خاندان اور استاد · Family & Mentor</div>
                <div className="text-base font-bold text-[#1C1917] font-urdu-heading">
                  مسز فاطمہ، عائشہ اور مسٹر خالد
                </div>
                <p className="text-xs text-[#57534E] font-urdu">
                  والدہ کا تحفہ، چھوٹی بہن عائشہ کی شرارت اور استاد مسٹر خالد کی رہنمائی۔
                </p>
              </div>

              <div
                dir="rtl"
                className="p-5 rounded-xl bg-[#F3EFE6] border border-[#E5DEC9] space-y-1.5"
              >
                <div className="text-xs text-[#78716C]">تقریری مقابلہ · Competition</div>
                <div className="text-base font-bold text-[#9A3412] font-urdu-heading">
                  موضوع: &quot;وقت کی اہمیت&quot;
                </div>
                <p className="text-xs text-[#57534E] font-urdu">
                  الارم گھڑی کو بند کرنے سے وقت نہیں رکتا — سستی چھوڑ کر محنت کریں۔
                </p>
              </div>
            </section>

            {/* Active Audio Player Bar (Sticky / Inline Controller when audio is ready or playing) */}
            {(isPlaying || isGeneratingAudio || lastAudioDataUrl) && (
              <section className="p-5 rounded-2xl bg-[#1C1917] text-[#FBF9F5] flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      if (isPlaying && audioElementRef.current) {
                        audioElementRef.current.pause();
                        setIsPlaying(false);
                      } else if (lastAudioDataUrl && activeAudioId) {
                        playAudioDataUrl(lastAudioDataUrl, activeAudioId, lastAudioLabel);
                      }
                    }}
                    disabled={isGeneratingAudio}
                    className="w-11 h-11 rounded-xl bg-[#9A3412] hover:bg-[#B45309] flex items-center justify-center text-white transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                    aria-label={isPlaying ? "Pause audio" : "Play audio"}
                  >
                    {isGeneratingAudio ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#A8A29E]">
                      <span>Gemini 3.8 Flash TTS</span>
                      <span aria-hidden="true">·</span>
                      <span>Voice: {selectedVoice}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{playbackRate}x Speed</span>
                    </div>
                    <p className="text-sm font-medium text-white mt-0.5">
                      {isGeneratingAudio
                        ? "نئی آواز تیار کی جا رہی ہے (Synthesizing Speech)..."
                        : lastAudioLabel || "آڈیو پلیئر تیار ہے"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Speed Controls */}
                  <div className="flex items-center gap-1 bg-[#292524] p-1 rounded-lg">
                    {[0.9, 1.0, 1.15].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => {
                          setPlaybackRate(rate);
                          if (audioElementRef.current) {
                            audioElementRef.current.playbackRate = rate;
                          }
                        }}
                        className={`px-2.5 py-1 text-xs font-mono tabular-nums rounded cursor-pointer whitespace-nowrap shrink-0 ${
                          playbackRate === rate
                            ? "bg-[#FBF9F5] text-[#1C1917] font-semibold"
                            : "text-[#D6D3D1] hover:text-white"
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>

                  {lastAudioDataUrl && (
                    <a
                      href={lastAudioDataUrl}
                      download={`ahmed-story-${activeAudioId || "clip"}.wav`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#292524] hover:bg-[#44403C] text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>WAV ڈاؤن لوڈ کریں</span>
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* Complete Illustrated Story Canvas (4 Chapters, Asymmetric Editorial Grid) */}
            <section id="story-canvas" className="space-y-14">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E5DEC9] pb-5">
                <div>
                  <div className="text-xs text-[#78716C] uppercase tracking-widest">
                    COMPLETE ILLUSTRATED TEXT & AUDIO NARRATION
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1 font-urdu-heading">
                    مکمل کہانی: احمد، علی اور شرارتی الارم گھڑی
                  </h2>
                </div>
                <p className="text-xs text-[#57534E]">
                  کسی بھی پیراگراف کے ساتھ موجود اسپیکر بٹن پر کلک کر کے اسے Gemini 3.8 Flash TTS کی آواز میں سنیں۔
                </p>
              </div>

              <div className="space-y-16">
                {URDU_ALARM_STORY.chapters.map((chapter, chapterIdx) => (
                  <article
                    key={chapter.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#E5DEC9] last:border-b-0"
                  >
                    {/* Margin Curatorial Rail & Illustration (35% / 5 cols on desktop) */}
                    <div className="lg:col-span-5 space-y-5">
                      <div className="flex items-center justify-between gap-2 text-xs text-[#78716C]">
                        <span className="font-mono uppercase tracking-wider">
                          {chapter.numberLabel}
                        </span>
                        <span>{chapter.settingLabel}</span>
                      </div>

                      <h3
                        dir="rtl"
                        className="text-2xl font-bold text-[#1C1917] font-urdu-heading text-right"
                      >
                        {chapter.urduTitle}
                      </h3>
                      <p className="text-sm text-[#57534E] font-editorial italic">
                        {chapter.englishTitle}
                      </p>

                      {/* Chapter Illustration Card */}
                      <figure className="bg-[#F3EFE6] border border-[#E5DEC9] rounded-xl p-3 space-y-2.5">
                        <div className="aspect-4/3 w-full rounded-lg overflow-hidden bg-[#EBE6DF]">
                          {!imageFallbackMap[chapter.id] ? (
                            <img
                              src={chapter.image}
                              alt={chapter.urduTitle}
                              referrerPolicy="no-referrer"
                              onError={() =>
                                setImageFallbackMap((prev) => ({
                                  ...prev,
                                  [chapter.id]: true,
                                }))
                              }
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center p-6 text-center">
                              <BookOpen className="w-8 h-8 text-[#9A3412]" />
                            </div>
                          )}
                        </div>
                        <figcaption
                          dir="rtl"
                          className="text-xs text-[#57534E] font-urdu px-1 text-right"
                        >
                          {chapter.imageCaptionUrdu}
                        </figcaption>
                      </figure>

                      {/* Curatorial Margin Note & Listen to Entire Chapter Button */}
                      <div
                        dir="rtl"
                        className="p-4 rounded-xl bg-[#F3EFE6]/70 border border-[#E5DEC9] space-y-2 text-right"
                      >
                        <div className="text-xs font-semibold text-[#9A3412]">
                          حاشیہ · کلیدی نقطہ
                        </div>
                        <p className="text-xs text-[#292524] font-urdu">
                          {chapter.marginNoteUrdu}
                        </p>
                        <p dir="ltr" className="text-xs text-[#57534E] italic text-left">
                          {chapter.marginNoteEnglish}
                        </p>
                      </div>

                      <button
                        onClick={() => handlePlayChapter(chapterIdx)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#1C1917] bg-[#F3EFE6] hover:bg-[#E5DEC9] border border-[#D6CEBE] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {activeAudioId === `chapter-full-${chapter.id}` && isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 text-[#9A3412]" />
                            <span>اس باب کی تلاوت روکیں</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-[#9A3412]" />
                            <span>پورا باب سنیں · Listen to Chapter {chapterIdx + 1}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Reading Column (65% / 7 cols on desktop, constrained measure) */}
                    <div className="lg:col-span-7 space-y-5">
                      {chapter.passages.map((passage) => {
                        const isThisPassageActive = activeAudioId === passage.id;
                        const speakText =
                          ttsLanguage === "urdu"
                            ? passage.urduText
                            : passage.englishText;

                        return (
                          <div
                            id={`passage-card-${passage.id}`}
                            key={passage.id}
                            className={`p-6 rounded-2xl border transition-colors ${
                              isThisPassageActive
                                ? "bg-[#F3EFE6] border-[#9A3412] shadow-xs"
                                : passage.isSoundEffect
                                ? "bg-[#F7F3E8] border-[#D6CEBE]"
                                : "bg-white/80 border-[#E5DEC9] hover:border-[#D6CEBE]"
                            }`}
                          >
                            {/* Top Metadata & Audio Action Row */}
                            <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#EFECE4]">
                              <div className="flex items-center gap-2 text-xs text-[#78716C]">
                                {passage.speakerTag ? (
                                  <span className="font-semibold text-[#9A3412] font-urdu">
                                    {passage.speakerTag}
                                  </span>
                                ) : (
                                  <span>راوی · Narrator</span>
                                )}
                                {passage.isSoundEffect && (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <span className="text-[#9A3412] font-semibold">
                                      ٹرررر! ٹرررر! (Alarm Ring)
                                    </span>
                                  </>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {passage.isSoundEffect && (
                                  <button
                                    onClick={triggerAlarmBellSound}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#9A3412] bg-[#FBF9F5] hover:bg-[#F3EFE6] border border-[#D6CEBE] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                                  >
                                    <AlarmClock className="w-3.5 h-3.5" />
                                    <span>گھنٹی بجائیں</span>
                                  </button>
                                )}

                                <button
                                  onClick={() => {
                                    setIsFullStoryQueueActive(false);
                                    isQueueRunningRef.current = false;
                                    synthesizeAndPlaySingle(
                                      passage.id,
                                      speakText,
                                      passage.speakerTag || chapter.urduTitle,
                                      passage.speechStyle
                                    );
                                  }}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                                    isThisPassageActive && (isPlaying || isGeneratingAudio)
                                      ? "bg-[#9A3412] text-white"
                                      : "bg-[#F3EFE6] hover:bg-[#E5DEC9] text-[#1C1917]"
                                  }`}
                                >
                                  {isThisPassageActive && isGeneratingAudio ? (
                                    <>
                                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                      <span>لوڈنگ...</span>
                                    </>
                                  ) : isThisPassageActive && isPlaying ? (
                                    <>
                                      <Pause className="w-3.5 h-3.5" />
                                      <span>روکیں</span>
                                    </>
                                  ) : (
                                    <>
                                      <Volume2 className="w-3.5 h-3.5 text-[#9A3412]" />
                                      <span>سنیں · Listen</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Urdu Text */}
                            {(languageMode === "urdu" || languageMode === "bilingual") && (
                              <p
                                dir="rtl"
                                className="text-lg sm:text-xl text-[#1C1917] font-urdu text-right"
                              >
                                {passage.urduText}
                              </p>
                            )}

                            {/* English Parallel Text */}
                            {(languageMode === "english" || languageMode === "bilingual") && (
                              <p
                                dir="ltr"
                                className={`text-base text-[#44403C] leading-relaxed ${
                                  languageMode === "bilingual"
                                    ? "mt-4 pt-4 border-t border-[#EFECE4]"
                                    : ""
                                }`}
                              >
                                {passage.englishText}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Companion English Story View: "The Boy Who Never Gave Up" */
          <section className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-[#F3EFE6] border border-[#E5DEC9] rounded-2xl p-8">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#78716C]">
                    <span>Companion Story Anthology</span>
                    <span aria-hidden="true">·</span>
                    <span>English Edition</span>
                    <span aria-hidden="true">·</span>
                    <span>Gemini 3.8 Flash TTS</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1917] font-editorial">
                    {COMPANION_ENGLISH_STORY.title}
                  </h1>
                  <div className="py-4 border-y border-[#D6CEBE]">
                    <p className="text-base font-semibold text-[#9A3412]">
                      Moral: {COMPANION_ENGLISH_STORY.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-[#44403C] leading-relaxed">
                    Follow young Ahmed as he overcomes his struggle with mathematics through two hours of daily after-school practice and his teacher&apos;s timeless encouragement: &ldquo;Success does not come to those who never fail; it comes to those who never stop trying.&rdquo;
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <button
                    onClick={() =>
                      synthesizeAndPlaySingle(
                        "companion-full",
                        COMPANION_ENGLISH_STORY.paragraphs.join(" "),
                        "The Boy Who Never Gave Up (Full Story)",
                        "Warm, inspiring English audiobook narrator"
                      )
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Listen to Full English Story</span>
                  </button>
                  <button
                    onClick={() => setActiveEdition("urdu-alarm")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#1C1917] bg-[#FBF9F5] border border-[#D6CEBE] rounded-xl hover:bg-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>واپس اردو کہانی پر جائیں (احمد، علی اور الارم گھڑی)</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-xl overflow-hidden border border-[#D6CEBE] bg-[#EBE6DF]">
                <img
                  src={COMPANION_ENGLISH_STORY.image}
                  alt="Ahmed solving mathematics problems in the school hall"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {COMPANION_ENGLISH_STORY.paragraphs.map((para, i) => {
                const pid = `eng-para-${i}`;
                const isParaActive = activeAudioId === pid;
                return (
                  <div
                    key={pid}
                    className={`p-6 rounded-xl border transition-colors ${
                      isParaActive
                        ? "bg-[#F3EFE6] border-[#9A3412]"
                        : "bg-white/80 border-[#E5DEC9]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-xs font-mono text-[#78716C] tabular-nums">
                        Paragraph {String(i + 1).padStart(2, "0")}
                      </span>
                      <button
                        onClick={() =>
                          synthesizeAndPlaySingle(
                            pid,
                            para,
                            `The Boy Who Never Gave Up — Part ${i + 1}`,
                            "Warm, clear literary audiobook narrator"
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-[#F3EFE6] hover:bg-[#E5DEC9] text-[#1C1917] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-[#9A3412]" />
                        <span>Listen</span>
                      </button>
                    </div>
                    <p className="text-base text-[#1C1917] leading-relaxed">{para}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Gemini 3.8 Flash TTS Multi-Speaker Dramatized Scenes & Voice Design Studio */}
        <section
          id="dramatized-studio"
          className="bg-[#F3EFE6] border border-[#E5DEC9] rounded-2xl p-8 lg:p-10 space-y-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#D6CEBE] pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#78716C]">
                <span>GEMINI 3.8 FLASH TTS</span>
                <span aria-hidden="true">·</span>
                <span>DUAL-SPEAKER SCREENPLAY & VOICE DESIGN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] font-urdu-heading">
                ڈرامائی مکالمے اور صوتی اسٹوڈیو (Dual-Voice Audio Theater)
              </h2>
            </div>

            {/* Style Preset Selector */}
            <div className="flex flex-wrap items-center gap-2">
              {STYLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedStyleId(preset.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedStyleId === preset.id
                      ? "bg-[#9A3412] text-white"
                      : "bg-[#FBF9F5] text-[#57534E] border border-[#D6CEBE] hover:text-[#1C1917]"
                  }`}
                >
                  {preset.labelUrdu}
                </button>
              ))}
            </div>
          </div>

          {/* 3 Dual-Speaker Dramatized Scenes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {URDU_ALARM_STORY.dramatizedScenes.map((scene) => {
              const sceneAudioId = `scene-${scene.id}`;
              const isSceneActive = activeAudioId === sceneAudioId;

              return (
                <div
                  key={scene.id}
                  className="bg-[#FBF9F5] border border-[#E5DEC9] rounded-xl p-6 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div
                      dir="rtl"
                      className="flex items-center justify-between gap-2 text-xs text-[#78716C]"
                    >
                      <span>دو کرداروں کا مکالمہ</span>
                      <span dir="ltr" className="font-mono text-[11px]">
                        {scene.speakers.map((s) => s.voiceName).join(" + ")}
                      </span>
                    </div>

                    <h3
                      dir="rtl"
                      className="text-xl font-bold text-[#1C1917] font-urdu-heading text-right"
                    >
                      {scene.urduTitle}
                    </h3>

                    <p
                      dir="rtl"
                      className="text-xs text-[#57534E] font-urdu text-right"
                    >
                      {scene.contextUrdu}
                    </p>

                    <div className="space-y-3 pt-2 border-t border-[#EFECE4]">
                      {scene.turns.map((turn, idx) => (
                        <div
                          key={idx}
                          dir="rtl"
                          className="p-3 rounded-lg bg-[#F3EFE6]/70 text-right space-y-1"
                        >
                          <div className="text-[11px] font-bold text-[#9A3412]">
                            {turn.speaker === "Ayesha"
                              ? "عائشہ"
                              : turn.speaker === "MrKhalid"
                              ? "مسٹر خالد"
                              : turn.speaker === "Ali"
                              ? "علی"
                              : "احمد"}
                          </div>
                          <p className="text-sm text-[#1C1917] font-urdu">
                            {turn.text.replace(/<breath>|<laugh>/g, "")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => synthesizeAndPlayDialogue(scene)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isSceneActive && (isPlaying || isGeneratingAudio)
                        ? "bg-[#1C1917] text-white"
                        : "bg-[#9A3412] hover:bg-[#7C2D12] text-white"
                    }`}
                  >
                    {isSceneActive && isGeneratingAudio ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>مکالمہ تیار ہو رہا ہے...</span>
                      </>
                    ) : isSceneActive && isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>مکالمہ روکیں · Pause Scene</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-4 h-4" />
                        <span>دو آوازوں میں مکالمہ سنیں · Play Dual-Voice</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Custom Speech Reader Box */}
          <div className="bg-[#FBF9F5] border border-[#D6CEBE] rounded-xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-[#9A3412]" />
                <h3 className="text-base font-bold text-[#1C1917]">
                  اپنی پسند کا جملہ یا تقریر آواز میں تبدیل کریں (Custom Text-to-Speech)
                </h3>
              </div>
              <span className="text-xs text-[#78716C]">
                Powered by <code className="font-mono">gemini-3.8-flash-tts</code>
              </span>
            </div>

            <textarea
              dir="auto"
              rows={3}
              value={customStudioText}
              onChange={(e) => setCustomStudioText(e.target.value)}
              placeholder="یہاں اردو یا انگریزی میں کوئی بھی جملہ لکھیں..."
              className="w-full p-4 rounded-xl bg-white border border-[#D6CEBE] text-base text-[#1C1917] font-urdu focus:outline-none focus:border-[#9A3412]"
            />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() =>
                    setCustomStudioText(
                      "سر! میری الارم گھڑی مجھ سے پہلے جاگ گئی تھی، لیکن مجھے جگانا بھول گئی!"
                    )
                  }
                  className="px-3 py-1.5 text-xs bg-[#F3EFE6] hover:bg-[#E5DEC9] text-[#1C1917] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  احمد کا بہانہ
                </button>
                <button
                  onClick={() =>
                    setCustomStudioText(
                      "محترم اساتذہ کرام اور میرے پیارے دوستو! وقت بہت قیمتی ہوتا ہے۔ جو شخص وقت کی قدر کرتا ہے، وقت بھی اسے کامیابی دیتا ہے۔"
                    )
                  }
                  className="px-3 py-1.5 text-xs bg-[#F3EFE6] hover:bg-[#E5DEC9] text-[#1C1917] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  احمد کی تقریر
                </button>
                <button
                  onClick={() =>
                    setCustomStudioText(
                      "بھائی جان! اٹھ جائیں، ورنہ آج بھی آپ کی حاضری غائب ہو جائے گی!"
                    )
                  }
                  className="px-3 py-1.5 text-xs bg-[#F3EFE6] hover:bg-[#E5DEC9] text-[#1C1917] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  عائشہ کی آواز
                </button>
              </div>

              <button
                onClick={() =>
                  synthesizeAndPlaySingle(
                    "custom-tts-studio",
                    customStudioText,
                    "کسٹم ٹیکسٹ ٹو اسپیچ (Custom Passage)"
                  )
                }
                disabled={!customStudioText.trim() || isGeneratingAudio}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#1C1917] hover:bg-[#292524] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-50"
              >
                <Volume2 className="w-4 h-4 text-[#F59E0B]" />
                <span>آواز میں سنیں · Convert Text to Speech</span>
              </button>
            </div>
          </div>
        </section>

        {/* Interactive 6:00 AM Mischievous Alarm Clock & Speech Quiz Sandbox */}
        <section
          id="alarm-simulator"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left: Interactive 6:00 AM Twin-Bell Alarm Clock Simulator */}
          <div className="lg:col-span-5 bg-[#F3EFE6] border border-[#E5DEC9] rounded-2xl p-8 flex flex-col justify-between space-y-6">
            <div dir="rtl" className="space-y-2 text-right">
              <div className="text-xs text-[#78716C]">
                انٹرایکٹو تجربہ · 6:00 AM Morning Challenge
              </div>
              <h2 className="text-2xl font-bold text-[#1C1917] font-urdu-heading">
                شرارتی الارم گھڑی کا امتحان
              </h2>
              <p className="text-sm text-[#57534E] font-urdu">
                صبح کے چھ بج چکے ہیں! الارم بجا کر فیصلہ کریں کہ آپ پرانے احمد کی طرح کمبل اوڑھیں گے یا نئے احمد کی طرح وقت پر اٹھیں گے۔
              </p>
            </div>

            {/* Clock Face Display */}
            <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-[#D6CEBE] text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#9A3412]/10 text-[#9A3412]">
                <AlarmClock
                  className={`w-9 h-9 transition-transform ${
                    isAlarmRinging ? "scale-110" : ""
                  }`}
                />
              </div>

              <div className="font-mono text-4xl font-bold text-[#1C1917] tabular-nums">
                {alarmTime}
              </div>

              <p className="text-sm font-bold text-[#9A3412] font-urdu">
                {isAlarmRinging
                  ? "ٹرررر! ٹرررر! ٹرررر! الارم بج رہا ہے!"
                  : alarmDecision === "snooze"
                  ? "اوہو! آپ نے الارم بند کر کے کمبل اوڑھ لیا — مسٹر خالد آج پھر پوچھیں گے!"
                  : alarmDecision === "wakeup"
                  ? "شاباش! آپ علی اور نئے احمد کی طرح صبح وقت پر جاگ گئے!"
                  : "الارم صبح ۶:۰۰ بجے کے لیے تیار ہے۔"}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {["05:30 AM", "06:00 AM", "06:30 AM"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setAlarmTime(t)}
                    className={`px-3 py-1 text-xs font-mono tabular-nums rounded-md cursor-pointer whitespace-nowrap shrink-0 ${
                      alarmTime === t
                        ? "bg-[#1C1917] text-white"
                        : "bg-[#EFECE4] text-[#57534E]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Choice Buttons */}
            <div className="space-y-3">
              <button
                onClick={triggerAlarmBellSound}
                className="w-full py-3 px-4 rounded-xl bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <AlarmClock className="w-4 h-4" />
                <span>الارم بجائیں · Ring 6:00 AM Alarm (ٹرررر!)</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setAlarmDecision("snooze");
                    synthesizeAndPlaySingle(
                      "sim-snooze",
                      "عائشہ! ٹیچر کو کہہ دینا کہ میں خواب میں اسکول آ چکا ہوں!",
                      "پرانے احمد کا جواب",
                      "Sleepy, humorous boy speaking from under his blanket"
                    );
                  }}
                  className="py-2.5 px-3 rounded-xl bg-[#FBF9F5] hover:bg-white border border-[#D6CEBE] text-xs font-medium text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  کمبل اوڑھ کر سو جائیں (Old Ahmed)
                </button>

                <button
                  onClick={() => {
                    setAlarmDecision("wakeup");
                    setStreakDays((d) => d + 1);
                    synthesizeAndPlaySingle(
                      "sim-wakeup",
                      "الارم گھڑی کو بند کرنے سے وقت نہیں رکتا! آج میں وقت پر اٹھ کر اسکول جاؤں گا!",
                      "نئے احمد کا عزم",
                      "Bright, determined, and cheerful morning voice"
                    );
                  }}
                  className="py-2.5 px-3 rounded-xl bg-[#14532D] hover:bg-[#166534] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  فوراً وقت پر اٹھیں (New Ahmed)
                </button>
              </div>

              <div
                dir="rtl"
                className="pt-2 flex items-center justify-between text-xs text-[#57534E]"
              >
                <span>وقت پر جاگنے کا ریکارڈ (Punctuality Streak):</span>
                <span className="font-mono font-bold text-[#14532D] tabular-nums">
                  {streakDays} Days On Time
                </span>
              </div>
            </div>
          </div>

          {/* Right: Story Comprehension & Speech Quiz */}
          <div className="lg:col-span-7 bg-[#F3EFE6] border border-[#E5DEC9] rounded-2xl p-8 space-y-6">
            <div dir="rtl" className="space-y-1 text-right">
              <div className="text-xs text-[#78716C]">
                فہمِ کہانی · Interactive Story Reflection
              </div>
              <h2 className="text-2xl font-bold text-[#1C1917] font-urdu-heading">
                کہانی کے سوالات اور تقریر کی مشق
              </h2>
            </div>

            <div className="space-y-4">
              {SPEECH_QUIZ_STEPS.map((q, qIdx) => {
                const selectedIdx = quizAnswers[q.id];
                const isAnswered = selectedIdx !== undefined;
                const isCorrect =
                  isAnswered && q.options[selectedIdx]?.correct === true;

                return (
                  <div
                    key={q.id}
                    dir="rtl"
                    className="p-5 rounded-xl bg-[#FBF9F5] border border-[#E5DEC9] space-y-3 text-right"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-base font-bold text-[#1C1917] font-urdu">
                        سوال {qIdx + 1}: {q.promptUrdu}
                      </p>
                      <button
                        onClick={() =>
                          synthesizeAndPlaySingle(
                            `quiz-${q.id}`,
                            q.promptUrdu,
                            `سوال ${qIdx + 1}`
                          )
                        }
                        className="p-1.5 rounded-lg bg-[#F3EFE6] hover:bg-[#E5DEC9] text-[#9A3412] transition-colors cursor-pointer shrink-0"
                        title="سوال سنیں"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isThisSelected = selectedIdx === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() =>
                              setQuizAnswers((prev) => ({
                                ...prev,
                                [q.id]: oIdx,
                              }))
                            }
                            className={`w-full text-right px-4 py-2.5 rounded-lg border text-sm font-urdu transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                              isThisSelected
                                ? opt.correct
                                  ? "bg-[#14532D]/10 border-[#14532D] text-[#14532D] font-bold"
                                  : "bg-red-50 border-red-300 text-red-900"
                                : "bg-white border-[#E5DEC9] hover:border-[#9A3412] text-[#1C1917]"
                            }`}
                          >
                            <span>{opt.urdu}</span>
                            {isThisSelected && (
                              <span className="text-xs font-sans shrink-0">
                                {opt.correct ? "✓ درست" : "✗ دوبارہ کوشش کریں"}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isCorrect && (
                      <p className="text-xs text-[#14532D] font-urdu pt-1">
                        {q.explanationUrdu}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5 Moral Lessons Section */}
        <section id="morals-section" className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E5DEC9] pb-5">
            <div dir="rtl" className="space-y-1">
              <div className="text-xs text-[#78716C]">
                اخلاقی اسباق · FIVE GOLDEN LESSONS OF TIME & EFFORT
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] font-urdu-heading">
                کہانی کا اخلاقی سبق (Moral of the Story)
              </h2>
            </div>

            <button
              onClick={() =>
                synthesizeAndPlaySingle(
                  "all-morals-audio",
                  `کہانی کا اخلاقی سبق۔ نمبر ایک: ${URDU_ALARM_STORY.morals
                    .map((m) => m.urdu)
                    .join(" ")}`,
                  "کہانی کے پانچ اخلاقی اسباق",
                  "Inspiring, warm teacher summarizing the five moral lessons of the story"
                )
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Award className="w-4 h-4" />
              <span>پانچوں اخلاقی اسباق آواز میں سنیں</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {URDU_ALARM_STORY.morals.map((moral) => {
              const moralId = `moral-item-${moral.index}`;
              const isMoralPlaying = activeAudioId === moralId && isPlaying;

              return (
                <div
                  key={moral.index}
                  dir="rtl"
                  className="p-6 rounded-2xl bg-[#F3EFE6] border border-[#E5DEC9] flex flex-col justify-between space-y-5 text-right"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-[#9A3412] tabular-nums">
                        سبق نمبر 0{moral.index}
                      </span>
                      <button
                        onClick={() =>
                          synthesizeAndPlaySingle(
                            moralId,
                            `${moral.urdu} ${moral.reflectionPromptUrdu}`,
                            `اخلاقی سبق ${moral.index}`
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-[#FBF9F5] hover:bg-white text-[#1C1917] border border-[#D6CEBE] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {isMoralPlaying ? (
                          <>
                            <Pause className="w-3 h-3 text-[#9A3412]" />
                            <span>روکیں</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-[#9A3412]" />
                            <span>سنیں</span>
                          </>
                        )}
                      </button>
                    </div>

                    <h3 className="text-xl font-bold text-[#1C1917] font-urdu-heading">
                      {moral.urdu}
                    </h3>

                    <p className="text-sm text-[#44403C] font-urdu">
                      {moral.reflectionPromptUrdu}
                    </p>
                  </div>

                  <div
                    dir="ltr"
                    className="pt-4 border-t border-[#E5DEC9] text-xs text-[#57534E] space-y-1 text-left"
                  >
                    <p className="font-semibold text-[#1C1917]">{moral.english}</p>
                    <p>{moral.reflectionPromptEnglish}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E5DEC9] bg-[#F3EFE6] px-6 py-8 mt-16">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[#57534E]">
          <div>
            <span className="font-semibold text-[#1C1917]">
              احمد، علی اور شرارتی الارم گھڑی
            </span>
            <span className="mx-2">·</span>
            <span>سبق: وقت کی پابندی اور محنت کامیابی کی کنجی ہیں۔</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#top" className="hover:text-[#1C1917] transition-colors">
              واپس اوپر جائیں · Back to Top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
