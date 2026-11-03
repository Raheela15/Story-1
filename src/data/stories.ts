export interface StoryPassage {
  id: string;
  speakerTag?: string;
  urduText: string;
  englishText: string;
  isSoundEffect?: boolean;
  isQuote?: boolean;
  speechStyle: string;
}

export interface StoryChapter {
  id: string;
  numberLabel: string;
  urduTitle: string;
  englishTitle: string;
  settingLabel: string;
  image: string;
  imageCaptionUrdu: string;
  imageCaptionEnglish: string;
  marginNoteUrdu: string;
  marginNoteEnglish: string;
  passages: StoryPassage[];
}

export interface DramatizedDialogueScene {
  id: string;
  urduTitle: string;
  englishTitle: string;
  contextUrdu: string;
  contextEnglish: string;
  speakers: {
    speaker: string;
    roleLabel: string;
    voiceName: "Kore" | "Puck" | "Charon" | "Fenrir" | "Zephyr";
  }[];
  turns: {
    speaker: string;
    text: string;
    englishSubtitle: string;
    style: string;
  }[];
}

export interface MoralLesson {
  index: number;
  urdu: string;
  english: string;
  reflectionPromptUrdu: string;
  reflectionPromptEnglish: string;
}

export const URDU_ALARM_STORY = {
  id: "ahmed-alarm-clock",
  urduTitle: "احمد، علی اور شرارتی الارم گھڑی",
  englishTitle: "Ahmed, Ali, and the Mischievous Alarm Clock",
  urduMoralBanner: "سبق: وقت کی پابندی اور محنت کامیابی کی کنجی ہیں۔",
  englishMoralBanner: "Moral: Punctuality and hard work are the keys to success.",
  location: "کراچی، پاکستان · Karachi Neighborhood",
  readingTime: "6 min read · ۴ ابواب",
  heroImage: "/src/assets/images/urdu_story_alarm_clock_1793706463467.jpg",
  stageImage: "/src/assets/images/urdu_story_speech_stage_1793706464169.jpg",
  classroomImage: "/src/assets/images/chapter_classroom_practice_1793706059490.jpg",
  studyImage: "/src/assets/images/story_hero_ahmed_1793706057886.jpg",
  chapters: [
    {
      id: "ch-1",
      numberLabel: "باب اول · Chapter 01",
      urduTitle: "کراچی کا محلہ اور نئی الارم گھڑی",
      englishTitle: "A Karachi Neighborhood & The New Alarm Clock",
      settingLabel: "احمد کا گھر · 6:00 AM Alarm Setup",
      image: "/src/assets/images/urdu_story_alarm_clock_1793706463467.jpg",
      imageCaptionUrdu: "تصویر ۱ — صبح چھ بجے شرارتی الارم گھڑی بجتی ہوئی جبکہ احمد کمبل اوڑھے سو رہا ہے۔",
      imageCaptionEnglish: "Fig. 1 — The brass twin-bell alarm clock ringing at 6:00 AM while Ahmed reaches from under his quilt.",
      marginNoteUrdu: "علی ہمیشہ وقت کا پابند تھا جبکہ احمد ہر بات کو ہنسی میں ٹال دیتا تھا۔",
      marginNoteEnglish: "Contrast of habits: Ali's steady punctuality versus Ahmed's cheerful procrastination.",
      passages: [
        {
          id: "p-1",
          urduText: "ایک دفعہ کا ذکر ہے کہ کراچی کے ایک محلے میں احمد نام کا ایک لڑکا اپنے والدین اور چھوٹی بہن عائشہ کے ساتھ رہتا تھا۔ احمد بہت ذہین اور خوش مزاج تھا، لیکن اس کی ایک بری عادت تھی کہ وہ صبح بہت دیر تک سوتا رہتا تھا۔",
          englishText: "Once upon a time, in a neighborhood of Karachi, a boy named Ahmed lived with his parents and younger sister Ayesha. Ahmed was very intelligent and cheerful, but he had one bad habit: he slept late every morning.",
          speechStyle: "Warm, engaging Urdu storyteller introducing a lively family in Karachi",
        },
        {
          id: "p-2",
          speakerTag: "علی (بہترین دوست)",
          urduText: "اس کا سب سے اچھا دوست علی تھا، جو ہمیشہ وقت پر اسکول پہنچتا تھا۔ علی اکثر احمد سے کہتا، \"بھائی! کبھی تو وقت پر اٹھ جایا کرو، ایسا نہ ہو کہ ایک دن اسکول تمہارے بغیر ہی ختم ہو جائے!\"",
          englishText: "His best friend was Ali, who always reached school on time. Ali often told Ahmed, \"Brother! Wake up on time for once, lest one day school finishes without you!\"",
          speechStyle: "Friendly, teasing best friend speaking with warmth",
        },
        {
          id: "p-3",
          speakerTag: "احمد",
          urduText: "احمد ہنستے ہوئے جواب دیتا، \"فکر نہ کرو! ایک دن ایسا آئے گا کہ اسکول والے میرا انتظار کریں گے!\"",
          englishText: "Ahmed would laugh and reply, \"Don't worry! One day will come when the whole school will wait for me!\"",
          speechStyle: "Playful, humorous, lighthearted boy laughing",
        },
        {
          id: "p-4",
          speakerTag: "مسز فاطمہ (والدہ)",
          urduText: "ایک دن احمد کی والدہ، مسز فاطمہ، نے اسے ایک نئی الارم گھڑی لا کر دی اور کہا، \"اب تمہیں صبح اٹھانے کے لیے مجھے آواز نہیں لگانی پڑے گی۔\"",
          englishText: "One day Ahmed's mother, Mrs. Fatima, brought him a brand-new alarm clock and said, \"Now I won't have to call out to wake you up in the morning.\"",
          speechStyle: "Loving, hopeful mother presenting a gift",
        },
        {
          id: "p-5",
          speakerTag: "احمد",
          urduText: "احمد نے خوشی سے گھڑی پکڑی اور کہا، \"امی! اب تو میں اسکول پہنچنے سے پہلے ہی اسکول کھول دیا کروں گا!\" رات کو احمد نے الارم صبح چھ بجے کا لگایا اور آرام سے سو گیا۔",
          englishText: "Ahmed happily took the clock and said, \"Ammi! Now I will open the school gates before anyone else even arrives!\" At night, Ahmed set the alarm for 6:00 AM and went to sleep peacefully.",
          speechStyle: "Excited, overconfident boy making a funny promise",
        },
      ],
    },
    {
      id: "ch-2",
      numberLabel: "باب دوم · Chapter 02",
      urduTitle: "ٹرررر! ٹرررر! اور کلاس روم کا بہانہ",
      englishTitle: "Trrrr! Trrrr! & The Classroom Excuse",
      settingLabel: "صبح ۶ بجے سے مسٹر خالد کی کلاس تک",
      image: "/src/assets/images/chapter_classroom_practice_1793706059490.jpg",
      imageCaptionUrdu: "تصویر ۲ — اسکول میں تاخیر سے پہنچنے پر احمد کا معصومانہ اور مزاحیہ بہانہ۔",
      imageCaptionEnglish: "Fig. 2 — Arriving late at school and offering an unforgettable excuse about the alarm clock.",
      marginNoteUrdu: "الارم گھڑی نے اپنا کام وقت پر کیا، مگر احمد نے ہاتھ بڑھا کر اسے خاموش کر دیا۔",
      marginNoteEnglish: "Tools only help when paired with self-discipline: silencing the alarm doesn't pause the morning.",
      passages: [
        {
          id: "p-6",
          isSoundEffect: true,
          urduText: "صبح چھ بجے الارم بجنے لگا۔ ٹرررر! ٹرررر! ٹرررر! احمد نے نیند میں ہاتھ آگے بڑھایا اور الارم بند کر دیا۔ پھر کمبل اپنے اوپر کھینچ کر دوبارہ سو گیا۔",
          englishText: "At six o'clock in the morning, the alarm began to ring. Trrrr! Trrrr! Trrrr! In his sleep, Ahmed stretched out his hand and switched off the alarm. Then he pulled the blanket over himself and went back to sleep.",
          speechStyle: "Energetic narrator imitating the ringing alarm clock and sleepy reaction",
        },
        {
          id: "p-7",
          speakerTag: "عائشہ اور احمد",
          urduText: "کچھ دیر بعد اس کی چھوٹی بہن عائشہ کمرے میں آئی اور زور سے بولی، \"بھائی جان! اٹھ جائیں، ورنہ آج بھی آپ کی حاضری غائب ہو جائے گی!\" احمد نے آنکھیں کھولے بغیر جواب دیا، \"عائشہ! ٹیچر کو کہہ دینا کہ میں خواب میں اسکول آ چکا ہوں!\" عائشہ زور زور سے ہنسنے لگی۔",
          englishText: "A little while later, his younger sister Ayesha came into the room and called out loudly, \"Bhai Jaan! Wake up, otherwise your attendance will vanish today too!\" Without opening his eyes, Ahmed replied, \"Ayesha! Tell the teacher I have already come to school in my dream!\" Ayesha burst out laughing.",
          speechStyle: "Lively sibling banter with sleepy humor and laughter",
        },
        {
          id: "p-8",
          speakerTag: "مسٹر خالد (استاد) اور احمد",
          urduText: "اس دن احمد پھر دیر سے اسکول پہنچا۔ جب وہ کلاس میں داخل ہوا تو استاد، مسٹر خالد، نے پوچھا، \"احمد! آج پھر دیر کیوں ہو گئی؟\" احمد نے معصوم سا چہرہ بنا کر کہا، \"سر! میری الارم گھڑی مجھ سے پہلے جاگ گئی تھی، لیکن مجھے جگانا بھول گئی!\" پوری کلاس ہنسنے لگی، یہاں تک کہ علی بھی اپنی ہنسی نہ روک سکا۔",
          englishText: "That day Ahmed reached school late again. When he entered the classroom, the teacher, Mr. Khalid, asked, \"Ahmed! Why are you late again today?\" Making an innocent face, Ahmed said, \"Sir! My alarm clock woke up before me, but it forgot to wake me up!\" The whole class burst into laughter, and even Ali couldn't hold back his laugh.",
          speechStyle: "Expressive comedic storytelling capturing the teacher's question and Ahmed's witty excuse",
        },
      ],
    },
    {
      id: "ch-3",
      numberLabel: "باب سوم · Chapter 03",
      urduTitle: "تقریری مقابلہ: وقت کی اہمیت",
      englishTitle: "The Speech Competition: Importance of Time",
      settingLabel: "مقابلے سے ایک رات پہلے · The Night Before",
      image: "/src/assets/images/story_hero_ahmed_1793706057886.jpg",
      imageCaptionUrdu: "تصویر ۳ — مقابلے سے ایک رات پہلے احمد کتاب کھولے تقریر یاد کرنے کی کوشش میں۔",
      imageCaptionEnglish: "Fig. 3 — The night before the competition, trying to cram an entire speech at the last minute.",
      marginNoteUrdu: "\"کاش! میں نے اپنی الارم گھڑی کی طرح اپنی یادداشت کو بھی وقت پر جگا لیا ہوتا!\"",
      marginNoteEnglish: "Ahmed's realization: cramming in a single night cannot replace steady preparation.",
      passages: [
        {
          id: "p-9",
          urduText: "ایک دن اسکول میں اعلان ہوا کہ اگلے ہفتے تقریری مقابلہ ہوگا۔ موضوع تھا: \"وقت کی اہمیت\"۔ علی نے فوراً اپنا نام لکھوا دیا۔ احمد نے بھی حصہ لینے کا فیصلہ کیا، لیکن اسے تقریر یاد کرنے کے بجائے کھیلنے اور دوستوں کے ساتھ وقت گزارنے میں زیادہ دلچسپی تھی۔",
          englishText: "One day it was announced in school that a speech competition would be held the following week. The topic was: \"The Importance of Time.\" Ali immediately registered his name. Ahmed also decided to participate, but instead of memorizing his speech, he was more interested in playing and spending time with friends.",
          speechStyle: "Clear narrative tone building anticipation for the school competition",
        },
        {
          id: "p-10",
          speakerTag: "علی اور احمد",
          urduText: "علی نے احمد کو سمجھایا، \"احمد! مقابلے میں حصہ لیا ہے تو تیاری بھی کرو۔ صرف نام لکھوانے سے انعام نہیں ملتا۔\" احمد نے جواب دیا، \"تم فکر نہ کرو، میں ایک رات میں پوری تقریر یاد کر لوں گا!\"",
          englishText: "Ali advised Ahmed, \"Ahmed! Since you've entered the competition, prepare for it too. You don't win a prize just by writing your name down.\" Ahmed replied, \"Don't you worry, I will memorize the entire speech in a single night!\"",
          speechStyle: "Sincere advice from a thoughtful friend contrasted with carefree confidence",
        },
        {
          id: "p-11",
          isQuote: true,
          urduText: "مقابلے سے ایک رات پہلے احمد نے تقریر یاد کرنے کی کوشش کی، لیکن اسے کچھ بھی یاد نہیں ہو رہا تھا۔ کبھی وہ ایک جملہ بھول جاتا اور کبھی دوسرا۔ آخرکار اس نے کتاب بند کی اور بولا، \"کاش! میں نے اپنی الارم گھڑی کی طرح اپنی یادداشت کو بھی وقت پر جگا لیا ہوتا!\" اگلی صبح وہ بہت پریشان تھا۔ علی نے اسے مشورہ دیا کہ گھبرانے کے بجائے سکون سے اپنی تقریر پیش کرے۔",
          englishText: "The night before the competition, Ahmed tried to memorize the speech, but nothing was sticking in his mind. Sometimes he forgot one sentence, and sometimes another. Finally, he closed the book and said, \"I wish I had woken up my memory on time just like my alarm clock!\" The next morning he was very worried. Ali advised him not to panic and to deliver his speech calmly.",
          speechStyle: "Reflective, slightly anxious tone turning into warm reassurance from a friend",
        },
      ],
    },
    {
      id: "ch-4",
      numberLabel: "باب چہارم · Chapter 04",
      urduTitle: "اسٹیج پر سچائی اور نئی صبح",
      englishTitle: "Truth on Stage & A New Morning Habit",
      settingLabel: "اسکول ہال · The Auditorium Applause",
      image: "/src/assets/images/urdu_story_speech_stage_1793706464169.jpg",
      imageCaptionUrdu: "تصویر ۴ — اسکول کے اسٹیج پر احمد اپنی الارم گھڑی کا سچا واقعہ سناتے ہوئے، اور ہال تالیوں سے گونج اٹھا۔",
      imageCaptionEnglish: "Fig. 4 — Ahmed on stage sharing the honest lesson of his alarm clock as the school hall erupts in applause.",
      marginNoteUrdu: "علی نے پہلا انعام جیتا اور احمد کو بہترین مزاحیہ انداز میں پیغام دینے پر خصوصی انعام ملا۔",
      marginNoteEnglish: "Both friends shine: Ali wins First Prize for preparation, and Ahmed wins a Special Award for honest humor.",
      passages: [
        {
          id: "p-12",
          speakerTag: "احمد کی تقریر (اسٹیج پر)",
          isQuote: true,
          urduText: "جب احمد کا نام پکارا گیا تو وہ اسٹیج پر گیا۔ شروع میں وہ تھوڑا گھبرایا، لیکن پھر اس نے اپنی تقریر شروع کر دی۔ اس نے کہا: \"محترم اساتذہ کرام اور میرے پیارے دوستو! آج میں آپ کو وقت کی اہمیت کے بارے میں بتانے آیا ہوں۔ وقت بہت قیمتی ہوتا ہے۔ جو شخص وقت کی قدر کرتا ہے، وقت بھی اسے کامیابی دیتا ہے۔ ہمیں اپنا ہر کام وقت پر کرنا چاہیے، کیونکہ گزرا ہوا وقت کبھی واپس نہیں آتا۔\"",
          englishText: "When Ahmed's name was called, he walked onto the stage. At first he was a little nervous, but then he began his speech. He said: \"Respected teachers and my dear friends! Today I have come to tell you about the importance of time. Time is very precious. Whoever values time, time rewards them with success. We should do all our work on time, because time that has passed never returns.\"",
          speechStyle: "Earnest, clear young speaker addressing a school auditorium with growing confidence",
        },
        {
          id: "p-13",
          speakerTag: "احمد کا یادگار جملہ",
          urduText: "اس نے اپنی تقریر میں اپنی الارم گھڑی کا واقعہ بھی سنایا۔ تمام طلبہ اور اساتذہ ہنسنے لگے۔ آخر میں احمد نے کہا، \"دوستو! میں نے یہ سیکھا ہے کہ الارم گھڑی کو بند کرنے سے وقت نہیں رکتا، اس لیے ہمیں سستی چھوڑ کر محنت کرنی چاہیے!\" اس کی بات پر پورا ہال تالیوں سے گونج اٹھا۔",
          englishText: "In his speech, he also shared the story of his alarm clock. All the students and teachers began to laugh. In the end, Ahmed said, \"Friends! I have learned that turning off the alarm clock does not stop time—so we must leave laziness behind and work hard!\" At his words, the entire hall echoed with applause.",
          speechStyle: "Warm, humorous, and inspiring finale that wins over the entire auditorium",
        },
        {
          id: "p-14",
          speakerTag: "نتائج اور دوستی",
          urduText: "مقابلے کے نتائج کا اعلان ہوا تو علی نے پہلا انعام حاصل کیا اور احمد کو بہترین مزاحیہ انداز میں پیغام دینے پر خصوصی انعام دیا گیا۔ احمد نے خوشی سے علی کو مبارک باد دی اور کہا، \"آج تم نے مجھے ایک بہت اہم بات سکھائی ہے کہ کامیابی کے لیے صرف ذہانت نہیں بلکہ محنت اور وقت کی پابندی بھی ضروری ہے۔\"",
          englishText: "When the results of the competition were announced, Ali won first prize, and Ahmed was awarded a special prize for delivering a meaningful message in the best humorous style. Ahmed happily congratulated Ali and said, \"Today you taught me a very important lesson: that for success, not just intelligence, but hard work and punctuality are also essential.\"",
          speechStyle: "Proud, heartfelt celebration of friendship and humility",
        },
        {
          id: "p-15",
          speakerTag: "علی اور نیا احمد",
          urduText: "علی نے مسکراتے ہوئے جواب دیا، \"اور سب سے ضروری بات یہ ہے کہ صبح الارم بجے تو اسے بند کرنے کے بجائے خود اٹھ جایا کرو!\" دونوں دوست زور زور سے ہنسنے لگے۔ اس دن کے بعد احمد نے اپنی عادت بدل لی۔ اب وہ صبح وقت پر اٹھتا، اپنا کام مکمل کرتا اور اسکول بھی وقت پر پہنچتا تھا۔",
          englishText: "Ali smiled and replied, \"And the most important thing is that when the alarm rings in the morning, instead of turning it off, wake yourself up!\" Both friends laughed out loud. After that day, Ahmed changed his habit. Now he woke up on time every morning, completed his work, and reached school on time too.",
          speechStyle: "Joyful, uplifting conclusion with warm laughter between best friends",
        },
      ],
    },
  ] as StoryChapter[],
  dramatizedScenes: [
    {
      id: "scene-morning-alarm",
      urduTitle: "منظر ۱: صبح چھ بجے کا الارم اور عائشہ",
      englishTitle: "Scene 1: The 6:00 AM Alarm & Sister Ayesha",
      contextUrdu: "احمد اور اس کی چھوٹی بہن عائشہ کے درمیان صبح کا دلچسپ مکالمہ",
      contextEnglish: "Dual-speaker dramatization between Ayesha and sleepy Ahmed at 6:00 AM.",
      speakers: [
        { speaker: "Ayesha", roleLabel: "عائشہ (چھوٹی بہن)", voiceName: "Kore" },
        { speaker: "Ahmed", roleLabel: "احمد (نیند میں)", voiceName: "Puck" },
      ],
      turns: [
        {
          speaker: "Ayesha",
          text: "بھائی جان! اٹھ جائیں، صبح کے چھ بج چکے ہیں اور الارم بھی بج کر بند ہو گیا ہے! ورنہ آج بھی آپ کی حاضری غائب ہو جائے گی!",
          englishSubtitle: "Bhai Jaan! Wake up, it's past six in the morning! Otherwise your attendance will vanish today too!",
          style: "Energetic, playful younger sister trying to wake up her brother",
        },
        {
          speaker: "Ahmed",
          text: "<breath> عائشہ! سونے دو نا... ٹیچر کو کہہ دینا کہ میں خواب میں اسکول آ چکا ہوں!",
          englishSubtitle: "Ayesha! Let me sleep... Tell the teacher that I have already come to school in my dream!",
          style: "Sleepy, humorous boy speaking from under a cozy blanket",
        },
        {
          speaker: "Ayesha",
          text: "<laugh> خواب میں اسکول جانے سے حاضری نہیں لگتی بھائی جان! جلدی اٹھیں، مسٹر خالد آج ضرور پوچھیں گے!",
          englishSubtitle: "Going to school in a dream doesn't count for attendance, Bhai Jaan! Get up quickly!",
          style: "Laughing, cheerful sister teasing her brother",
        },
      ],
    },
    {
      id: "scene-classroom-excuse",
      urduTitle: "منظر ۲: مسٹر خالد اور شرارتی الارم گھڑی کا بہانہ",
      englishTitle: "Scene 2: Mr. Khalid & The Mischievous Alarm Excuse",
      contextUrdu: "کلاس روم میں استاد مسٹر خالد اور احمد کا یادگار مکالمہ",
      contextEnglish: "Dual-speaker classroom dialogue between teacher Mr. Khalid and Ahmed.",
      speakers: [
        { speaker: "MrKhalid", roleLabel: "مسٹر خالد (استاد)", voiceName: "Charon" },
        { speaker: "Ahmed", roleLabel: "احمد (طالب علم)", voiceName: "Puck" },
      ],
      turns: [
        {
          speaker: "MrKhalid",
          text: "احمد! پوری کلاس شروع ہو چکی ہے۔ آج پھر دیر کیوں ہو گئی؟ کل تو تم کہہ رہے تھے کہ نئی الارم گھڑی آ گئی ہے!",
          englishSubtitle: "Ahmed! Class has already begun. Why are you late again today?",
          style: "Calm, dignified school teacher asking a question with gentle authority",
        },
        {
          speaker: "Ahmed",
          text: "سر! میری الارم گھڑی مجھ سے پہلے جاگ گئی تھی، لیکن مجھے جگانا بھول گئی!",
          englishSubtitle: "Sir! My alarm clock woke up before me, but it forgot to wake me up!",
          style: "Innocent, witty, and charmingly humorous student",
        },
        {
          speaker: "MrKhalid",
          text: "<laugh> اچھا! تو قصور گھڑی کا ہے؟ یاد رکھو احمد، اگلے ہفتے وقت کی اہمیت پر تقریری مقابلہ ہے، وہاں کوئی بہانہ نہیں چلے گا!",
          englishSubtitle: "I see! So it's the clock's fault? Remember Ahmed, next week is the speech competition on the Importance of Time!",
          style: "Amused, warm teacher smiling and encouraging his clever student",
        },
      ],
    },
    {
      id: "scene-stage-victory",
      urduTitle: "منظر ۳: تقریری مقابلے کے بعد علی اور احمد",
      englishTitle: "Scene 3: Ali & Ahmed After the Speech Competition",
      contextUrdu: "انعام ملنے کے بعد دونوں بہترین دوستوں کی گفتگو",
      contextEnglish: "Dual-speaker celebration between best friends Ahmed and Ali after the competition.",
      speakers: [
        { speaker: "Ahmed", roleLabel: "احمد", voiceName: "Puck" },
        { speaker: "Ali", roleLabel: "علی (بہترین دوست)", voiceName: "Fenrir" },
      ],
      turns: [
        {
          speaker: "Ahmed",
          text: "علی بھائی، پہلا انعام جیتنے پر بہت بہت مبارک ہو! آج تم نے مجھے سکھا دیا کہ الارم گھڑی کو بند کرنے سے وقت نہیں رکتا، اور کامیابی کے لیے محنت اور وقت کی پابندی ضروری ہے۔",
          englishSubtitle: "Congratulations on winning First Prize, Ali! Today you taught me that turning off the alarm doesn't stop time.",
          style: "Sincere, joyful, and appreciative friend",
        },
        {
          speaker: "Ali",
          text: "شکریہ احمد! تمہاری تقریر بھی لاجواب تھی۔ اور سب سے ضروری بات یہ ہے کہ صبح الارم بجے تو اسے بند کرنے کے بجائے خود اٹھ جایا کرو!",
          englishSubtitle: "Thank you, Ahmed! Your speech was wonderful too. And remember: when the alarm rings, wake yourself up instead of turning it off!",
          style: "Warm, cheerful best friend laughing happily",
        },
      ],
    },
  ] as DramatizedDialogueScene[],
  morals: [
    {
      index: 1,
      urdu: "وقت بہت قیمتی ہے، اس کی قدر کرنی چاہیے۔",
      english: "Time is deeply precious; we must always value and respect it.",
      reflectionPromptUrdu: "گذرا ہوا لمحہ کبھی واپس نہیں آتا۔ جو وقت کی قدر کرتا ہے، وقت اسے کامیابی دیتا ہے۔",
      reflectionPromptEnglish: "A moment once passed never returns. Whoever honors time is rewarded with lasting achievement.",
    },
    {
      index: 2,
      urdu: "سستی کامیابی کی سب سے بڑی دشمن ہے۔",
      english: "Laziness and procrastination are the greatest enemies of success.",
      reflectionPromptUrdu: "الارم بند کر کے کمبل اوڑھ لینا وقتی آرام تو دیتا ہے مگر منزل سے دور کر دیتا ہے۔",
      reflectionPromptEnglish: "Silencing the alarm for five more minutes of comfort delays the habits that build character.",
    },
    {
      index: 3,
      urdu: "محنت اور مستقل مزاجی سے کامیابی حاصل ہوتی ہے۔",
      english: "Hard work and steady consistency lead to true success.",
      reflectionPromptUrdu: "علی نے پہلے دن سے تیاری کی اور پہلا انعام حاصل کیا؛ کامیابی ایک رات کی کوشش نہیں بلکہ مسلسل محنت کا نتیجہ ہے۔",
      reflectionPromptEnglish: "Ali prepared steadily from day one and earned First Prize—excellence is built daily, not overnight.",
    },
    {
      index: 4,
      urdu: "اپنی غلطیوں سے سیکھنا ایک اچھی عادت ہے۔",
      english: "Learning honestly from one's mistakes is a noble habit.",
      reflectionPromptUrdu: "احمد نے اسٹیج پر اپنی غلطی کا اعتراف کیا اور اگلے ہی دن سے اپنی عادت بدل لی۔",
      reflectionPromptEnglish: "Ahmed openly shared his mistake on stage and transformed his morning routine from that day onward.",
    },
    {
      index: 5,
      urdu: "زندگی میں مزاح اور خوش مزاجی کے ساتھ ذمہ داری بھی ضروری ہے۔",
      english: "In life, humor and cheerfulness must be paired with responsibility.",
      reflectionPromptUrdu: "خوش مزاجی دل جیت لیتی ہے، مگر ذمہ داری اور وقت کی پابندی انسان کو قابلِ اعتماد بناتی ہے۔",
      reflectionPromptEnglish: "Wit and warmth win hearts, while punctuality and responsibility make intelligence shine.",
    },
  ] as MoralLesson[],
};

