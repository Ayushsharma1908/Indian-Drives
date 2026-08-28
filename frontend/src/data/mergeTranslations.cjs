const fs = require('fs');

// Read the current translations.js file
const currentContent = fs.readFileSync('frontend/src/data/translations.js', 'utf8');

// Extract the translation object using node vm or regex
const exportMatch = currentContent.match(/export const translations = (\{[\s\S]*\});?\s*$/);
if (!exportMatch) {
  console.error('Could not find translations export');
  process.exit(1);
}

const rawTranslations = eval('(' + exportMatch[1] + ')');
const masterEn = rawTranslations.en;
const masterHi = rawTranslations.hi || {};

// Add the new landing page keys to masterEn and masterHi if missing
const newLandingKeysEn = {
  heroTitle: "Your driving licence journey,",
  heroHighlight: "simplified.",
  heroSubtitle: "Apply, track and manage your driving licence in one place.",
  heroStartBtn: "Start Your Journey →",
  heroAskBtn: "Ask DriveSEVA",
  roadmapStart: "START",
  roadmapLL: "LEARNER LICENCE",
  roadmapTest: "TEST",
  roadmapDL: "DRIVING LICENCE",
  journeysEyebrow: "YOUR JOURNEY",
  journeysTitle: "Where are you in your driving journey?",
  journeysSubtitle: "Choose where you are. We'll guide you from there.",
  journey1Title: "I'm starting from scratch",
  journey1Desc: "Get your Learner Licence.",
  journey1Cta: "Start →",
  journey2Title: "I have a Learner Licence",
  journey2Desc: "Continue towards your Driving Licence.",
  journey2Cta: "Continue →",
  journey3Title: "I already have a Driving Licence",
  journey3Desc: "Manage your existing licence.",
  journey3Cta: "Manage →",
  servicesEyebrow: "WHAT YOU CAN DO",
  servicesTitle: "Core platform capabilities",
  servicesSubtitle: "Everything you need at every stage of your licence journey.",
  serviceApplyTitle: "Apply",
  serviceApplyDesc: "Start a new licence application with guided online steps.",
  serviceTrackTitle: "Track",
  serviceTrackDesc: "See your current application progress and verified milestones.",
  serviceTestTitle: "Test & Appointments",
  serviceTestDesc: "Manage driving test slots and automated track appointments.",
  serviceManageTitle: "Manage Licence",
  serviceManageDesc: "Handle renewals, address updates, and duplicate smart cards.",
  howEyebrow: "HOW IT WORKS",
  howTitle: "Four clear milestones",
  howStep1: "Online Application",
  howStep2: "Knowledge Test",
  howStep3: "Driving Test Slot",
  howStep4: "Licence Issued",
  helpEyebrow: "NEED HELP?",
  helpTitle: "Ask DriveSEVA",
  helpDesc: "Get guidance about your driving licence journey, applications and next steps.",
  helpCta: "Ask DriveSEVA →",
  ctaTitle: "Ready to start your journey?",
  ctaDesc: "Sign in to access your personalized driving licence journey.",
  ctaButton: "Start Your Journey →",
  footerRights: "Indian Drives. All rights reserved."
};

