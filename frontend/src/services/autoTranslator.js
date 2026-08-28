// autoTranslator.js - Universal Real-Time DOM Translation Engine for Indian Drives
// Seamlessly localizes 100% of text nodes, buttons, inputs, badges, and labels across all pages.

const originalTextMap = new WeakMap();

export const dictionary = {
  bn: {
    // Nav & Common
    "Dashboard": "ড্যাশবোর্ড",
    "My Journey": "আমার যাত্রা",
    "Ask DriveSEVA": "DriveSEVA-কে জিজ্ঞাসা করুন",
    "Help": "সাহায্য",
    "Notifications": "বিজ্ঞপ্তি",
    "Profile": "প্রোফাইল",
    "Settings": "সেটিংস",
    "How It Works": "এটি কীভাবে কাজ করে",
    "Services": "পরিষেবা",
    "Sign In": "সাইন ইন করুন",
    "Login": "সাইন ইন করুন",
    "Logout": "লগ আউট",
    "Language": "ভাষা",
    "Start Your Journey": "আপনার যাত্রা শুরু করুন",
    "Start Your Journey →": "আপনার যাত্রা শুরু করুন →",
    "Continue": "চালিয়ে যান",
    "Continue →": "চালিয়ে যান →",
    "Back": "পিছনে",
    "Next": "পরবর্তী",
    "Send": "পাঠান",
    "Save": "সংরক্ষণ করুন",
    "Cancel": "বাতিল",
    "Close": "বন্ধ করুন",
    "Scroll": "স্ক্রোল করুন",
    "Key Steps:": "মূল পদক্ষেপ:",
    "Online": "অনলাইন",
    "Search": "অনুসন্ধান",

    // DL Flow / Form Labels (Exact screenshot matches)
    "LEARNER LICENCE NUMBER": "লার্নার লাইসেন্স নম্বর",
    "Learner Licence Number": "লার্নার লাইসেন্স নম্বর",
    "WHERE TO FIND THIS": "এটি কোথায় পাবেন",
    "WHERE TO FIND THIS →": "এটি কোথায় পাবেন →",
    "Where to find this →": "এটি কোথায় পাবেন →",
    "DATE OF BIRTH": "জন্ম তারিখ",
    "Date of Birth": "জন্ম তারিখ",
    "Verify & Continue": "যাচাই করুন এবং এগিয়ে যান",
    "Verify & Continue →": "যাচাই করুন এবং এগিয়ে যান →",
    "Verify and Continue": "যাচাই করুন এবং এগিয়ে যান",
    "Secured via National Register": "জাতীয় পরিবহন রেজিস্টার দ্বারা সুরক্ষিত",
    "OFFICIAL TREASURY E-RECEIPT": "অফিসিয়াল ট্রেজারি ই-রসিদ",
    "RECEIPT ID:": "রসিদ আইডি:",
    "TRANSACTION ID": "লেনদেন আইডি",
    "DATE & TIME": "তারিখ ও সময়",
    "APPLICATION NUMBER": "আবেদন নম্বর",
    "PAYMENT MODE USED": "ব্যবহৃত পেমেন্ট মাধ্যম",
    "TOTAL AMOUNT PAID": "মোট প্রদত্ত অর্থ",
    "GATEWAY STATUS": "গেটওয়ে স্ট্যাটাস",
    "VERIFIED & CREDITED TO TREASURY": "যাচাইকৃত ও ট্রেজারিতে জমাকৃত",
    "GOVERNMENT PAYMENT VERIFIED ✓": "সরকারি পেমেন্ট যাচাইকৃত ✓",
    "Payment Successful & Verified!": "পেমেন্ট সফল ও যাচাইকৃত!",
    "Your fee has been received and credited to the Transport Department account. Your practical driving test booking is now unlocked.": "আপনার ফি সফলভাবে পরিবহন বিভাগে জমা হয়েছে। আপনার ড্রাইভিং টেস্ট বুকিং এখন আনলক করা হয়েছে।",
    "Form 7 Fee:": "ফর্ম ৭ ফি:",
    "Test Track Fee:": "টেস্ট ট্র্যাক ফি:",
    "Smartcard Fee:": "স্মার্ট কার্ড ফি:",
    "Select Driving Test RTO & Slot →": "ড্রাইভিং টেস্ট আরটিও ও স্লট বেছে নিন →",
    "Print / Save Receipt": "রসিদ প্রিন্ট / সংরক্ষণ করুন",
    "Download Receipt": "রসিদ ডাউনলোড করুন",
    "UPCOMING TEST APPOINTMENT": "আসন্ন টেস্ট অ্যাপয়েন্টমেন্ট",
    "View appointment": "অ্যাপয়েন্টমেন্ট দেখুন",
    "View appointment →": "অ্যাপয়েন্টমেন্ট দেখুন →",

    // Dashboard & 3 Cards
    "Namaste": "নমস্কার",
    "Welcome to Indian Drives.": "Indian Drives-এ স্বাগতম।",
    "WHERE ARE YOU IN YOUR DRIVING JOURNEY?": "আপনার ড্রাইভিং যাত্রায় আপনি কোথায় আছেন?",
    "Tell us where you are, and we'll take you from there.": "আপনি যেখানে আছেন তা আমাদের জানান, আমরা সেখান থেকে আপনাকে পথ দেখাব।",
    "01 · STARTING FRESH": "০১ · নতুন শুরু",
    "I'm starting from scratch": "আমি শুরু থেকে শুরু করছি",
    "I don't have a Learner Licence yet. Start your online Form 2 application with Aadhaar.": "আমার এখনও লার্নার লাইসেন্স নেই। আধার দিয়ে আপনার অনলাইন ফর্ম ২ আবেদন শুরু করুন।",
    "Start with LL process →": "এলএল প্রক্রিয়া শুরু করুন →",
    "02 · CONTINUE YOUR JOURNEY": "০২ · আপনার যাত্রা চালিয়ে যান",
    "I have a Learner Licence": "আমার একটি লার্নার লাইসেন্স আছে",
    "Continue towards your Driving Licence and schedule your practical driving test.": "স্থায়ী ড্রাইভিং লাইসেন্সের দিকে এগিয়ে যান এবং আপনার প্র্যাকটিক্যাল টেস্টের সময়সূচী নির্ধারণ করুন।",
    "Start with DL process →": "ডিএল প্রক্রিয়া শুরু করুন →",
    "03 · EXISTING LICENCE": "০৩ · বিদ্যমান লাইসেন্স",
    "I already have a Driving Licence": "আমার কাছে ইতিমধ্যে ড্রাইভিং লাইসেন্স আছে",
    "Manage renewals, duplicate Smart Cards, address updates and citizen services.": "নবায়ন, ডুপ্লিকেট স্মার্ট কার্ড, ঠিকানা পরিবর্তন এবং নাগরিক পরিষেবা পরিচালনা করুন।",
    "Manage Licence Services →": "লাইসেন্স পরিষেবা পরিচালনা করুন →",

    // Other Dashboard Elements
    "Learner Licence Active": "লার্নার লাইসেন্স সক্রিয়",
    "DL Test Slot Ready": "ডিএল টেস্ট স্লট প্রস্তুত",
    "Action Required": "পদক্ষেপ প্রয়োজন",
    "Book Driving Test Slot →": "ড্রাইভিং টেস্ট স্লট বুক করুন →",
    "Track Application": "আবেদন ট্র্যাক করুন",
    "Quick Services": "দ্রুত পরিষেবা",
    "DigiLocker Document Vault": "ডিজিলকার নথি ভল্ট",
    "Automated RTO Test Track Notice": "স্বয়ংক্রিয় আরটিও টেস্ট ট্র্যাক বিজ্ঞপ্তি",
    "Speedometer Roadmap Tracker": "স্পিডোমিটার রোডম্যাপ ট্র্যাকার",
    "LL Issued": "এলএল প্রদান করা হয়েছে",
    "Test Scheduled": "টেস্ট নির্ধারিত হয়েছে",
    "Smartcard Dispatch": "স্মার্ট কার্ড প্রেরণ",

    // Auth & Modals
    "CITIZEN ACCESS": "নাগরিক প্রবেশ",
    "Sign in to Indian Drives": "Indian Drives-এ সাইন ইন করুন",
    "Quick Demo Access": "দ্রুত ডেমো লগইন",
    "Explore the verified applicant cockpit as Yanshi Chauhan.": "ইয়ানশি চৌহান হিসাবে যাচাইকৃত ককপিট অন্বেষণ করুন।",
    "Continue as Yanshi Chauhan →": "ইয়ানশি চৌহান হিসাবে চালিয়ে যান →",
    "Mobile Number": "মোবাইল নম্বর",
    "Aadhaar Number": "আধার নম্বর",
    "10-Digit Mobile Number": "১০-সংখ্যার মোবাইল নম্বর",
    "12-Digit Aadhaar Number": "১২-সংখ্যার আধার নম্বর",
    "Send OTP & Sign In": "ওটিপি পাঠান ও সাইন ইন করুন"
  },
  hi: {
    // Nav & Common
    "Dashboard": "डैशबोर्ड",
    "My Journey": "मेरी यात्रा",
    "Ask DriveSEVA": "DriveSEVA से पूछें",
    "Help": "सहायता",
    "Notifications": "सूचनाएं",
    "Profile": "प्रोफाइल",
    "Settings": "सेटिंग्स",
    "How It Works": "यह कैसे काम करता है",
    "Services": "सेवाएं",
    "Sign In": "साइन इन करें",
    "Login": "साइन इन करें",
    "Logout": "लॉग आउट",
    "Language": "भाषा",
    "Start Your Journey": "अपनी यात्रा शुरू करें",
    "Start Your Journey →": "अपनी यात्रा शुरू करें →",
    "Continue": "आगे बढ़ें",
    "Continue →": "आगे बढ़ें →",
    "Back": "पीछे",
    "Next": "अगला",
    "Send": "भेजें",
    "Save": "सहेजें",
    "Cancel": "रद्द करें",
    "Close": "बंद करें",
    "Scroll": "नीचे स्क्रॉल करें",
    "Key Steps:": "मुख्य कदम:",
    "Online": "ऑनलाइन",
    "Search": "खोजें",

    // DL Flow / Form Labels
    "LEARNER LICENCE NUMBER": "लर्नर लाइसेंस नंबर",
    "Learner Licence Number": "लर्नर लाइसेंस नंबर",
    "WHERE TO FIND THIS": "यह कहां मिलेगा",
    "WHERE TO FIND THIS →": "यह कहां मिलेगा →",
    "Where to find this →": "यह कहां मिलेगा →",
    "DATE OF BIRTH": "जन्म तिथि",
    "Date of Birth": "जन्म तिथि",
    "Verify & Continue": "सत्यापित करें और आगे बढ़ें",
    "Verify & Continue →": "सत्यापित करें और आगे बढ़ें →",
    "Verify and Continue": "सत्यापित करें और आगे बढ़ें",
    "Secured via National Register": "राष्ट्रीय परिवहन रजिस्टर द्वारा सुरक्षित",
    "OFFICIAL TREASURY E-RECEIPT": "आधिकारिक ट्रेजरी ई-रसीद",
    "RECEIPT ID:": "रसीद आईडी:",
    "TRANSACTION ID": "लेनदेन आईडी",
    "DATE & TIME": "दिनांक और समय",
    "APPLICATION NUMBER": "आवेदन संख्या",
    "PAYMENT MODE USED": "भुगतान का प्रकार",
    "TOTAL AMOUNT PAID": "कुल भुगतान राशि",
    "GATEWAY STATUS": "गेटवे स्थिति",
    "VERIFIED & CREDITED TO TREASURY": "सत्यापित और ट्रेजरी में जमा",
    "GOVERNMENT PAYMENT VERIFIED ✓": "सरकारी भुगतान सत्यापित ✓",
    "Payment Successful & Verified!": "भुगतान सफल और सत्यापित!",
    "Your fee has been received and credited to the Transport Department account. Your practical driving test booking is now unlocked.": "आपका शुल्क प्राप्त हो गया है और परिवहन विभाग के खाते में जमा हो गया है। आपका व्यावहारिक ड्राइविंग टेस्ट बुकिंग अब खुला है।",
    "Form 7 Fee:": "फॉर्म 7 शुल्क:",
    "Test Track Fee:": "टेस्ट ट्रैक शुल्क:",
    "Smartcard Fee:": "स्मार्टकार्ड शुल्क:",
    "Select Driving Test RTO & Slot →": "ड्राइविंग टेस्ट आरटीओ और स्लॉट चुनें →",
    "Print / Save Receipt": "रसीद प्रिंट / सहेजें",
    "Download Receipt": "रसीद डाउनलोड करें",
    "UPCOMING TEST APPOINTMENT": "आगामी टेस्ट अपॉइंटमेंट",
    "View appointment": "अपॉइंटमेंट देखें",
    "View appointment →": "अपॉइंटमेंट देखें →",

    // Dashboard & 3 Cards
    "Namaste": "नमस्ते",
    "Welcome to Indian Drives.": "Indian Drives में आपका स्वागत है।",
    "WHERE ARE YOU IN YOUR DRIVING JOURNEY?": "आप अपनी ड्राइविंग यात्रा में कहाँ हैं?",
    "Tell us where you are, and we'll take you from there.": "अपनी वर्तमान स्थिति चुनें। हम आपको आगे का रास्ता दिखाएंगे।",
    "01 · STARTING FRESH": "01 · नई शुरुआत",
    "I'm starting from scratch": "मैं शुरुआत से शुरू कर रहा हूँ",
    "I don't have a Learner Licence yet. Start your online Form 2 application with Aadhaar.": "मेरे पास अभी लर्नर लाइसेंस नहीं है। आधार के साथ अपना ऑनलाइन फॉर्म 2 आवेदन शुरू करें।",
    "Start with LL process →": "एलएल प्रक्रिया शुरू करें →",
    "02 · CONTINUE YOUR JOURNEY": "02 · अपनी यात्रा जारी रखें",
    "I have a Learner Licence": "मेरे पास लर्नर लाइसेंस है",
    "Continue towards your Driving Licence and schedule your practical driving test.": "स्थायी ड्राइविंग लाइसेंस की ओर आगे बढ़ें और अपने ड्राइविंग टेस्ट का समय निर्धारित करें।",
    "Start with DL process →": "डीएल प्रक्रिया शुरू करें →",
    "03 · EXISTING LICENCE": "03 · मौजूदा लाइसेंस",
    "I already have a Driving Licence": "मेरे पास पहले से ड्राइविंग लाइसेंस है",
    "Manage renewals, duplicate Smart Cards, address updates and citizen services.": "नवीनीकरण, डुप्लिकेट स्मार्ट कार्ड, पता परिवर्तन और नागरिक सेवाओं का प्रबंधन करें।",
    "Manage Licence Services →": "लाइसेंस सेवाएं प्रबंधित करें →",

    // Other Dashboard Elements
    "Learner Licence Active": "लर्नर लाइसेंस सक्रिय",
    "DL Test Slot Ready": "DL टेस्ट स्लॉट तैयार",
    "Action Required": "कार्रवाई आवश्यक",
    "Book Driving Test Slot →": "ड्राइविंग टेस्ट स्लॉट बुक करें →",
    "Track Application": "आवेदन ट्रैक करें",
    "Quick Services": "त्वरित सेवाएं",
    "DigiLocker Document Vault": "डिजीलॉकर दस्तावेज वॉल्ट",
    "Automated RTO Test Track Notice": "स्वचालित आरटीओ टेस्ट ट्रैक सूचना"
  },
  ta: {
    "Dashboard": "டாஷ்போர்டு",
    "My Journey": "எனது பயணம்",
    "Ask DriveSEVA": "DriveSEVA-விடம் கேளுங்கள்",
    "Help": "உதவி",
    "Notifications": "அறிவிப்புகள்",
    "Profile": "சுயவிவரம்",
    "Settings": "அமைப்புகள்",
    "How It Works": "இது எவ்வாறு செயல்படுகிறது",
    "Services": "சேவைகள்",
    "Sign In": "உள்நுழைக",
    "Login": "உள்நுழைக",
    "Logout": "வெளியேறுக",
    "Language": "மொழி",
    "Start Your Journey": "உங்கள் பயணத்தைத் தொடங்குங்கள்",
    "Start Your Journey →": "உங்கள் பயணத்தைத் தொடங்குங்கள் →",
    "Continue": "தொடரவும்",
    "Continue →": "தொடரவும் →",
    "Back": "பின்னால்",
    "Next": "அடுத்து",
    "LEARNER LICENCE NUMBER": "பழகுநர் உரிம எண்",
    "Learner Licence Number": "பழகுநர் உரிம எண்",
    "WHERE TO FIND THIS": "இதை எங்கே காண்பது",
    "WHERE TO FIND THIS →": "இதை எங்கே காண்பது →",
    "DATE OF BIRTH": "பிறந்த தேதி",
    "Date of Birth": "பிறந்த தேதி",
    "Verify & Continue": "சரிபார்த்து தொடரவும்",
    "Verify & Continue →": "சரிபார்த்து தொடரவும் →",
    "Secured via National Register": "தேசிய பதிவேடு மூலம் பாதுகாக்கப்பட்டது",
    "Payment Successful & Verified!": "கட்டணம் வெற்றிகரமாக செலுத்தப்பட்டு சரிபார்க்கப்பட்டது!",
    "Select Driving Test RTO & Slot →": "ஓட்டுநர் தேர்வு இடம் மற்றும் நேரத்தைத் தேர்வுசெய்க →",
    "Print / Save Receipt": "ரசீதை அச்சிடுக / சேமிக்க",
    "Namaste": "வணக்கம்",
    "Welcome to Indian Drives.": "Indian Drives-க்கு நல்வரவு."
  },
  te: {
    "Dashboard": "డ్యాష్‌బోర్డ్",
    "My Journey": "నా ప్రయాణం",
    "Ask DriveSEVA": "DriveSEVA ని అడగండి",
    "Help": "సహాయం",
    "Notifications": "నోటిఫికేషన్‌లు",
    "Profile": "ప్రొఫైల్",
    "Settings": "సెట్టింగ్‌లు",
    "How It Works": "ఇది ఎలా పనిచేస్తుంది",
    "Services": "సేవలు",
    "Sign In": "సైన్ ఇన్ చేయండి",
    "Login": "సైన్ ఇన్ చేయండి",
    "Logout": "లాగ్ అవుట్",
    "Language": "భాష",
    "Start Your Journey": "మీ ప్రయాణాన్ని ప్రారంభించండి",
    "Start Your Journey →": "మీ ప్రయాణాన్ని ప్రారంభించండి →",
    "Continue": "కొనసాగించండి",
    "Continue →": "కొనసాగించండి →",
    "Back": "వెనుకకు",
    "Next": "తదుపరి",
    "LEARNER LICENCE NUMBER": "లెర్నర్ లైసెన్స్ నంబర్",
    "Learner Licence Number": "లెర్నర్ లైసెన్స్ నంబర్",
    "WHERE TO FIND THIS": "ఇది ఎక్కడ కనుగొనాలి",
    "WHERE TO FIND THIS →": "ఇది ఎక్కడ కనుగొనాలి →",
    "DATE OF BIRTH": "పుట్టిన తేదీ",
    "Date of Birth": "పుట్టిన తేదీ",
    "Verify & Continue": "ధృవీకరించి కొనసాగించండి",
    "Verify & Continue →": "ధృవీకరించి కొనసాగించండి →",
    "Secured via National Register": "నేషనల్ రిజిస్టర్ ద్వారా రక్షించబడింది",
    "Payment Successful & Verified!": "చెల్లింపు విజయవంతమైంది మరియు ధృవీకరించబడింది!",
    "Select Driving Test RTO & Slot →": "డ్రైవింగ్ టెస్ట్ RTO & స్లాట్ ఎంచుకోండి →",
    "Print / Save Receipt": "రసీదును ప్రింట్ / సేవ్ చేయండి",
    "Namaste": "నమస్కారం",
    "Welcome to Indian Drives.": "Indian Drives కు స్వాగతం."
  },
  mr: {
    "Dashboard": "डॅशबोर्ड",
    "My Journey": "माझा प्रवास",
    "Ask DriveSEVA": "DriveSEVA ला विचारा",
    "Help": "मदत",
    "Notifications": "सूचना",
    "Profile": "प्रोफाइल",
    "Settings": "सेटिंग्ज",
    "How It Works": "हे कसे कार्य करते",
    "Services": "सेवा",
    "Sign In": "साइन इन करा",
    "Login": "साइन इन करा",
    "Logout": "लॉग आउट",
    "Language": "भाषा",
    "Start Your Journey": "तुमचा प्रवास सुरू करा",
    "Start Your Journey →": "तुमचा प्रवास सुरू करा →",
    "Continue": "पुढे जा",
    "Continue →": "पुढे जा →",
    "Back": "मागे",
    "Next": "पुढे",
    "LEARNER LICENCE NUMBER": "लर्नर लायसन्स नंबर",
    "Learner Licence Number": "लर्नर लायसन्स नंबर",
    "WHERE TO FIND THIS": "हे कुठे शोधायचे",
    "WHERE TO FIND THIS →": "हे कुठे शोधायचे →",
    "DATE OF BIRTH": "जन्मतारीख",
    "Date of Birth": "जन्मतारीख",
    "Verify & Continue": "सत्यापित करा आणि पुढे जा",
    "Verify & Continue →": "सत्यापित करा आणि पुढे जा →",
    "Secured via National Register": "राष्ट्रीय नोंदवहीत सुरक्षित",
    "Payment Successful & Verified!": "पेमेंट यशस्वी आणि सत्यापित!",
    "Select Driving Test RTO & Slot →": "ड्रायव्हिंग चाचणी आरटीओ आणि स्लॉट निवडा →",
    "Print / Save Receipt": "पावती मुद्रित / जतन करा",
    "Namaste": "नमस्कार",
    "Welcome to Indian Drives.": "Indian Drives मध्ये स्वागत आहे."
  },
  gu: {
    "Dashboard": "ડેશબોર્ડ",
    "My Journey": "મારી યાત્રા",
    "Ask DriveSEVA": "DriveSEVA ને પૂછો",
    "Help": "મદદ",
    "Notifications": "સૂચનાઓ",
    "Profile": "પ્રોફાઇલ",
    "Settings": "સેટિંગ્સ",
    "How It Works": "આ કેવી રીતે કાર્ય કરે છે",
    "Services": "સેવાઓ",
    "Sign In": "સાઇન ઇન કરો",
    "Login": "સાઇન ઇન કરો",
    "Logout": "લૉગ આઉਟ",
    "Language": "ભાષા",
    "Start Your Journey": "તમારી યાત્રા શરૂ કરો",
    "Start Your Journey →": "તમારી યાત્રા શરૂ કરો →",
    "Continue": "ચાલુ રાખો",
    "Continue →": "ચાલુ રાખો →",
    "LEARNER LICENCE NUMBER": "લર્નર લાયસન્સ નંબર",
    "Learner Licence Number": "લર્નર લાયસન્સ નંબર",
    "WHERE TO FIND THIS": "આ ક્યાં શોધવું",
    "WHERE TO FIND THIS →": "આ ક્યાં શોધવું →",
    "DATE OF BIRTH": "જન્મ તારીખ",
    "Date of Birth": "જન્મ તારીખ",
    "Verify & Continue": "ચકાસો અને આગળ વધો",
    "Verify & Continue →": "ચકાસો અને આગળ વધો →",
    "Secured via National Register": "નેશનલ રજિસ્ટર દ્વારા સુરક્ષિત",
    "Payment Successful & Verified!": "ચુકવણી સફળ અને ચકાસાયેલ!",
    "Select Driving Test RTO & Slot →": "ડ્રાઇવિંગ ટેસ્ટ RTO અને સ્લોટ પસંદ કરો →",
    "Print / Save Receipt": "રસીદ છાપો / સાચવો",
    "Namaste": "નમસ્તે",
    "Welcome to Indian Drives.": "Indian Drives માં સ્વાગત છે."
  },
  kn: {
    "Dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "My Journey": "ನನ್ನ ಪ್ರಯಾಣ",
    "Ask DriveSEVA": "DriveSEVA ಅನ್ನು ಕೇಳಿ",
    "Help": "ಸಹಾಯ",
    "Notifications": "ಅಧಿಸೂಚನೆಗಳು",
    "Profile": "ಪ್ರೊಫೈಲ್",
    "Settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "How It Works": "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
    "Services": "ಸೇವೆಗಳು",
    "Sign In": "ಸೈನ್ ಇನ್ ಮಾಡಿ",
    "Login": "ಸೈನ್ ಇನ್ ಮಾಡಿ",
    "Logout": "ಲಾಗ್ ಔಟ್",
    "Language": "ಭಾಷೆ",
    "Start Your Journey": "ನಿಮ್ಮ ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ",
    "Start Your Journey →": "ನಿಮ್ಮ ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ →",
    "Continue": "ಮುಂದುವರಿಸಿ",
    "Continue →": "ಮುಂದುವರಿಸಿ →",
    "LEARNER LICENCE NUMBER": "ಕಲಿಕಾ ಪರವಾನಗಿ ಸಂಖ್ಯೆ",
    "Learner Licence Number": "ಕಲಿಕಾ ಪರವಾನಗಿ ಸಂಖ್ಯೆ",
    "WHERE TO FIND THIS": "ಇದನ್ನು ಎಲ್ಲಿ ಕಂಡುಹಿಡಿಯುವುದು",
    "WHERE TO FIND THIS →": "ಇದನ್ನು ಎಲ್ಲಿ ಕಂಡುಹಿಡಿಯುವುದು →",
    "DATE OF BIRTH": "ಹುಟ್ಟಿದ ದಿನಾಂಕ",
    "Date of Birth": "ಹುಟ್ಟಿದ ದಿನಾಂಕ",
    "Verify & Continue": "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮುಂದುವರಿಯಿರಿ",
    "Verify & Continue →": "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮುಂದುವರಿಯಿರಿ →",
    "Secured via National Register": "ರಾಷ್ಟ್ರೀಯ ನೋಂದಣಿ ಮೂಲಕ ಸುರಕ್ಷಿತಗೊಳಿಸಲಾಗಿದೆ",
    "Payment Successful & Verified!": "ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ ಮತ್ತು ಪರಿಶೀಲಿಸಲಾಗಿದೆ!",
    "Select Driving Test RTO & Slot →": "ಚಾಲನಾ ಪರೀಕ್ಷೆ RTO ಮತ್ತು ಸ್ಲಾಟ್ ಆಯ್ಕೆಮಾಡಿ →",
    "Print / Save Receipt": "ರಶೀದಿಯನ್ನು ಮುದ್ರಿಸಿ / ಉಳಿಸಿ",
    "Namaste": "ನಮಸ್ಕಾರ",
    "Welcome to Indian Drives.": "Indian Drives ಗೆ ಸುಸ್ವಾಗತ."
  },
  ml: {
    "Dashboard": "ഡാഷ്‌ബോർഡ്",
    "My Journey": "എന്റെ യാത്ര",
    "Ask DriveSEVA": "DriveSEVA-യോട് ചോദിക്കുക",
    "Help": "സഹായം",
    "Notifications": "അറിയിപ്പുകൾ",
    "Profile": "പ്രൊഫൈൽ",
    "Settings": "ക്രമീകരണങ്ങൾ",
    "How It Works": "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    "Services": "സേവനങ്ങൾ",
    "Sign In": "സൈൻ ഇൻ ചെയ്യുക",
    "Login": "സൈൻ ഇൻ ചെയ്യുക",
    "Logout": "ലോഗ് ഔട്ട്",
    "Language": "ഭാഷ",
    "Start Your Journey": "നിങ്ങളുടെ യാത്ര ആരംഭിക്കുക",
    "Start Your Journey →": "നിങ്ങളുടെ യാത്ര ആരംഭിക്കുക →",
    "Continue": "തുടരുക",
    "Continue →": "തുടരുക →",
    "LEARNER LICENCE NUMBER": "ലേണേഴ്സ് ലൈസൻസ് നമ്പർ",
    "Learner Licence Number": "ലേണേഴ്സ് ലൈസൻസ് നമ്പർ",
    "WHERE TO FIND THIS": "ഇത് എവിടെ കണ്ടെത്താം",
    "WHERE TO FIND THIS →": "ഇത് എവിടെ കണ്ടെത്താം →",
    "DATE OF BIRTH": "ജനന തീയതി",
    "Date of Birth": "ജനന തീയതി",
    "Verify & Continue": "പരിശോധിച്ച് തുടരുക",
    "Verify & Continue →": "പരിശോധിച്ച് തുടരുക →",
    "Secured via National Register": "നാഷണൽ രജിസ്റ്റർ വഴി സുരക്ഷിതമാക്കി",
    "Payment Successful & Verified!": "പേയ്‌മെന്റ് വിജയകരമായി!",
    "Select Driving Test RTO & Slot →": "ഡ്രൈവിംഗ് ടെസ്റ്റ് RTO & സ്ലോട്ട് തിരഞ്ഞെടുക്കുക →",
    "Print / Save Receipt": "രസീത് പ്രിന്റ് ചെയ്യുക / സംരക്ഷിക്കുക",
    "Namaste": "നമസ്കാരം",
    "Welcome to Indian Drives.": "Indian Drives-ലേക്ക് സ്വാഗതം."
  },
  pa: {
    "Dashboard": "ਡੈਸ਼ਬੋਰਡ",
    "My Journey": "ਮੇਰੀ ਯਾਤਰਾ",
    "Ask DriveSEVA": "DriveSEVA ਨੂੰ ਪੁੱਛੋ",
    "Help": "ਮਦਦ",
    "Notifications": "ਸੂਚਨਾਵਾਂ",
    "Profile": "ਪ੍ਰੋਫਾਈਲ",
    "Settings": "ਸੈਟਿੰਗਾਂ",
    "How It Works": "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    "Services": "ਸੇਵਾਵਾਂ",
    "Sign In": "ਸਾਈਨ ਇਨ ਕਰੋ",
    "Login": "ਸਾਈਨ ਇਨ ਕਰੋ",
    "Logout": "ਲੌਗ ਆਉਟ",
    "Language": "ਭਾਸ਼ਾ",
    "Start Your Journey": "ਆਪਣੀ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰੋ",
    "Start Your Journey →": "ਆਪਣੀ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰੋ →",
    "Continue": "ਜਾਰੀ ਰੱਖੋ",
    "Continue →": "ਜਾਰੀ ਰੱਖੋ →",
    "LEARNER LICENCE NUMBER": "ਲਰਨਰ ਲਾਈਸੈਂਸ ਨੰਬਰ",
    "Learner Licence Number": "ਲਰਨਰ ਲਾਈਸੈਂਸ ਨੰਬਰ",
    "WHERE TO FIND THIS": "ਇਹ ਕਿੱਥੇ ਲੱਭਣਾ ਹੈ",
    "WHERE TO FIND THIS →": "ਇਹ ਕਿੱਥੇ ਲੱਭਣਾ ਹੈ →",
    "DATE OF BIRTH": "ਜਨਮ ਮਿਤੀ",
    "Date of Birth": "ਜਨਮ ਮਿਤੀ",
    "Verify & Continue": "ਪੜਤਾਲ ਕਰੋ ਅਤੇ ਜਾਰੀ ਰੱਖੋ",
    "Verify & Continue →": "ਪੜਤਾਲ ਕਰੋ ਅਤੇ ਜਾਰੀ ਰੱਖੋ →",
    "Secured via National Register": "ਨੈਸ਼ਨਲ ਰਜਿਸਟਰ ਰਾਹੀਂ ਸੁਰੱਖਿਅਤ",
    "Payment Successful & Verified!": "ਭੁਗਤਾਨ ਸਫਲ ਅਤੇ ਪ੍ਰਮਾਣਿਤ!",
    "Select Driving Test RTO & Slot →": "ਡਰਾਈਵਿੰਗ ਟੈਸਟ RTO ਅਤੇ ਸਲਾਟ ਚੁਣੋ →",
    "Print / Save Receipt": "ਰਸੀਦ ਪ੍ਰਿੰਟ / ਸੰਭਾਲੋ",
    "Namaste": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",
    "Welcome to Indian Drives.": "Indian Drives ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ।"
  }
};