export const COMPANION_ENGLISH_STORY = {
  id: "boy-who-never-gave-up",
  title: "The Boy Who Never Gave Up",
  subtitle: "Hard Work and Determination Lead to Success",
  image: "/src/assets/images/chapter_competition_hall_1793706061341.jpg",
  triumphImage: "/src/assets/images/chapter_family_triumph_1793706061302.jpg",
  paragraphs: [
    "Once upon a time, there lived a boy named Ahmed in a small village. He belonged to a poor family. His father was a farmer, and his mother worked hard to manage the household. Despite their financial difficulties, Ahmed loved going to school and dreamed of becoming a doctor one day.",
    "Ahmed was an intelligent student, but he was not good at mathematics. Whenever he tried to solve difficult questions, he made mistakes. Some of his classmates laughed at him and said, \"You will never become a successful student if you cannot even solve simple mathematics problems.\"",
    "Ahmed felt sad, but he did not lose hope. He decided to work harder. Every day, after school, he spent two hours practising mathematics. Whenever he faced a difficult question, he asked his teacher for help. His teacher appreciated his efforts and encouraged him to keep trying.",
    "One day, his school announced a mathematics competition. Ahmed wanted to participate, but he was afraid of losing. His best friend advised him not to take part because many brilliant students would compete.",
    "However, Ahmed remembered his teacher's words: \"Success does not come to those who never fail; it comes to those who never stop trying.\"",
    "He decided to participate in the competition. For several weeks, he practised different mathematical problems and improved his skills. Sometimes he became tired and frustrated, but he reminded himself of his dream.",
    "Finally, the day of the competition arrived. All the students gathered in the school hall. The teacher distributed the question papers, and everyone started solving the questions. Ahmed carefully read each question and began writing his answers.",
    "At first, he found some questions difficult, but he remained calm and remembered everything he had practised. After completing the paper, he submitted it to the teacher.",
    "A few days later, the results were announced. Everyone was surprised when the teacher declared Ahmed the winner of the competition. His classmates congratulated him, and his teacher proudly appreciated his hard work.",
    "Ahmed went home and shared the wonderful news with his parents. His parents were extremely happy and proud of him. His father hugged him and said, \"My son, you have taught us that determination can overcome every difficulty.\" From that day onwards, Ahmed became an inspiration for other students.",
  ],
  morals: [
    "Never give up on your dreams.",
    "Hard work always brings rewards.",
    "Failure is the first step towards success.",
    "Believe in yourself, even when others doubt you.",
  ],
};