const newLandingKeysHi = {
  heroTitle: "आपकी ड्राइविंग लाइसेंस यात्रा,",
  heroHighlight: "सरल और स्पष्ट।",
  heroSubtitle: "अपने ड्राइविंग लाइसेंस के लिए आवेदन करें, ट्रैक करें और प्रबंधित करें - एक ही स्थान पर।",
  heroStartBtn: "अपनी यात्रा शुरू करें →",
  heroAskBtn: "DriveSEVA से पूछें",
  roadmapStart: "शुरुआत",
  roadmapLL: "लर्नर लाइसेंस",
  roadmapTest: "ड्राइविंग टेस्ट",
  roadmapDL: "ड्राइविंग लाइसेंस",
  journeysEyebrow: "आपकी यात्रा",
  journeysTitle: "आप अपनी ड्राइविंग यात्रा में कहाँ हैं?",
  journeysSubtitle: "अपनी वर्तमान स्थिति चुनें। हम आपको आगे का रास्ता दिखाएंगे।",
  journey1Title: "मैं शुरुआत से शुरू कर रहा हूँ",
  journey1Desc: "अपना लर्नर लाइसेंस प्राप्त करें।",
  journey1Cta: "शुरू करें →",
  journey2Title: "मेरे पास लर्नर लाइसेंस है",
  journey2Desc: "स्थायी ड्राइविंग लाइसेंस की ओर आगे बढ़ें।",
  journey2Cta: "आगे बढ़ें →",
  journey3Title: "मेरे पास पहले से ड्राइविंग लाइसेंस है",
  journey3Desc: "अपने मौजूदा लाइसेंस का प्रबंधन करें।",
  journey3Cta: "प्रबंधित करें →",
  servicesEyebrow: "आप क्या कर सकते हैं",
  servicesTitle: "मुख्य डिजिटल क्षमताएं",
  servicesSubtitle: "आपकी लाइसेंस यात्रा के हर चरण के लिए सब कुछ।",
  serviceApplyTitle: "आवेदन करें",
  serviceApplyDesc: "ऑनलाइन चरणों के साथ नया लाइसेंस आवेदन शुरू करें।",
  serviceTrackTitle: "ट्रैक करें",
  serviceTrackDesc: "अपनी वर्तमान आवेदन प्रगति और स्थिति देखें।",
  serviceTestTitle: "टेस्ट और स्लॉट",
  serviceTestDesc: "ड्राइविंग टेस्ट स्लॉट और स्वचालित ट्रैक अपॉइंटमेंट प्रबंधित करें।",
  serviceManageTitle: "लाइसेंस प्रबंधन",
  serviceManageDesc: "नवीनीकरण, पता परिवर्तन और डुप्लीकेट स्मार्ट कार्ड संभालें।",
  howEyebrow: "यह कैसे काम करता है",
  howTitle: "चार स्पष्ट चरण",
  howStep1: "ऑनलाइन आवेदन",
  howStep2: "ज्ञान परीक्षा",
  howStep3: "ड्राइविंग टेस्ट स्लॉट",
  howStep4: "लाइसेंस जारी",
  helpEyebrow: "सहायता चाहिए?",
  helpTitle: "DriveSEVA से पूछें",
  helpDesc: "अपनी लाइसेंस यात्रा, नियमों और अगले कदमों के बारे में मार्गदर्शन प्राप्त करें।",
  helpCta: "DriveSEVA से पूछें →",
  ctaTitle: "अपनी यात्रा शुरू करने के लिए तैयार हैं?",
  ctaDesc: "अपनी व्यक्तिगत ड्राइविंग लाइसेंस यात्रा तक पहुँचने के लिए साइन इन करें।",
  ctaButton: "अपनी यात्रा शुरू करें →",
  footerRights: "Indian Drives. सर्वाधिकार सुरक्षित।"
};