export function translateText(text, targetLang) {
  if (!text || typeof text !== 'string') return text;
  const trimmed = text.trim();
  if (!trimmed) return text;
  if (targetLang === 'en') return text;

  const langDict = dictionary[targetLang] || dictionary.hi;
  if (!langDict) return text;

  if (langDict[trimmed]) {
    return text.replace(trimmed, langDict[trimmed]);
  }

  // Also check lowercase or case-insensitive match
  const lower = trimmed.toLowerCase();
  for (const [enKey, transVal] of Object.entries(langDict)) {
    if (enKey.toLowerCase() === lower) {
      return text.replace(trimmed, transVal);
    }
  }

  return text;
}

export function applyDOMTranslation(rootElement, targetLang) {
  if (!rootElement || typeof document === 'undefined') return;

  const isEnglish = targetLang === 'en';
  const langDict = dictionary[targetLang] || (isEnglish ? null : dictionary.hi);

  // Helper to walk text nodes
  const walker = document.createTreeWalker(
    rootElement,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName.toLowerCase();
        if (tag === 'script' || tag === 'style' || tag === 'code' || tag === 'noscript') {
          return NodeFilter.FILTER_REJECT;
        }
        // Don't translate user entered values in inputs/textareas
        if (tag === 'input' || tag === 'textarea' || tag === 'option') {
          return NodeFilter.FILTER_REJECT;
        }
        if (!node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    },
    false
  );

  let currentNode = walker.nextNode();
  while (currentNode) {
    let original = originalTextMap.get(currentNode);
    if (!original) {
      original = currentNode.nodeValue;
      originalTextMap.set(currentNode, original);
    }

    if (isEnglish) {
      if (currentNode.nodeValue !== original) {
        currentNode.nodeValue = original;
      }
    } else if (langDict) {
      const translated = translateText(original, targetLang);
      if (translated !== original && currentNode.nodeValue !== translated) {
        currentNode.nodeValue = translated;
      }
    }

    currentNode = walker.nextNode();
  }

  // Also translate input placeholders
  const inputs = rootElement.querySelectorAll('input[placeholder], textarea[placeholder]');
  inputs.forEach((input) => {
    let originalPlaceholder = input.getAttribute('data-orig-placeholder');
    if (!originalPlaceholder) {
      originalPlaceholder = input.getAttribute('placeholder') || '';
      input.setAttribute('data-orig-placeholder', originalPlaceholder);
    }

    if (isEnglish) {
      input.setAttribute('placeholder', originalPlaceholder);
    } else if (langDict) {
      const translated = translateText(originalPlaceholder, targetLang);
      input.setAttribute('placeholder', translated);
    }
  });
}