const newLandingKeysBn = {
  heroTitle: "আপনার ড্রাইভিং লাইসেন্স যাত্রা,",
  heroHighlight: "সহজ ও স্বচ্ছ।",
  heroSubtitle: "একই স্থানে আপনার ড্রাইভিং লাইসেন্সের আবেদন করুন, ট্র্যাক করুন এবং পরিচালনা করুন।",
  heroStartBtn: "আপনার যাত্রা শুরু করুন →",
  heroAskBtn: "DriveSEVA-কে জিজ্ঞাসা করুন",
  roadmapStart: "শুরু",
  roadmapLL: "লার্নার লাইসেন্স",
  roadmapTest: "টেস্ট",
  roadmapDL: "ড্রাইভিং লাইসেন্স",
  journeysEyebrow: "আপনার যাত্রা",
  journeysTitle: "আপনি আপনার ড্রাইভিং যাত্রার কোথায় আছেন?",
  journeysSubtitle: "আপনি যেখানে আছেন তা বেছে নিন। আমরা আপনাকে সেখান থেকে পথ দেখাব।",
  journey1Title: "আমি শুরু থেকে শুরু করছি",
  journey1Desc: "আপনার লার্নার লাইসেন্স পান।",
  journey1Cta: "শুরু করুন →",
  journey2Title: "আমার একটি লার্নার লাইসেন্স আছে",
  journey2Desc: "স্থায়ী ড্রাইভিং লাইসেন্সের দিকে এগিয়ে যান।",
  journey2Cta: "এগিয়ে যান →",
  journey3Title: "আমার কাছে ইতিমধ্যে ড্রাইভিং লাইসেন্স আছে",
  journey3Desc: "আপনার বিদ্যমান লাইসেন্স পরিচালনা করুন।",
  journey3Cta: "পরিচালনা করুন →",
  servicesEyebrow: "আপনি কি করতে পারেন",
  servicesTitle: "মূল ক্ষমতা",
  servicesSubtitle: "আপনার লাইসেন্স যাত্রার প্রতিটি পর্যায়ের জন্য সবকিছু।",
  serviceApplyTitle: "আবেদন করুন",
  serviceApplyDesc: "সহজ অনলাইন ধাপে নতুন লাইসেন্স আবেদন শুরু করুন।",
  serviceTrackTitle: "ট্র্যাক করুন",
  serviceTrackDesc: "আপনার বর্তমান আবেদনের অগ্রগতি দেখুন।",
  serviceTestTitle: "টেস্ট ও স্লট",
  serviceTestDesc: "ড্রাইভিং টেস্ট স্লট এবং অ্যাপয়েন্টমেন্ট পরিচালনা করুন।",
  serviceManageTitle: "লাইসেন্স পরিচালনা",
  serviceManageDesc: "নবায়ন, ঠিকানা পরিবর্তন এবং ডুপ্লিকেট স্মার্ট কার্ড পরিচালনা করুন।",
  howEyebrow: "এটি কীভাবে কাজ করে",
  howTitle: "চারটি স্পষ্ট ধাপ",
  howStep1: "অনলাইন আবেদন",
  howStep2: "জ্ঞান পরীক্ষা",
  howStep3: "ড্রাইভিং টেস্ট স্লট",
  howStep4: "লাইসেন্স প্রদান",
  helpEyebrow: "সাহায্য প্রয়োজন?",
  helpTitle: "DriveSEVA-কে জিজ্ঞাসা করুন",
  helpDesc: "আপনার লাইসেন্স যাত্রা ও নিয়মাবলী সম্পর্কে দিকনির্দেশনা পান।",
  helpCta: "DriveSEVA-কে জিজ্ঞাসা করুন →",
  ctaTitle: "আপনার যাত্রা শুরু করতে প্রস্তুত?",
  ctaDesc: "আপনার ব্যক্তিগত ড্রাইভিং লাইসেন্স যাত্রা অ্যাক্সেস করতে সাইন ইন করুন।",
  ctaButton: "আপনার যাত্রা শুরু করুন →",
  footerRights: "Indian Drives. সর্বস্বত্ব সংরক্ষিত।"
};

Object.assign(masterEn.landing, newLandingKeysEn);
Object.assign(masterHi.landing, newLandingKeysHi);

// Ensure dlFlow, llFlow, servicesFlow are present in masterHi
if (!masterHi.dlFlow) {
  masterHi.dlFlow = {
    introTitle: "स्थायी ड्राइविंग लाइसेंस (DL) आवेदन",
    introSub: "अपने सक्रिय लर्नर लाइसेंस विवरण सत्यापित करें और ड्राइविंग टेस्ट स्लॉट बुक करें।",
    foundTitle: "सत्यापित लर्नर लाइसेंस रिकॉर्ड मिला",
    confirmAddrTitle: "वर्तमान आवासीय पता सत्यापित करें",
    docsTitle: "अनिवार्य दस्तावेज सत्यापन",
    checkoutTitle: "सरकारी आरटीओ शुल्क निपटान",
    paymentSuccessTitle: "भुगतान सफल और सत्यापित!",
    paymentSuccessSub: "आपका शुल्क प्राप्त हो गया है और परिवहन विभाग के खाते में जमा हो गया है। आपका व्यावहारिक ड्राइविंग टेस्ट बुकिंग अब खुला है।",
    centerTitle: "निकटतम स्वचालित आरटीओ टेस्ट ट्रैक चुनें",
    slotTitle: "पसंदीदा ड्राइविंग टेस्ट स्लॉट चुनें",
    fixedTitle: "ड्राइविंग टेस्ट अपॉइंटमेंट निश्चित हुआ!",
    resultTitle: "ड्राइविंग टेस्ट परिणाम और मूल्यांकन",
    dispatchTitle: "स्मार्ट कार्ड प्रिंटिंग और स्पीड पोस्ट डिस्पैच"
  };
}

if (!masterHi.llFlow) {
  masterHi.llFlow = {
    introTitle: "लर्नर लाइसेंस (LL) ऑनलाइन आवेदन",
    introSubtitle: "संपर्क रहित आधार ई-केवाईसी और ऑनलाइन टेस्ट के साथ अपना लर्नर लाइसेंस प्राप्त करें।",
    journeyOverview: "आवेदन अवलोकन",
    stepsDesc: "चार आसान चरणों में अपना लर्नर लाइसेंस पूरा करें।",
    rtoSelection: "आरटीओ कार्यालय चयन",
    rtoSelectionSub: "अपना निकटतम क्षेत्रीय परिवहन कार्यालय चुनें।",
    assessmentProcess: "ऑनलाइन ज्ञान परीक्षा",
    assessmentProcessSub: "घर से १५ मिनट की ऑनलाइन सड़क सुरक्षा परीक्षा दें।",
    startAppBtn: "नया लर्नर लाइसेंस आवेदन शुरू करें",
    paymentSuccessTitle: "भुगतान सफल और सत्यापित!",
    paymentSuccessSub: "शुल्क जमा हो गया है। आप तुरंत ऑनलाइन टेस्ट दे सकते हैं।"
  };
}

const bnTranslations = {
  ...JSON.parse(JSON.stringify(masterEn)),
  nav: {
    dashboard: "ড্যাশবোর্ড",
    journey: "আমার যাত্রা",
    ask: "DriveSEVA-কে জিজ্ঞাসা করুন",
    help: "সাহায্য",
    notifications: "বিজ্ঞপ্তি",
    profile: "প্রোফাইল",
    howItWorks: "এটি কীভাবে কাজ করে",
    services: "পরিষেবা",
    myJourney: "আমার যাত্রা",
    signIn: "সাইন ইন করুন",
    startJourney: "আপনার যাত্রা শুরু করুন",
    settings: "সেটিংস",
    documents: "নথিপত্র",
    appointments: "অ্যাপয়েন্টমেন্ট",
    payments: "পেমেন্ট",
    licenceServices: "লাইসেন্স পরিষেবা"
  },
  common: {
    login: "সাইন ইন করুন",
    logout: "লগ আউট",
    language: "ভাষা",
    continue: "চালিয়ে যান",
    back: "পিছনে",
    next: "পরবর্তী",
    send: "পাঠান",
    status: "স্থিতি পরীক্ষা করুন",
    save: "সংরক্ষণ করুন",
    cancel: "বাতিল করুন",
    close: "বন্ধ করুন",
    loading: "লোড হচ্ছে...",
    scroll: "স্ক্রোল করুন"
  },
  landing: {
    ...masterEn.landing,
    ...newLandingKeysBn
  },
  dashboard: {
    title: "নমস্কার",
    subtitle: "আমরা প্রতিটি পদক্ষেপে আপনাকে পথ দেখাব।",
    current: "বর্তমান যাত্রা",
    nextText: "লার্নার লাইসেন্স লিঙ্ক করা হয়েছে। নথিপত্র এবং অর্থপ্রদান সম্পূর্ণ।",
    nextStep: "পরবর্তী পদক্ষেপ",
    nextHint: "উপলব্ধ আরটিও টেস্ট সেন্টারে ড্রাইভিং টেস্ট স্লট বেছে নিন।"
  },
  dlFlow: {
    introTitle: "স্থায়ী ড্রাইভিং লাইসেন্স (DL) আবেদন",
    introSub: "আপনার সক্রিয় লার্নার লাইসেন্স যাচাই করুন এবং টেস্ট স্লট বুক করুন।",
    foundTitle: "লার্নার লাইসেন্স রেকর্ড পাওয়া গেছে",
    confirmAddrTitle: "বর্তমান ঠিকানা নিশ্চিত করুন",
    docsTitle: "প্রয়োজনীয় নথিপত্র যাচাইকরণ",
    checkoutTitle: "সরকারি ফি প্রদান",
    paymentSuccessTitle: "পেমেন্ট সফল ও যাচাইকৃত!",
    paymentSuccessSub: "আপনার ফি সফলভাবে পরিবহন বিভাগে জমা হয়েছে। আপনার ড্রাইভিং টেস্ট বুকিং এখন আনলক করা হয়েছে।",
    centerTitle: "নিকটবর্তী আরটিও টেস্ট ট্র্যাক নির্বাচন করুন",
    slotTitle: "ড্রাইভিং টেস্টের তারিখ ও সময় বেছে নিন",
    fixedTitle: "ড্রাইভিং টেস্ট অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে!",
    resultTitle: "টেস্ট ফলাফল ও মূল্যায়ন",
    dispatchTitle: "স্মার্ট কার্ড প্রিন্টিং ও স্পিড পোস্ট ডেলিভারি"
  },
  llFlow: {
    introTitle: "লার্নার লাইসেন্স (LL) অনলাইন আবেদন",
    introSubtitle: "আধার ই-কেওয়াইসি এবং অনলাইন টেস্টের মাধ্যমে ঘরে বসেই লার্নার লাইসেন্স পান।",
    journeyOverview: "আবেদনের বিবরণ",
    stepsDesc: "সহজ চারটি ধাপে আপনার আবেদন সম্পূর্ণ করুন।",
    rtoSelection: "আরটিও অফিস নির্বাচন",
    rtoSelectionSub: "আপনার স্থানীয় পরিবহন অফিস বেছে নিন।",
    assessmentProcess: "অনলাইন জ্ঞান পরীক্ষা",
    assessmentProcessSub: "১৫ মিনিটের অনলাইন রোড সেফটি টেস্ট দিন।",
    startAppBtn: "নতুন আবেদন শুরু করুন",
    paymentSuccessTitle: "পেমেন্ট সফল ও যাচাইকৃত!",
    paymentSuccessSub: "ফি সফলভাবে জমা হয়েছে। আপনি অবিলম্বে অনলাইন পরীক্ষা দিতে পারেন।"
  }
};

const allLanguages = [
  'en', 'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as',
  'ur', 'sa', 'mai', 'sat', 'ks', 'ne', 'kok', 'sd', 'doi', 'brx', 'mni'
];

const completeTranslations = {
  en: masterEn,
  hi: masterHi,
  bn: bnTranslations
};

// Deep merge helper
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

// For all other languages, ensure they have full structure from masterEn + their native nav/common
for (const code of allLanguages) {
  if (!completeTranslations[code]) {
    // Start with masterEn base so no keys are ever missing
    const langBase = JSON.parse(JSON.stringify(masterEn));
    if (rawTranslations[code]) {
      deepMerge(langBase, rawTranslations[code]);
    }
    completeTranslations[code] = langBase;
  }
}

const outputContent = `// translations.js - Complete Multi-lingual Translations for all 23 Official Indian Languages
export const translations = ${JSON.stringify(completeTranslations, null, 2)};
`;

fs.writeFileSync('frontend/src/data/translations.js', outputContent, 'utf8');
console.log('Successfully merged and updated translations.js with all keys and flows!');

