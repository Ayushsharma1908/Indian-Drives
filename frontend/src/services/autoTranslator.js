// autoTranslator.js - Universal Real-Time DOM Translation Engine for Indian Drives
// Seamlessly localizes 100% of text nodes, buttons, inputs, badges, placeholders, and labels across all pages.

const originalTextMap = new WeakMap();

export const dictionary = {
  // ─────────────────────────────────────────────────────────────
  // 1. HINDI (हिन्दी)
  // ─────────────────────────────────────────────────────────────
  hi: {
    // Top Bar, Shell & Footer
    "Indian Drives — A citizen experience concept for driving licence services.": "Indian Drives — ड्राइविंग लाइसेंस सेवाओं के लिए नागरिक अनुभव मंच।",
    "Application ID: DS-2409-KLM": "आवेदन आईडी: DS-2409-KLM",
    "CURRENT STEP": "वर्तमान चरण",

    // Cockpit & Live Assessment
    "NEXT CHECKPOINT": "अगला चेकपॉइंट",
    "Learner Licence Assessment Cockpit": "लर्नर लाइसेंस मूल्यांकन कॉकपिट",
    "Prepare for and complete your official online proctored road safety and traffic rules knowledge test.": "अपनी आधिकारिक ऑनलाइन प्रोक्टर्ड सड़क सुरक्षा और यातायात नियमों की परीक्षा की तैयारी करें और पूरा करें।",
    "Proctored AI Assessment Portal": "एआई प्रोक्टर्ड मूल्यांकन पोर्टल",
    "YOUR ASSESSMENT CHECKPOINTS": "आपके मूल्यांकन चेकपॉइंट्स",
    "Road Safety & Traffic Rules Knowledge": "सड़क सुरक्षा और यातायात नियम ज्ञान",
    "Revise core concepts before starting your live proctored examination.": "लाइव परीक्षा शुरू करने से पहले मुख्य अवधारणाओं को दोहराएं।",
    "Traffic Signals": "यातायात संकेत",
    "Mandatory Road Signs": "अनिवार्य सड़क संकेत",
    "Rules of the Road": "सड़क के नियम",
    "Defensive Driving": "सुरक्षित ड्राइविंग",
    "Practice Mock Test": "मॉक टेस्ट का अभ्यास करें",
    "Assessment Readiness": "मूल्यांकन की तैयारी",
    "Review the test format and proctoring requirements before starting.": "शुरू करने से पहले परीक्षा प्रारूप और दिशानिर्देशों की समीक्षा करें।",
    "TOTAL QUESTIONS": "कुल प्रश्न",
    "15 Multiple Choice": "15 बहुविकल्पीय",
    "DURATION": "अवधि",
    "15 Minutes": "15 मिनट",
    "PASSING SCORE": "उत्तीर्ण अंक",
    "9 / 15 (60%)": "9 / 15 (60%)",
    "Complete": "पूर्ण",
    "Start Live Proctored Exam": "लाइव परीक्षा शुरू करें",
    "Camera must remain on throughout the 15-minute test for identity verification.": "पहचान सत्यापन के लिए पूरी 15 मिनट की परीक्षा के दौरान कैमरा चालू रहना चाहिए।",

    // LL Flow Subpages
    "Applicant Personal Details": "आवेदक का व्यक्तिगत विवरण",
    "Enter your personal details as verified with your Aadhaar identity card.": "आधार पहचान पत्र के अनुसार अपना व्यक्तिगत विवरण दर्ज करें।",
    "Full Name (as per Aadhaar)": "पूरा नाम (आधार के अनुसार)",
    "Residential Address Details": "आवासीय पता विवरण",
    "Enter your current residential address within the RTO jurisdiction.": "आरटीओ अधिकार क्षेत्र के तहत अपना वर्तमान पता दर्ज करें।",
    "Street Address": "गली / मोहल्ला / घर संख्या",
    "City / Town": "शहर / कस्बा",
    "Pincode": "पिन कोड",
    "Vehicle Class Selection": "वाहन श्रेणी चयन",
    "Required Documents Upload": "आवश्यक दस्तावेज अपलोड",
    "Upload identity, age proof, and physical fitness self-declaration.": "पहचान प्रमाण, आयु प्रमाण और फिटनेस घोषणा पत्र अपलोड करें।",
    "Review Application Details": "आवेदन विवरण की समीक्षा करें",
    "Please verify all details carefully before submitting and proceeding to fee payment.": "शुल्क भुगतान से पहले कृपया सभी विवरणों को ध्यानपूर्वक सत्यापित करें।",
    "Government Fee Payment Checkout": "सरकारी शुल्क भुगतान",

    // DL Flow Subpages
    "Driving Licence (DL) Test Application": "स्थायी ड्राइविंग लाइसेंस (DL) आवेदन",
    "Verify your active Learner Licence details and book a practical driving test slot.": "अपने सक्रिय लर्नर लाइसेंस विवरण सत्यापित करें और ड्राइविंग टेस्ट स्लॉट बुक करें।",
    "Learner Licence Record Found": "सत्यापित लर्नर लाइसेंस रिकॉर्ड मिला",
    "Learner Licence Found": "लर्नर लाइसेंस रिकॉर्ड मिला",
    "Confirm Residential Address": "वर्तमान आवासीय पता सत्यापित करें",
    "Mandatory Document Verification": "अनिवार्य दस्तावेज सत्यापन",
    "Government RTO Fee Settlement": "सरकारी आरटीओ शुल्क निपटान",
    "Payment Successful & Verified!": "भुगतान सफल और सत्यापित!",
    "Your fee has been received and credited to the Transport Department account. Your practical driving test booking is now unlocked.": "आपका शुल्क प्राप्त हो गया है और परिवहन विभाग के खाते में जमा हो गया है। आपका व्यावहारिक ड्राइविंग टेस्ट बुकिंग अब खुला है।",
    "Select an Automated RTO Test Track": "निकटतम स्वचालित आरटीओ टेस्ट ट्रैक चुनें",
    "Select Preferred Driving Test Slot": "पसंदीदा ड्राइविंग टेस्ट स्लॉट चुनें",
    "Driving Test Appointment Fixed!": "ड्राइविंग टेस्ट अपॉइंटमेंट निश्चित हुआ!",
    "Driving Test Evaluation & Results": "ड्राइविंग टेस्ट परिणाम और मूल्यांकन",
    "Smartcard Printing & Speed Post Dispatch": "स्मार्ट कार्ड प्रिंटिंग और स्पीड पोस्ट डिस्पैच",

    // Licence Services Subpages
    "Licence Services Hub": "लाइसेंस सेवा केंद्र",
    "Driving Licence Renewal": "ड्राइविंग लाइसेंस नवीनीकरण",
    "Renew your licence and continue driving legally.": "अपने लाइसेंस का नवीनीकरण करें और कानूनी रूप से गाड़ी चलाते रहें।",
    "Renew Licence →": "लाइसेंस नवीनीकरण करें →",
    "Duplicate Driving Licence": "डुप्लिकेट ड्राइविंग लाइसेंस",
    "Request a duplicate licence if your licence is lost or damaged.": "यदि आपका लाइसेंस खो गया है या क्षतिग्रस्त हो गया है तो डुप्लिकेट लाइसेंस का अनुरोध करें।",
    "Get Duplicate →": "डुप्लिकेट प्राप्त करें →",
    "Update Licence Details": "लाइसेंस विवरण अपडेट करें",
    "Update eligible personal or licence information.": "पात्र व्यक्तिगत या लाइसेंस जानकारी अपडेट करें।",
    "Update Details →": "विवरण अपडेट करें →",
    "How can we help with your licence?": "हम आपके लाइसेंस में कैसे मदद कर सकते हैं?",
    "Choose a service for your existing Driving Licence.": "अपने मौजूदा ड्राइविंग लाइसेंस के लिए एक सेवा चुनें।",
    "Change of Address in DL": "लाइसेंस में पता परिवर्तन",
    "Licence Details Extract": "लाइसेंस विवरण उद्धरण",
    "International Driving Permit": "अंतरराष्ट्रीय ड्राइविंग परमिट",

    // Payments Page
    "Total Fees Paid": "कुल भुगतान किया गया शुल्क",
    "Successful Transactions": "सफल लेनदेन",
    "Pending Charges": "लंबित शुल्क",
    "Transaction History": "लेनदेन इतिहास",
    "No payments recorded yet": "अभी तक कोई भुगतान दर्ज नहीं है",
    "Download Official Receipt": "आधिकारिक रसीद डाउनलोड करें",
    "Download Proof": "प्रमाण डाउनलोड करें",
    "Ref ID:": "संदर्भ आईडी:",
    "Method:": "भुगतान विधि:",

    // Appointments Page
    "Book Driving Test Slot": "ड्राइविंग टेस्ट स्लॉट बुक करें",
    "Book Practical Test Slot": "व्यावहारिक टेस्ट स्लॉट बुक करें",
    "Upcoming": "आगामी",
    "Past & History": "पिछला और इतिहास",
    "No upcoming appointments scheduled": "कोई आगामी अपॉइंटमेंट निर्धारित नहीं है",
    "No appointment history": "कोई अपॉइंटमेंट इतिहास नहीं है",
    "Booking ID:": "बुकिंग आईडी:",
    "Reschedule": "पुनर्निर्धारित करें",
    "Appointment Pass": "अपॉइंटमेंट पास",
    "Cancel Slot": "स्लॉट रद्द करें",

    // Notifications Page
    "FILTER BY": "फ़िल्टर करें",
    "All Notifications": "सभी सूचनाएं",
    "Applications": "आवेदन",
    "Appointments": "अपॉइंटमेंट्स",
    "Payments": "भुगतान",
    "Licences": "लाइसेंस",
    "No notifications found": "कोई सूचना नहीं मिली",
    "No notifications available": "कोई सूचना उपलब्ध नहीं है",
    "Mark all as read": "सभी को पढ़ा हुआ चिह्नित करें",
    "Clear All": "सभी साफ़ करें",
    "Notification sent": "सूचना भेजी गई",
    "Notification Sent": "सूचना भेजी गई",
    "UPCOMING APPOINTMENT": "आगामी अपॉइंटमेंट",
    "View Pass": "पास देखें",

    // Documents Center Page
    "You haven't uploaded any documents yet": "आपने अभी तक कोई दस्तावेज अपलोड नहीं किया है",
    "Upload your Aadhaar ID proof, address verification, or Learner Licence copy to complete application scrutiny.": "आवेदन जांच पूरी करने के लिए अपना आधार पहचान पत्र, पता प्रमाण या लर्नर लाइसेंस प्रति अपलोड करें।",
    "Upload Document": "दस्तावेज अपलोड करें",
    "Uploaded:": "अपलोड तिथि:",
    "Validity:": "वैधता:",
    "Permanent": "स्थायी",
    "Size:": "आकार:",
    "Upload New Document": "नया दस्तावेज अपलोड करें",
    "Upload & Verify": "अपलोड और सत्यापित करें",
    "Document Category": "दस्तावेज श्रेणी",
    "Document Label / Title": "दस्तावेज शीर्षक / नाम",
    "Select File": "फ़ाइल चुनें",
    "Identity Proof": "पहचान प्रमाण",
    "Address Proof": "पता प्रमाण",
    "Health & Fitness": "स्वास्थ्य और फिटनेस",
    "Biometric Proof": "बायोमेट्रिक प्रमाण",
    "Licence Proof": "लाइसेंस प्रमाण",
    "Document ID:": "दस्तावेज आईडी:",
    "Owner:": "धारक:",
    "Upload Date:": "अपलोड तिथि:",
    "Verification Status:": "सत्यापन स्थिति:",

    // Journey & Speedometer
    "MY JOURNEY": "मेरी यात्रा",
    "My Journey": "मेरी यात्रा",
    "Track your progress through the complete digital licensing pipeline.": "पूर्ण डिजिटल लाइसेंसिंग प्रक्रिया के माध्यम से अपनी प्रगति को ट्रैक करें।",
    "AUTOMOTIVE DASHBOARD GAUGE": "ऑटोमोटिव डैशबोर्ड गेज",
    "0 (START)": "0 (शुरुआत)",
    "LL ISSUED": "एलएल जारी",
    "DL TEST": "डीएल टेस्ट",
    "100 (DL ISSUED)": "100 (डीएल जारी)",
    "SPEEDOMETER REST POSITION (0%)": "स्पीडोमीटर विश्राम स्थिति (0%)",
    "SPEEDOMETER GAUGING": "स्पीडोमीटर मापन",
    "LL APPLICATION": "एलएल आवेदन",
    "DL APPLICATION · IN PROGRESS": "डीएल आवेदन · प्रगति पर",
    "YOUR NEXT STEP": "आपका अगला कदम",
    "Your Next Step": "आपका अगला कदम",
    "Begin your Learner Licence application. Upload your Aadhaar identity proof and complete the online traffic rules test.": "अपना लर्नर लाइसेंस आवेदन शुरू करें। अपना आधार पहचान प्रमाण अपलोड करें और ऑनलाइन यातायात नियम परीक्षा पूरी करें।",
    "Complete your DL application. Your Learner Licence has been issued. You can now continue with your Driving Licence application.": "अपना डीएल आवेदन पूरा करें। आपका लर्नर लाइसेंस जारी कर दिया गया है। अब आप अपने ड्राइविंग लाइसेंस आवेदन के साथ आगे बढ़ सकते हैं।",
    "Start LL Application": "एलएल आवेदन शुरू करें",
    "Continue DL Application": "डीएल आवेदन जारी रखें",
    "Journey Checklist": "यात्रा चेकलिस्ट",
    "Aadhaar Identity Verification": "आधार पहचान सत्यापन",
    "Ready to start": "शुरू करने के लिए तैयार",
    "LL Computer Exam": "एलएल कंप्यूटर परीक्षा",
    "Not started": "शुरू नहीं हुआ",
    "Learner Licence Issuance": "लर्नर लाइसेंस जारी करना",
    "Pending": "लंबित",
    "Learner Licence Issued": "लर्नर लाइसेंस जारी किया गया",
    "Completed on 12 Aug 2026": "12 अगस्त 2026 को पूर्ण",
    "Medical Certificate Uploaded": "मेडिकल सर्टिफिकेट अपलोड किया गया",
    "Verified": "सत्यापित",
    "DL Application Form": "डीएल आवेदन पत्र",
    "In progress": "प्रगति पर है",
    "In Progress": "प्रगति पर है",
    "GOVERNMENT RECORD": "सरकारी रिकॉर्ड",
    "Government Record": "सरकारी रिकॉर्ड",
    "LL Application Status: Not Started · Ready to Begin": "एलएल आवेदन स्थिति: शुरू नहीं हुआ · शुरू करने के लिए तैयार",
    "DL Application Status: Under Review · Last updated: 25 Aug 2026 · 4:32 PM": "डीएल आवेदन स्थिति: समीक्षाधीन · अंतिम अपडेट: 25 अगस्त 2026 · शाम 4:32",
    "Application Status": "आवेदन स्थिति",
    "Under Review": "समीक्षाधीन",
    "Last updated": "अंतिम अपडेट",

    // Dashboard Banners & Notifications
    "DRIVING LICENCE ISSUED": "ड्राइविंग लाइसेंस जारी किया गया",
    "Practical Driving Test Passed — Driving Licence is active.": "व्यावहारिक ड्राइविंग टेस्ट उत्तीर्ण — ड्राइविंग लाइसेंस सक्रिय है।",
    "View Licence": "लाइसेंस देखें",
    "IMPORTANT NOTIFICATION": "महत्वपूर्ण सूचना",
    "View Details": "विवरण देखें",
    "Welcome to Indian Drives.": "Indian Drives में आपका स्वागत है।",
    "UPCOMING TEST APPOINTMENT": "आगामी टेस्ट अपॉइंटमेंट",
    "RTO Practical Test": "आरटीओ व्यावहारिक टेस्ट",
    "View appointment": "अपॉइंटमेंट देखें",

    // Government Services Page
    "PORTAL ACCESS": "पोर्टल एक्सेस",
    "Government Services": "सरकारी सेवाएं",
    "Access driving licence and transport services in one place. Streamlined for efficiency and ease of use.": "ड्राइविंग लाइसेंस और परिवहन सेवाओं तक एक ही स्थान पर पहुंचें।",
    "Apply for LL": "एलएल के लिए आवेदन करें",
    "NEW APPLICANT": "नया आवेदक",
    "Apply for DL": "डीएल के लिए आवेदन करें",
    "PERMANENT": "स्थायी",
    "Manage Services": "सेवाएं प्रबंधित करें",
    "SERVICES": "सेवाएं",
    "Tests & Appointments": "टेस्ट और अपॉइंटमेंट्स",
    "Book Now": "अभी बुक करें",
    "SLOT BOOKING": "स्लॉट बुकिंग",

    // Profile Page
    "Personal Information": "व्यक्तिगत जानकारी",
    "FULL NAME": "पूरा नाम",
    "DATE OF BIRTH": "जन्म तिथि",
    "GENDER": "लिंग",
    "BLOOD GROUP": "रक्त समूह",
    "PERMANENT ADDRESS": "स्थायी पता",
    "Logout Account": "खाता लॉग आउट करें",
    "My Applications": "मेरे आवेदन",
    "CURRENT APPLICATION": "वर्तमान आवेदन",
    "Driving Licence (DL) Application": "ड्राइविंग लाइसेंस (DL) आवेदन",
    "Learner Licence (LL) Application": "लर्नर लाइसेंस (LL) आवेदन",
    "Last updated: 2 days ago": "अंतिम अपडेट: 2 दिन पहले",
    "My Licences": "मेरे लाइसेंस",
    "Valid till": "वैधता",
    "My Documents": "मेरे दस्तावेज",
    "Manage Documents": "दस्तावेज प्रबंधित करें",
    "Edit Profile Details": "प्रोफाइल विवरण संपादित करें",
    "Edit Profile": "प्रोफाइल संपादित करें",
    "PHONE NUMBER": "मोबाइल नंबर",
    "EMAIL ADDRESS": "ईमेल पता",
    "Save Changes": "परिवर्तन सहेजें",

    // Settings Page
    "Notifications & Alerts": "सूचनाएं और अलर्ट",
    "SMS & WhatsApp Test Slot Reminders": "एसएमएस और व्हाट्सएप टेस्ट स्लॉट रिमाइंडर",
    "Receive instant reminders 24h before scheduled RTO driving tests.": "निर्धारित ड्राइविंग टेस्ट से 24 घंटे पहले तत्काल रिमाइंडर प्राप्त करें।",
    "Email Application Status Updates": "ईमेल आवेदन स्थिति अपडेट",
    "Receive email alerts when RTO officers approve or update your application.": "आरटीओ अधिकारियों द्वारा आवेदन स्वीकृत या अपडेट किए जाने पर ईमेल अलर्ट प्राप्त करें।",
    "Security & Aadhaar e-KYC": "सुरक्षा और आधार ई-केवाईसी",
    "Manage 2-Factor Authentication and linked DigiLocker accounts.": "2-कारक प्रमाणीकरण और लिंक किए गए डिजिलॉकर खातों का प्रबंधन करें।",
    "Configure Security Pin": "सुरक्षा पिन कॉन्फ़िगर करें",
    "Preferred Language": "पसंदीदा भाषा",
    "Account & System Settings": "खाता और सिस्टम सेटिंग्स",
    "Save Preferences": "प्राथमिकताएं सहेजें",
    "PREFERENCES": "प्राथमिकताएं",

    // Help Center & FAQs
    "HELP CENTER & FAQS": "सहायता केंद्र और अक्सर पूछे जाने वाले प्रश्न",
    "Help Center & FAQs": "सहायता केंद्र और अक्सर पूछे जाने वाले प्रश्न",
    "Find clear, official answers about Indian Drives services, licensing, and procedures.": "Indian Drives सेवाओं, नियमों और आरटीओ प्रक्रियाओं के बारे में स्पष्ट आधिकारिक उत्तर प्राप्त करें।",
    "Can't find what you're looking for?": "क्या आपको अपना उत्तर नहीं मिला?",
    "AI ASSISTANT": "एआई सहायक",
    "Our AI assistant is trained on official Indian Drives regulations to provide instant, specific guidance for your unique situation.": "हमारा एआई सहायक DriveSEVA आपकी स्थिति के अनुसार तुरंत व्यक्तिगत मार्गदर्शन प्रदान करता है।",
    "Ask DriveSEVA": "DriveSEVA से पूछें",
    "Ask DriveSEVA →": "DriveSEVA से पूछें →",
    "Browse by Category": "श्रेणी के अनुसार देखें",
    "Frequently Asked Questions": "अक्सर पूछे जाने वाले प्रश्न",
    "TOP QUERIES": "प्रमुख प्रश्न",
    "View All FAQs": "सभी प्रश्न देखें",
    "Show Less": "कम देखें",
    "CATEGORY": "श्रेणी",
    "Learner Licence": "लर्नर लाइसेंस",
    "Driving Licence": "ड्राइविंग लाइसेंस",
    "Documents": "दस्तावेज",
    "Payments": "भुगतान",
    "Appointments": "अपॉइंटमेंट्स",
    "Driving Test": "ड्राइविंग टेस्ट",

    // Documents Center
    "DOCUMENT VAULT & EKYC VERIFICATION": "दस्तावेज वॉल्ट और ई-केवाईसी सत्यापन",
    "Document Vault & eKYC Verification": "दस्तावेज वॉल्ट और ई-केवाईसी सत्यापन",
    "Documents Center": "दस्तावेज केंद्र",
    "Manage the verified proofs used across your Indian Drives applications.": "अपने Indian Drives आवेदनों में उपयोग किए गए सत्यापित प्रमाणों का प्रबंधन करें।",
    "Upload New Document": "नया दस्तावेज अपलोड करें",
    "All Documents": "सभी दस्तावेज",
    "Verified & Cleared": "सत्यापित और स्वीकृत",
    "Pending Scrutiny": "जांच लंबित",
    "Needs Update": "अपडेट आवश्यक",

    // Nav & Common
    "Dashboard": "डैशबोर्ड",
    "Help": "सहायता",
    "Notifications": "सूचनाएं",
    "Profile": "प्रोफाइल",
    "Settings": "सेटिंग्स",
    "How It Works": "यह कैसे काम करता है",
    "Services": "सेवाएं",
    "Sign In": "साइन इन करें",
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
    "New Chat": "नई चैट",
    "DriveSEVA Assistant": "DriveSEVA सहायक",
    "Online • Ready to help": "ऑनलाइन • सहायता के लिए तैयार",
    "SUGGESTED QUESTIONS": "सुझाए गए प्रश्न",
    "Ask anything about driving licences...": "ड्राइविंग लाइसेंस के बारे में कुछ भी पूछें...",
    "AI ASSISTANT CAN MAKE MISTAKES. VERIFY IMPORTANT INFORMATION.": "एआई सहायक से त्रुटियां हो सकती हैं। महत्वपूर्ण जानकारी की पुष्टि करें।"
  },

  // ─────────────────────────────────────────────────────────────
  // 2. KANNADA (ಕನ್ನಡ)
  // ─────────────────────────────────────────────────────────────
  kn: {
    // Top Bar, Shell & Footer
    "Indian Drives — A citizen experience concept for driving licence services.": "Indian Drives — ಚಾಲನಾ ಪರವಾನಗಿ ಸೇವೆಗಳ ನಾಗರಿಕ ಅನುಭವ ವೇದಿಕೆ.",
    "Application ID: DS-2409-KLM": "ಅರ್ಜಿ ಐಡಿ: DS-2409-KLM",
    "CURRENT STEP": "ಪ್ರಸ್ತುತ ಹಂತ",

    // Cockpit & Live Assessment
    "NEXT CHECKPOINT": "ಮುಂದಿನ ಚೆಕ್‌ಪಾಯಿಂಟ್",
    "Learner Licence Assessment Cockpit": "ಕಲಿಕಾ ಪರವಾನಗಿ ಮೌಲ್ಯಮಾಪನ ಕಾಕ್‌ಪಿಟ್",
    "Prepare for and complete your official online proctored road safety and traffic rules knowledge test.": "ನಿಮ್ಮ ಅಧಿಕೃತ ಆನ್‌ಲೈನ್ ರಸ್ತೆ ಸುರಕ್ಷತೆ ಮತ್ತು ಸಂಚಾರ ನಿಯಮಗಳ ಜ್ಞಾನ ಪರೀಕ್ಷೆಗೆ ಸಿದ್ಧರಾಗಿ ಮತ್ತು ಪೂರ್ಣಗೊಳಿಸಿ.",
    "Proctored AI Assessment Portal": "ಎಐ ಮೌಲ್ಯಮಾಪನ ಪೋರ್ಟಲ್",
    "YOUR ASSESSMENT CHECKPOINTS": "ನಿಮ್ಮ ಮೌಲ್ಯಮಾಪನ ಚೆಕ್‌ಪಾಯಿಂಟ್‌ಗಳು",
    "Road Safety & Traffic Rules Knowledge": "ರಸ್ತೆ ಸುರಕ್ಷತೆ ಮತ್ತು ಸಂಚಾರ ನಿಯಮಗಳ ಜ್ಞಾನ",
    "Revise core concepts before starting your live proctored examination.": "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಮೂಲ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಪರಿಷ್ಕರಿಸಿ.",
    "Traffic Signals": "ಸಂಚಾರ ಸಂಕೇತಗಳು",
    "Mandatory Road Signs": "ರಸ್ತೆ ಚಿಹ್ನೆಗಳು",
    "Rules of the Road": "ರಸ್ತೆ ನಿಯಮಗಳು",
    "Defensive Driving": "ಸುರಕ್ಷಿತ ಚಾಲನೆ",
    "Practice Mock Test": "ಅಣಕು ಪರೀಕ್ಷೆ ಅಭ್ಯಾಸ ಮಾಡಿ",
    "Assessment Readiness": "ಮೌಲ್ಯಮಾಪನ ಸಿದ್ಧತೆ",
    "Review the test format and proctoring requirements before starting.": "ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಪರೀಕ್ಷೆಯ ಸ್ವರೂಪ ಮತ್ತು ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    "TOTAL QUESTIONS": "ಒಟ್ಟು ಪ್ರಶ್ನೆಗಳು",
    "15 Multiple Choice": "15 ಬಹು ಆಯ್ಕೆ",
    "DURATION": "ಅವಧಿ",
    "15 Minutes": "15 ನಿಮಿಷಗಳು",
    "PASSING SCORE": "ಪಾಸಿಂಗ್ ಅಂಕ",
    "9 / 15 (60%)": "9 / 15 (60%)",
    "Complete": "ಪೂರ್ಣಗೊಂಡಿದೆ",
    "Start Live Proctored Exam": "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ",
    "Camera must remain on throughout the 15-minute test for identity verification.": "ಗುರುತಿನ ಪರಿಶೀಲನೆಗಾಗಿ ಸಂಪೂರ್ಣ 15 ನಿಮಿಷಗಳ ಪರೀಕ್ಷೆಯ ಸಮಯದಲ್ಲಿ ಕ್ಯಾಮೆರಾ ಆನ್ ಆಗಿರಬೇಕು.",

    // LL Flow Subpages
    "Applicant Personal Details": "ಅರ್ಜಿದಾರರ ವೈಯಕ್ತಿಕ ವಿವರಗಳು",
    "Enter your personal details as verified with your Aadhaar identity card.": "ಆಧಾರ್ ಗುರುತಿನ ಚೀಟಿಯ ಪ್ರಕಾರ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.",
    "Full Name (as per Aadhaar)": "ಪೂರ್ಣ ಹೆಸರು (ಆಧಾರ್ ಪ್ರಕಾರ)",
    "Residential Address Details": "ವಸತಿ ವಿಳಾಸದ ವಿವರಗಳು",
    "Enter your current residential address within the RTO jurisdiction.": "ಆರ್‌ಟಿಒ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ನಿಮ್ಮ ಪ್ರಸ್ತುತ ವಸತಿ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.",
    "Street Address": "ರಸ್ತೆ ವಿಳಾಸ / ಮನೆ ಸಂಖ್ಯೆ",
    "City / Town": "ನಗರ / ಪಟ್ಟಣ",
    "Pincode": "ಪಿನ್‌ಕೋಡ್",
    "Vehicle Class Selection": "ವಾಹನ ವರ್ಗ ಆಯ್ಕೆ",
    "Required Documents Upload": "ಅಗತ್ಯ ದಾಖಲೆಗಳ ಅಪ್‌ಲೋಡ್",
    "Upload identity, age proof, and physical fitness self-declaration.": "ಗುರುತಿನ ಪುರಾವೆ, ವಯಸ್ಸಿನ ಪುರಾವೆ ಮತ್ತು ದೈಹಿಕ ಸಾಮರ್ಥ್ಯದ ಸ್ವಯಂ ಘೋಷಣೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    "Review Application Details": "ಅರ್ಜಿ ವಿವರಗಳ ಪರಿಶೀಲನೆ",
    "Please verify all details carefully before submitting and proceeding to fee payment.": "ಶುಲ್ಕ ಪಾವತಿಗೆ ಮುಂದುವರಿಯುವ ಮೊದಲು ದಯವಿಟ್ಟು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಪರಿಶೀಲಿಸಿ.",
    "Government Fee Payment Checkout": "ಸರ್ಕಾರಿ ಶುಲ್ಕ ಪಾವತಿ",

    // DL Flow Subpages
    "Driving Licence (DL) Test Application": "ಖಾಯಂ ಚಾಲನಾ ಪರವಾನಗಿ (DL) ಅರ್ಜಿ",
    "Verify your active Learner Licence details and book a practical driving test slot.": "ನಿಮ್ಮ ಸಕ್ರಿಯ ಕಲಿಕಾ ಪರವಾನಗಿ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಟೆಸ್ಟ್ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ.",
    "Learner Licence Record Found": "ಕಲಿಕಾ ಪರವಾನಗಿ ದಾಖಲೆ ಕಂಡುಬಂದಿದೆ",
    "Learner Licence Found": "ಕಲಿಕಾ ಪರವಾನಗಿ ದಾಖಲೆ ಕಂಡುಬಂದಿದೆ",
    "Confirm Residential Address": "ಪ್ರಸ್ತುತ ವಸತಿ ವಿಳಾಸವನ್ನು ದೃಢೀಕರಿಸಿ",
    "Mandatory Document Verification": "ಕಡ್ಡಾಯ ದಾಖಲೆಗಳ ಪರಿಶೀಲನೆ",
    "Government RTO Fee Settlement": "ಸರ್ಕಾರಿ ಆರ್‌ಟಿಒ ಶುಲ್ಕ ಇತ್ಯರ್ಥ",
    "Payment Successful & Verified!": "ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ ಮತ್ತು ಪರಿಶೀಲಿಸಲಾಗಿದೆ!",
    "Your fee has been received and credited to the Transport Department account. Your practical driving test booking is now unlocked.": "ನಿಮ್ಮ ಶುಲ್ಕವನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ ಮತ್ತು ಸಾರಿಗೆ ಇಲಾಖೆಯ ಖಾತೆಗೆ ಜಮಾ ಮಾಡಲಾಗಿದೆ. ನಿಮ್ಮ ಪ್ರಾಯೋಗಿಕ ಚಾಲನಾ ಪರೀಕ್ಷೆಯ ಬುಕಿಂಗ್ ಈಗ ಅನ್‌ಲಾಕ್ ಆಗಿದೆ.",
    "Select an Automated RTO Test Track": "ಸ್ವಯಂಚಾಲಿತ ಆರ್‌ಟಿಒ ಪರೀಕ್ಷಾ ಟ್ರ್ಯಾಕ್ ಆಯ್ಕೆಮಾಡಿ",
    "Select Preferred Driving Test Slot": "ಆದ್ಯತೆಯ ಚಾಲನಾ ಪರೀಕ್ಷಾ ಸ್ಲಾಟ್ ಆಯ್ಕೆಮಾಡಿ",
    "Driving Test Appointment Fixed!": "ಚಾಲನಾ ಪರೀಕ್ಷೆಯ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ನಿಗದಿಯಾಗಿದೆ!",
    "Driving Test Evaluation & Results": "ಚಾಲನಾ ಪರೀಕ್ಷೆಯ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಫಲಿತಾಂಶಗಳು",
    "Smartcard Printing & Speed Post Dispatch": "ಸ್ಮಾರ್ಟ್‌ಕಾರ್ಡ್ ಮುದ್ರಣ ಮತ್ತು ಸ್ಪೀಡ್ ಪೋಸ್ಟ್ ರವಾನೆ",

    // Licence Services Subpages
    "Licence Services Hub": "ಪರವಾನಗಿ ಸೇವಾ ಕೇಂದ್ರ",
    "Driving Licence Renewal": "ಚಾಲನಾ ಪರವಾನಗಿ ನವೀಕರಣ",
    "Renew your licence and continue driving legally.": "ನಿಮ್ಮ ಪರವಾನಗಿಯನ್ನು ನವೀಕರಿಸಿ ಮತ್ತು ಕಾನೂನುಬದ್ಧವಾಗಿ ಚಾಲನೆ ಮುಂದುವರಿಸಿ.",
    "Renew Licence →": "ಪರವಾನಗಿ ನವೀಕರಿಸಿ →",
    "Duplicate Driving Licence": "ನಕಲಿ ಚಾಲನಾ ಪರವಾನಗಿ",
    "Request a duplicate licence if your licence is lost or damaged.": "ನಿಮ್ಮ ಪರವಾನಗಿ ಕಳೆದುಹೋದರೆ ಅಥವಾ ಹಾನಿಗೊಳಗಾದರೆ ನಕಲಿ ಪರವಾನಗಿಯನ್ನು ವಿನಂತಿಸಿ.",
    "Get Duplicate →": "ನಕಲಿ ಪಡೆಯಿರಿ →",
    "Update Licence Details": "ಪರವಾನಗಿ ವಿವರಗಳನ್ನು ನವೀಕರಿಸಿ",
    "Update eligible personal or licence information.": "ಅರ್ಹ ವೈಯಕ್ತಿಕ ಅಥವಾ ಪರವಾನಗಿ ಮಾಹಿತಿಯನ್ನು ನವೀಕರಿಸಿ.",
    "Update Details →": "ವಿವರಗಳನ್ನು ನವೀಕರಿಸಿ →",
    "How can we help with your licence?": "ನಿಮ್ಮ ಪರವಾನಗಿಗೆ ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    "Choose a service for your existing Driving Licence.": "ನಿಮ್ಮ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಚಾಲನಾ ಪರವಾನಗಿಗಾಗಿ ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "Change of Address in DL": "ಪರವಾನಗಿಯಲ್ಲಿ ವಿಳಾಸ ಬದಲಾವಣೆ",
    "Licence Details Extract": "ಪರವಾನಗಿ ವಿವರಗಳ ಉದ್ಧರಣ",
    "International Driving Permit": "ಅಂತರರಾಷ್ಟ್ರೀಯ ಚಾಲನಾ ಪರವಾನಗಿ",

    // Payments Page
    "Total Fees Paid": "ಪಾವತಿಸಿದ ಒಟ್ಟು ಶುಲ್ಕ",
    "Successful Transactions": "ಯಶಸ್ವಿ ವಹಿವಾಟುಗಳು",
    "Pending Charges": "ಬಾಕಿ ಇರುವ ಶುಲ್ಕಗಳು",
    "Transaction History": "ವಹಿವಾಟು ಇತಿಹಾಸ",
    "No payments recorded yet": "ಇನ್ನೂ ಯಾವುದೇ ಪಾವತಿಗಳನ್ನು ದಾಖಲಿಸಲಾಗಿಲ್ಲ",
    "Download Official Receipt": "ಅಧಿಕೃತ ರಶೀದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    "Download Proof": "ಪುರಾವೆಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    "Ref ID:": "ಉಲ್ಲೇಖ ಐಡಿ:",
    "Method:": "ಪಾವತಿ ವಿಧಾನ:",

    // Appointments Page
    "Book Driving Test Slot": "ಚಾಲನಾ ಪರೀಕ್ಷಾ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ",
    "Book Practical Test Slot": "ಪ್ರಾಯೋಗಿಕ ಪರೀಕ್ಷಾ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ",
    "Upcoming": "ಮುಂಬರುವ",
    "Past & History": "ಹಿಂದಿನ ಮತ್ತು ಇತಿಹಾಸ",
    "No upcoming appointments scheduled": "ಯಾವುದೇ ಮುಂಬರುವ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು ನಿಗದಿಯಾಗಿಲ್ಲ",
    "No appointment history": "ಯಾವುದೇ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಇತಿಹಾಸವಿಲ್ಲ",
    "Booking ID:": "ಬುಕಿಂಗ್ ಐಡಿ:",
    "Reschedule": "ಮರುಹೊಂದಿಸಿ",
    "Appointment Pass": "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಪಾಸ್",
    "Cancel Slot": "ಸ್ಲಾಟ್ ರದ್ದುಮಾಡಿ",

    // Notifications Page
    "FILTER BY": "ಫಿಲ್ಟರ್ ಮಾಡಿ",
    "All Notifications": "ಎಲ್ಲಾ ಅಧಿಸೂಚನೆಗಳು",
    "Applications": "ಅರ್ಜಿಗಳು",
    "Appointments": "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು",
    "Payments": "ಪಾವತಿಗಳು",
    "Licences": "ಪರವಾನಗಿಗಳು",
    "No notifications found": "ಯಾವುದೇ ಅಧಿಸೂಚನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    "No notifications available": "ಯಾವುದೇ ಅಧಿಸೂಚನೆಗಳು ಲಭ್ಯವಿಲ್ಲ",
    "Mark all as read": "ಎಲ್ಲವನ್ನೂ ಓದಿದ್ದೀರಿ ಎಂದು ಗುರುತಿಸಿ",
    "Clear All": "ಎಲ್ಲವನ್ನೂ ತೆರವುಗೊಳಿಸಿ",
    "Notification sent": "ಅಧಿಸೂಚನೆ ಕಳುಹಿಸಲಾಗಿದೆ",
    "Notification Sent": "ಅಧಿಸೂಚನೆ ಕಳುಹಿಸಲಾಗಿದೆ",
    "UPCOMING APPOINTMENT": "ಮುಂಬರುವ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್",
    "View Pass": "ಪಾಸ್ ವೀಕ್ಷಿಸಿ",

    // Documents Center Page
    "You haven't uploaded any documents yet": "ನೀವು ಇನ್ನೂ ಯಾವುದೇ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿಲ್ಲ",
    "Upload your Aadhaar ID proof, address verification, or Learner Licence copy to complete application scrutiny.": "ಅರ್ಜಿ ಪರಿಶೀಲನೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ನಿಮ್ಮ ಆಧಾರ್ ಗುರುತಿನ ಚೀಟಿ, ವಿಳಾಸ ಪರಿಶೀಲನೆ ಅಥವಾ ಕಲಿಕಾ ಪರವಾನಗಿ ಪ್ರತಿಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    "Upload Document": "ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "Uploaded:": "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ದಿನಾಂಕ:",
    "Validity:": "ಮಾನ್ಯತೆಯ ಅವಧಿ:",
    "Permanent": "ಖಾಯಂ",
    "Size:": "ಗಾತ್ರ:",
    "Upload New Document": "ಹೊಸ ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "Upload & Verify": "ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಪರಿಶೀಲಿಸಿ",
    "Document Category": "ದಾಖಲೆ ವರ್ಗ",
    "Document Label / Title": "ದಾಖಲೆಯ ಶೀರ್ಷಿಕೆ / ಹೆಸರು",
    "Select File": "ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ",
    "Identity Proof": "ಗುರುತಿನ ಪುರಾವೆ",
    "Address Proof": "ವಿಳಾಸ ಪುರಾವೆ",
    "Health & Fitness": "ಆರೋಗ್ಯ ಮತ್ತು ಫಿಟ್‌ನೆಸ್",
    "Biometric Proof": "ಬಯೋಮೆಟ್ರಿಕ್ ಪುರಾವೆ",
    "Licence Proof": "ಪರವಾನಗಿ ಪುರಾವೆ",
    "Document ID:": "ದಾಖಲೆ ಐಡಿ:",
    "Owner:": "ಮಾಲೀಕರು:",
    "Upload Date:": "ಅಪ್‌ಲೋಡ್ ದಿನಾಂಕ:",
    "Verification Status:": "ಪರಿಶೀಲನೆ ಸ್ಥಿತಿ:",

    // Journey & Speedometer
    "MY JOURNEY": "ನನ್ನ ಪ್ರಯಾಣ",
    "My Journey": "ನನ್ನ ಪ್ರಯಾಣ",
    "Track your progress through the complete digital licensing pipeline.": "ಸಂಪೂರ್ಣ ಡಿಜಿಟಲ್ ಪರವಾನಗಿ ಪ್ರಕ್ರಿಯೆಯ ಮೂಲಕ ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
    "AUTOMOTIVE DASHBOARD GAUGE": "ಸ್ವಯಂಚಾಲಿತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಗೇಜ್",
    "0 (START)": "0 (ಪ್ರಾರಂಭ)",
    "LL ISSUED": "ಎಲ್‌ಎಲ್ ನೀಡಲಾಗಿದೆ",
    "DL TEST": "ಡಿಎಲ್ ಪರೀಕ್ಷೆ",
    "100 (DL ISSUED)": "100 (ಡಿಎಲ್ ನೀಡಲಾಗಿದೆ)",
    "SPEEDOMETER REST POSITION (0%)": "ಸ್ಪೀಡೋಮೀಟರ್ ವಿಶ್ರಾಂತಿ ಸ್ಥಿತಿ (0%)",
    "SPEEDOMETER GAUGING": "ಸ್ಪೀಡೋಮೀಟರ್ ಪ್ರಗತಿ",
    "LL APPLICATION": "ಎಲ್‌ಎಲ್ ಅರ್ಜಿ",
    "DL APPLICATION · IN PROGRESS": "ಡಿಎಲ್ ಅರ್ಜಿ · ಪ್ರಗತಿಯಲ್ಲಿದೆ",
    "YOUR NEXT STEP": "ನಿಮ್ಮ ಮುಂದಿನ ಹಂತ",
    "Your Next Step": "ನಿಮ್ಮ ಮುಂದಿನ ಹಂತ",
    "Begin your Learner Licence application. Upload your Aadhaar identity proof and complete the online traffic rules test.": "ನಿಮ್ಮ ಕಲಿಕಾ ಪರವಾನಗಿ ಅರ್ಜಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿ. ನಿಮ್ಮ ಆಧಾರ್ ಗುರುತಿನ ಪುರಾವೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಆನ್‌ಲೈನ್ ಸಂಚಾರ ನಿಯಮಗಳ ಪರೀಕ್ಷೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.",
    "Complete your DL application. Your Learner Licence has been issued. You can now continue with your Driving Licence application.": "ನಿಮ್ಮ ಡಿಎಲ್ ಅರ್ಜಿಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ. ನಿಮ್ಮ ಕಲಿಕಾ ಪರವಾನಗಿ ನೀಡಲಾಗಿದೆ. ನೀವು ಈಗ ನಿಮ್ಮ ಚಾಲನಾ ಪರವಾನಗಿ ಅರ್ಜಿಯೊಂದಿಗೆ ಮುಂದುವರಿಯಬಹುದು.",
    "Start LL Application": "ಎಲ್‌ಎಲ್ ಅರ್ಜಿ ಪ್ರಾರಂಭಿಸಿ",
    "Continue DL Application": "ಡಿಎಲ್ ಅರ್ಜಿ ಮುಂದುವರಿಸಿ",
    "Journey Checklist": "ಪ್ರಯಾಣ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ",
    "Aadhaar Identity Verification": "ಆಧಾರ್ ಗುರುತಿನ ಪರಿಶೀಲನೆ",
    "Ready to start": "ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧ",
    "LL Computer Exam": "ಎಲ್‌ಎಲ್ ಕಂಪ್ಯೂಟರ್ ಪರೀಕ್ಷೆ",
    "Not started": "ಪ್ರಾರಂಭವಾಗಿಲ್ಲ",
    "Learner Licence Issuance": "ಕಲಿಕಾ ಪರವಾನಗಿ ವಿತರಣೆ",
    "Pending": "ಬಾಕಿ ಇದೆ",
    "Learner Licence Issued": "ಕಲಿಕಾ ಪರವಾನಗಿ ನೀಡಲಾಗಿದೆ",
    "Completed on 12 Aug 2026": "12 ಆಗಸ್ಟ್ 2026 ರಂದು ಪೂರ್ಣಗೊಂಡಿದೆ",
    "Medical Certificate Uploaded": "ವೈದ್ಯಕೀಯ ಪ್ರಮಾಣಪತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ",
    "Verified": "ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    "DL Application Form": "ಡಿಎಲ್ ಅರ್ಜಿ ನಮೂನೆ",
    "In progress": "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
    "In Progress": "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
    "GOVERNMENT RECORD": "ಸರ್ಕಾರಿ ದಾಖಲೆ",
    "Government Record": "ಸರ್ಕಾರಿ ದಾಖಲೆ",
    "LL Application Status: Not Started · Ready to Begin": "ಎಲ್‌ಎಲ್ ಅರ್ಜಿ ಸ್ಥಿತಿ: ಪ್ರಾರಂಭವಾಗಿಲ್ಲ · ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧ",
    "DL Application Status: Under Review · Last updated: 25 Aug 2026 · 4:32 PM": "ಡಿಎಲ್ ಅರ್ಜಿ ಸ್ಥಿತಿ: ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ · ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ: 25 ಆಗಸ್ಟ್ 2026 · ಸಂಜೆ 4:32",
    "Application Status": "ಅರ್ಜಿ ಸ್ಥಿತಿ",
    "Under Review": "ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ",
    "Last updated": "ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ",

    // Dashboard Banners & Notifications
    "DRIVING LICENCE ISSUED": "ಚಾಲನಾ ಪರವಾನಗಿ ನೀಡಲಾಗಿದೆ",
    "Practical Driving Test Passed — Driving Licence is active.": "ಪ್ರಾಯೋಗಿಕ ಚಾಲನಾ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಉತ್ತೀರ್ಣರಾಗಿದ್ದೀರಿ — ಚಾಲನಾ ಪರವಾನಗಿ ಸಕ್ರಿಯವಾಗಿದೆ.",
    "View Licence": "ಪರವಾನಗಿ ವೀಕ್ಷಿಸಿ",
    "IMPORTANT NOTIFICATION": "ಪ್ರಮುಖ ಸೂಚನೆ",
    "View Details": "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    "Welcome to Indian Drives.": "Indian Drives ಗೆ ಸುಸ್ವಾಗತ.",
    "UPCOMING TEST APPOINTMENT": "ಮುಂಬರುವ ಪರೀಕ್ಷಾ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್",
    "RTO Practical Test": "ಆರ್‌ಟಿಒ ಪ್ರಾಯೋಗಿಕ ಪರೀಕ್ಷೆ",
    "View appointment": "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ವೀಕ್ಷಿಸಿ",

    // Government Services Page
    "PORTAL ACCESS": "ಪೋರ್ಟಲ್ ಪ್ರವೇಶ",
    "Government Services": "ಸರ್ಕಾರಿ ಸೇವೆಗಳು",
    "Access driving licence and transport services in one place. Streamlined for efficiency and ease of use.": "ಚಾಲನಾ ಪರವಾನಗಿ ಮತ್ತು ಸಾರಿಗೆ ಸೇವೆಗಳನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಪ್ರವೇಶಿಸಿ.",
    "Apply for LL": "ಎಲ್‌ಎಲ್‌ಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    "NEW APPLICANT": "ಹೊಸ ಅರ್ಜಿದಾರ",
    "Apply for DL": "ಡಿಎಲ್‌ಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    "PERMANENT": "ಖಾಯಂ",
    "Manage Services": "ಸೇವೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    "SERVICES": "ಸೇವೆಗಳು",
    "Tests & Appointments": "ಪರೀಕ್ಷೆ ಮತ್ತು ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು",
    "Book Now": "ಈಗಲೇ ಬುಕ್ ಮಾಡಿ",
    "SLOT BOOKING": "ಸ್ಲಾಟ್ ಬುಕಿಂಗ್",

    // Profile Page
    "Personal Information": "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
    "FULL NAME": "ಪೂರ್ಣ ಹೆಸರು",
    "DATE OF BIRTH": "ಹುಟ್ಟಿದ ದಿನಾಂಕ",
    "GENDER": "ಲಿಂಗ",
    "BLOOD GROUP": "ರಕ್ತದ ಗುಂಪು",
    "PERMANENT ADDRESS": "ಖಾಯಂ ವಿಳಾಸ",
    "Logout Account": "ಖಾತೆಯಿಂದ ಲಾಗ್ ಔಟ್",
    "My Applications": "ನನ್ನ ಅರ್ಜಿಗಳು",
    "CURRENT APPLICATION": "ಪ್ರಸ್ತುತ ಅರ್ಜಿ",
    "Driving Licence (DL) Application": "ಚಾಲನಾ ಪರವಾನಗಿ (DL) ಅರ್ಜಿ",
    "Learner Licence (LL) Application": "ಕಲಿಕಾ ಪರವಾನಗಿ (LL) ಅರ್ಜಿ",
    "Last updated: 2 days ago": "ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ: 2 ದಿನಗಳ ಹಿಂದೆ",
    "My Licences": "ನನ್ನ ಪರವಾನಗಿಗಳು",
    "Valid till": "ಮಾನ್ಯತೆಯ ಅವಧಿ",
    "My Documents": "ನನ್ನ ದಾಖಲೆಗಳು",
    "Manage Documents": "ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    "Edit Profile Details": "ಪ್ರೊಫೈಲ್ ವಿವರಗಳನ್ನು ಸಂಪಾದಿಸಿ",
    "Edit Profile": "ಪ್ರೊಫೈಲ್ ತಿದ್ದು",
    "PHONE NUMBER": "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    "EMAIL ADDRESS": "ಇಮೇಲ್ ವಿಳಾಸ",
    "Save Changes": "ಉಳಿಸಿ",

    // Settings Page
    "Notifications & Alerts": "ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳು",
    "SMS & WhatsApp Test Slot Reminders": "ಎಸ್‌ಎಂಎಸ್ ಮತ್ತು ವಾಟ್ಸಾಪ್ ಟೆಸ್ಟ್ ಸ್ಲಾಟ್ ಜ್ಞಾಪನೆಗಳು",
    "Receive instant reminders 24h before scheduled RTO driving tests.": "ನಿಗದಿತ ಚಾಲನಾ ಪರೀಕ್ಷೆಗಿಂತ 24 ಗಂಟೆಗಳ ಮೊದಲು ತ್ವರಿತ ಜ್ಞಾಪನೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ.",
    "Email Application Status Updates": "ಇಮೇಲ್ ಅರ್ಜಿ ಸ್ಥಿತಿ ನವೀಕರಣಗಳು",
    "Receive email alerts when RTO officers approve or update your application.": "ಆರ್‌ಟಿಒ ಅಧಿಕಾರಿಗಳು ಅರ್ಜಿಯನ್ನು ಅನುಮೋದಿಸಿದಾಗ ಇಮೇಲ್ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ.",
    "Security & Aadhaar e-KYC": "ಭದ್ರತೆ ಮತ್ತು ಆಧಾರ್ ಇ-ಕೆವೈಸಿ",
    "Manage 2-Factor Authentication and linked DigiLocker accounts.": "2-ಹಂತದ ದೃಢೀಕರಣ ಮತ್ತು ಲಿಂಕ್ ಮಾಡಲಾದ ಡಿಜಿಲಾಕರ್ ಖಾತೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
    "Configure Security Pin": "ಭದ್ರತಾ ಪಿನ್ ಕಾನ್ಫಿಗರ್ ಮಾಡಿ",
    "Preferred Language": "ಆದ್ಯತೆಯ ಭಾಷೆ",
    "Account & System Settings": "ಖಾತೆ ಮತ್ತು ಸಿಸ್ಟಮ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "Save Preferences": "ಆದ್ಯತೆಗಳನ್ನು ಉಳಿಸಿ",
    "PREFERENCES": "ಆದ್ಯತೆಗಳು",

    // Help Center & FAQs
    "HELP CENTER & FAQS": "ಸಹಾಯ ಕೇಂದ್ರ ಮತ್ತು ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು",
    "Help Center & FAQs": "ಸಹಾಯ ಕೇಂದ್ರ ಮತ್ತು ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು",
    "Find clear, official answers about Indian Drives services, licensing, and procedures.": "Indian Drives ಸೇವೆಗಳು, ಪರವಾನಗಿ ಮತ್ತು ಕಾರ್ಯವಿಧಾನಗಳ ಕುರಿತು ಸ್ಪಷ್ಟ ಅಧಿಕೃತ ಉತ್ತರಗಳನ್ನು ಹುಡುಕಿ.",
    "Can't find what you're looking for?": "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರ ಸಿಗಲಿಲ್ಲವೇ?",
    "AI ASSISTANT": "ಎಐ ಸಹಾಯಕ",
    "Our AI assistant is trained on official Indian Drives regulations to provide instant, specific guidance for your unique situation.": "ನಮ್ಮ ಎಐ ಸಹಾಯಕ DriveSEVA ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿಗೆ ಅನುಗುಣವಾಗಿ ತಕ್ಷಣದ ವೈಯಕ್ತಿಕ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.",
    "Ask DriveSEVA": "DriveSEVA ಅನ್ನು ಕೇಳಿ",
    "Ask DriveSEVA →": "DriveSEVA ಅನ್ನು ಕೇಳಿ →",
    "Browse by Category": "ವರ್ಗದ ಪ್ರಕಾರ ಬ್ರೌಸ್ ಮಾಡಿ",
    "Frequently Asked Questions": "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
    "TOP QUERIES": "ಪ್ರಮುಖ ಪ್ರಶ್ನೆಗಳು",
    "View All FAQs": "ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    "Show Less": "ಕಡಿಮೆ ತೋರಿಸಿ",
    "CATEGORY": "ವರ್ಗ",
    "Learner Licence": "ಕಲಿಕಾ ಪರವಾನಗಿ",
    "Driving Licence": "ಚಾಲನಾ ಪರವಾನಗಿ",
    "Documents": "ದಾಖಲೆಗಳು",
    "Payments": "ಪಾವತಿಗಳು",
    "Appointments": "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು",
    "Driving Test": "ಚಾಲನಾ ಪರೀಕ್ಷೆ",

    // Documents Center
    "DOCUMENT VAULT & EKYC VERIFICATION": "ದಾಖಲೆಗಳ ವಾಲ್ಟ್ ಮತ್ತು ಇ-ಕೆವೈಸಿ ಪರಿಶೀಲನೆ",
    "Document Vault & eKYC Verification": "ದಾಖಲೆಗಳ ವಾಲ್ಟ್ ಮತ್ತು ಇ-ಕೆವೈಸಿ ಪರಿಶೀಲನೆ",
    "Documents Center": "ದಾಖಲೆಗಳ ಕೇಂದ್ರ",
    "Manage the verified proofs used across your Indian Drives applications.": "ನಿಮ್ಮ Indian Drives ಅರ್ಜಿಗಳಲ್ಲಿ ಬಳಸಲಾದ ಪರಿಶೀಲಿಸಿದ ಪುರಾವೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
    "Upload New Document": "ಹೊಸ ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "All Documents": "ಎಲ್ಲಾ ದಾಖಲೆಗಳು",
    "Verified & Cleared": "ಪರಿಶೀಲಿಸಲಾಗಿದೆ ಮತ್ತು ತೆರವುಗೊಳಿಸಲಾಗಿದೆ",
    "Pending Scrutiny": "ಪರಿಶೀಲನೆ ಬಾಕಿ ಇದೆ",
    "Needs Update": "ನವೀಕರಣ ಅಗತ್ಯವಿದೆ",

    // Nav & Common
    "Dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "Help": "ಸಹಾಯ",
    "Notifications": "ಅಧಿಸೂಚನೆಗಳು",
    "Profile": "ಪ್ರೊಫೈಲ್",
    "Settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "How It Works": "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
    "Services": "ಸೇವೆಗಳು",
    "Sign In": "ಸೈನ್ ಇನ್ ಮಾಡಿ",
    "Start Your Journey": "ನಿಮ್ಮ ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ",
    "Start Your Journey →": "ನಿಮ್ಮ ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ →",
    "Continue": "ಮುಂದುವರಿಸಿ",
    "Continue →": "ಮುಂದುವರಿಸಿ →",
    "Back": "ಹಿಂದೆ",
    "Next": "ಮುಂದೆ",
    "Send": "ಕಳುಹಿಸಿ",
    "Save": "ಉಳಿಸಿ",
    "Cancel": "ರದ್ದುಮಾಡಿ",
    "Close": "ಮುಚ್ಚಿ",
    "New Chat": "ಹೊಸ ಸಂಭಾಷಣೆ",
    "DriveSEVA Assistant": "DriveSEVA ಸಹಾಯಕ",
    "Online • Ready to help": "ಆನ್‌ಲೈನ್ • ಸಹಾಯಕ್ಕೆ ಸಿದ್ಧ",
    "SUGGESTED QUESTIONS": "ಸೂಚಿಸಲಾದ ಪ್ರಶ್ನೆಗಳು",
    "Ask anything about driving licences...": "ಚಾಲನಾ ಪರವಾನಗಿಗಳ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ...",
    "AI ASSISTANT CAN MAKE MISTAKES. VERIFY IMPORTANT INFORMATION.": "ಎಐ ಸಹಾಯಕ ತಪ್ಪುಗಳನ್ನು ಮಾಡಬಹುದು. ಪ್ರಮುಖ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ."
  },

  // ─────────────────────────────────────────────────────────────
  // 3. BENGALI (বাংলা)
  // ─────────────────────────────────────────────────────────────
  bn: {
    // Top Bar, Shell & Footer
    "Indian Drives — A citizen experience concept for driving licence services.": "Indian Drives — ড্রাইভিং লাইসেন্স পরিষেবার নাগরিক অভিজ্ঞতা প্ল্যাটফর্ম।",
    "Application ID: DS-2409-KLM": "আবেদন আইডি: DS-2409-KLM",
    "CURRENT STEP": "বর্তমান ধাপ",

    // Cockpit & Live Assessment
    "NEXT CHECKPOINT": "পরবর্তী চেকপয়েন্ট",
    "Learner Licence Assessment Cockpit": "লার্নার লাইসেন্স মূল্যায়ন ককপিট",
    "Prepare for and complete your official online proctored road safety and traffic rules knowledge test.": "আপনার অফিশিয়াল অনলাইন প্রোক্টর্ড রোড সেফটি এবং ট্রাফিক নিয়মের পরীক্ষার প্রস্তুতি নিন এবং সম্পন্ন করুন।",
    "Proctored AI Assessment Portal": "এআই প্রোক্টর্ড মূল্যায়ন পোর্টাল",
    "YOUR ASSESSMENT CHECKPOINTS": "আপনার মূল্যায়ন চেকপয়েন্টসমূহ",
    "Road Safety & Traffic Rules Knowledge": "রোড সেফটি এবং ট্রাফিক নিয়মের জ্ঞান",
    "Revise core concepts before starting your live proctored examination.": "পরীক্ষা শুরু করার আগে মূল ধারণাগুলি সংশোধন করুন।",
    "Traffic Signals": "ট্রাফিক সংকেত",
    "Mandatory Road Signs": "বাধ্যতামূলক রাস্তার লক্ষণ",
    "Rules of the Road": "রাস্তার নিয়মাবলী",
    "Defensive Driving": "নিরাপদ ড্রাইভিং",
    "Practice Mock Test": "মক টেস্ট অনুশীলন করুন",
    "Assessment Readiness": "মূল্যায়নের প্রস্তুতি",
    "Review the test format and proctoring requirements before starting.": "শুরু করার আগে পরীক্ষার নিয়মাবলী ও নির্দেশিকা পর্যালোচনা করুন।",
    "TOTAL QUESTIONS": "মোট প্রশ্ন",
    "15 Multiple Choice": "১৫ বহুনির্বাচনী",
    "DURATION": "সময়কাল",
    "15 Minutes": "১৫ মিনিট",
    "PASSING SCORE": "পাসিং স্কোর",
    "9 / 15 (60%)": "৯ / ১৫ (৬০%)",
    "Complete": "সম্পন্ন",
    "Start Live Proctored Exam": "পরীক্ষা শুরু করুন",
    "Camera must remain on throughout the 15-minute test for identity verification.": "পরিচয় যাচাইয়ের জন্য পুরো ১৫ মিনিটের পরীক্ষার সময় ক্যামেরা চালু থাকতে হবে।",

    // LL Flow Subpages
    "Applicant Personal Details": "আবেদনকারীর ব্যক্তিগত বিবরণ",
    "Enter your personal details as verified with your Aadhaar identity card.": "আধার পরিচয়পত্রের বিবরণ অনুযায়ী ব্যক্তিগত তথ্য লিখুন।",
    "Full Name (as per Aadhaar)": "পুরো নাম (আধার কার্ড অনুযায়ী)",
    "Residential Address Details": "আবাসিক ঠিকানার বিবরণ",
    "Enter your current residential address within the RTO jurisdiction.": "আরটিও অধিক্ষেত্রের আওতায় বর্তমান ঠিকানা লিখুন।",
    "Street Address": "রাস্তা / বাড়ি নম্বর",
    "City / Town": "শহর / নগর",
    "Pincode": "পিন কোড",
    "Vehicle Class Selection": "যানবাহনের শ্রেণী নির্বাচন",
    "Required Documents Upload": "প্রয়োজনীয় নথিপত্র আপলোড",
    "Upload identity, age proof, and physical fitness self-declaration.": "পরিচয় প্রমাণ, বয়সের প্রমাণ এবং শারীরিক সুস্থতার ঘোষণা আপলোড করুন।",
    "Review Application Details": "আবেদনের বিবরণ পর্যালোচনা করুন",
    "Please verify all details carefully before submitting and proceeding to fee payment.": "ফি প্রদানের আগে দয়া করে সমস্ত বিবরণ সাবধানে যাচাই করুন।",
    "Government Fee Payment Checkout": "সরকারি ফি প্রদান",

    // DL Flow Subpages
    "Driving Licence (DL) Test Application": "স্থায়ী ড্রাইভিং লাইসেন্স (DL) আবেদন",
    "Verify your active Learner Licence details and book a practical driving test slot.": "আপনার সক্রিয় লার্নার লাইসেন্স যাচাই করুন এবং টেস্ট স্লট বুক করুন।",
    "Learner Licence Record Found": "লার্নার লাইসেন্স রেকর্ড পাওয়া গেছে",
    "Learner Licence Found": "লার্নার লাইসেন্স পাওয়া গেছে",
    "Confirm Residential Address": "বর্তমান ঠিকানা নিশ্চিত করুন",
    "Mandatory Document Verification": "প্রয়োজনীয় নথিপত্র যাচাইকরণ",
    "Government RTO Fee Settlement": "সরকারি ফি প্রদান",
    "Payment Successful & Verified!": "পেমেন্ট সফল ও যাচাইকৃত!",
    "Your fee has been received and credited to the Transport Department account. Your practical driving test booking is now unlocked.": "আপনার ফি সফলভাবে পরিবহন বিভাগে জমা হয়েছে। আপনার ড্রাইভিং টেস্ট বুকিং এখন আনলক করা হয়েছে।",
    "Select an Automated RTO Test Track": "নিকটবর্তী আরটিও টেস্ট ট্র্যাক নির্বাচন করুন",
    "Select Preferred Driving Test Slot": "ড্রাইভিং টেস্টের তারিখ ও সময় বেছে নিন",
    "Driving Test Appointment Fixed!": "ড্রাইভিং টেস্ট অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে!",
    "Driving Test Evaluation & Results": "টেস্ট ফলাফল ও মূল্যায়ন",
    "Smartcard Printing & Speed Post Dispatch": "স্মার্ট কার্ড প্রিন্টিং ও স্পিড পোস্ট ডেলিভারি",

    // Licence Services Subpages
    "Licence Services Hub": "লাইসেন্স পরিষেবা কেন্দ্র",
    "Driving Licence Renewal": "ড্রাইভিং লাইসেন্স নবায়ন",
    "Renew your licence and continue driving legally.": "আপনার লাইসেন্স নবায়ন করুন এবং বৈধভাবে গাড়ি চালানো চালিয়ে যান।",
    "Renew Licence →": "লাইসেন্স নবায়ন করুন →",
    "Duplicate Driving Licence": "ডুপ্লিকেট ড্রাইভিং লাইসেন্স",
    "Request a duplicate licence if your licence is lost or damaged.": "আপনার লাইসেন্স হারিয়ে গেলে বা ক্ষতিগ্রস্ত হলে ডুপ্লিকেট লাইসেন্সের জন্য অনুরোধ করুন।",
    "Get Duplicate →": "ডুপ্লিকেট পান →",
    "Update Licence Details": "লাইসেন্সের বিবরণ আপডেট করুন",
    "Update eligible personal or licence information.": "যোগ্য ব্যক্তিগত বা লাইসেন্সের তথ্য আপডেট করুন।",
    "Update Details →": "বিবরণ আপডেট করুন →",
    "How can we help with your licence?": "আমরা আপনার লাইসেন্সে কীভাবে সাহায্য করতে পারি?",
    "Choose a service for your existing Driving Licence.": "আপনার বিদ্যমান ড্রাইভিং লাইসেন্সের জন্য একটি পরিষেবা চয়ন করুন।",
    "Change of Address in DL": "ঠিকানা পরিবর্তন",
    "Licence Details Extract": "লাইসেন্স বিবরণ উদ্ধরণ",
    "International Driving Permit": "আন্তর্জাতিক ড্রাইভিং পারমিট",

    // Payments Page
    "Total Fees Paid": "মোট প্রদত্ত ফি",
    "Successful Transactions": "সফল লেনদেন",
    "Pending Charges": "মুলতুবি চার্জ",
    "Transaction History": "লেনদেনের ইতিহাস",
    "No payments recorded yet": "এখনও কোনও পেমেন্ট রেকর্ড করা হয়নি",
    "Download Official Receipt": "অফিসিয়াল রসিদ ডাউনলোড করুন",
    "Download Proof": "প্রমাণপত্র ডাউনলোড করুন",
    "Ref ID:": "রেফারেন্স আইডি:",
    "Method:": "পেমেন্ট পদ্ধতি:",

    // Appointments Page
    "Book Driving Test Slot": "ড্রাইভিং টেস্ট স্লট বুক করুন",
    "Book Practical Test Slot": "ব্যবহারিক টেস্ট স্লট বুক করুন",
    "Upcoming": "আসন্ন",
    "Past & History": "অতীত ও ইতিহাস",
    "No upcoming appointments scheduled": "কোনও আসন্ন অ্যাপয়েন্টমেন্ট নির্ধারিত নেই",
    "No appointment history": "কোনও অ্যাপয়েন্টমেন্ট ইতিহাস নেই",
    "Booking ID:": "বুকিং আইডি:",
    "Reschedule": "পুনঃনির্ধারণ করুন",
    "Appointment Pass": "অ্যাপয়েন্টমেন্ট পাস",
    "Cancel Slot": "স্লট বাতিল করুন",

    // Notifications Page
    "FILTER BY": "ফিল্টার করুন",
    "All Notifications": "সমস্ত বিজ্ঞপ্তি",
    "Applications": "আবেদনসমূহ",
    "Appointments": "অ্যাপয়েন্টমেন্ট",
    "Payments": "পেমেন্ট",
    "Licences": "লাইসেন্স",
    "No notifications found": "কোনও বিজ্ঞপ্তি পাওয়া যায়নি",
    "No notifications available": "কোনও বিজ্ঞপ্তি নেই",
    "Mark all as read": "সব পঠিত হিসেবে চিহ্নিত করুন",
    "Clear All": "সব মুছে ফেলুন",
    "Notification sent": "বিজ্ঞপ্তি পাঠানো হয়েছে",
    "Notification Sent": "বিজ্ঞপ্তি পাঠানো হয়েছে",
    "UPCOMING APPOINTMENT": "আসন্ন অ্যাপয়েন্টমেন্ট",
    "View Pass": "পাস দেখুন",

    // Documents Center Page
    "You haven't uploaded any documents yet": "আপনি এখনও কোনও নথি আপলোড করেননি",
    "Upload your Aadhaar ID proof, address verification, or Learner Licence copy to complete application scrutiny.": "আবেদন যাচাই সম্পূর্ণ করতে আপনার আধার পরিচয়পত্র, ঠিকানার প্রমাণ বা লার্নার লাইসেন্সের অনুলিপি আপলোড করুন।",
    "Upload Document": "নথি আপলোড করুন",
    "Uploaded:": "আপলোড তারিখ:",
    "Validity:": "মেয়াদ:",
    "Permanent": "স্থায়ী",
    "Size:": "আকার:",
    "Upload New Document": "নতুন নথি আপলোড করুন",
    "Upload & Verify": "আপলোড এবং যাচাই করুন",
    "Document Category": "নথির বিভাগ",
    "Document Label / Title": "নথির শিরোনাম / নাম",
    "Select File": "ফাইল নির্বাচন করুন",
    "Identity Proof": "পরিচয় প্রমাণ",
    "Address Proof": "ঠিকানার প্রমাণ",
    "Health & Fitness": "স্বাস্থ্য ও ফিটনেস",
    "Biometric Proof": "বায়োমেট্রিক প্রমাণ",
    "Licence Proof": "লাইসেন্স প্রমাণ",
    "Document ID:": "নথি আইডি:",
    "Owner:": "মালিক:",
    "Upload Date:": "আপলোড তারিখ:",
    "Verification Status:": "যাচাইকরণের স্থিতি:",

    // Journey & Speedometer
    "MY JOURNEY": "আমার যাত্রা",
    "My Journey": "আমার যাত্রা",
    "Track your progress through the complete digital licensing pipeline.": "সম্পূর্ণ ডিজিটাল লাইসেন্সিং প্রক্রিয়ার মাধ্যমে আপনার অগ্রগতি ট্র্যাক করুন।",
    "AUTOMOTIVE DASHBOARD GAUGE": "স্বয়ংক্রিয় ড্যাশবোর্ড গেজ",
    "0 (START)": "০ (শুরু)",
    "LL ISSUED": "এলএল প্রদান করা হয়েছে",
    "DL TEST": "ডিএল টেস্ট",
    "100 (DL ISSUED)": "১০০ (ডিএল প্রদান করা হয়েছে)",
    "SPEEDOMETER REST POSITION (0%)": "স্পিডোমিটার বিশ্রাম অবস্থান (০%)",
    "SPEEDOMETER GAUGING": "স্পিডোমিটার পরিমাপ",
    "LL APPLICATION": "এলএল আবেদন",
    "DL APPLICATION · IN PROGRESS": "ডিএল আবেদন · প্রক্রিয়াধীন",
    "YOUR NEXT STEP": "আপনার পরবর্তী পদক্ষেপ",
    "Your Next Step": "আপনার পরবর্তী পদক্ষেপ",
    "Begin your Learner Licence application. Upload your Aadhaar identity proof and complete the online traffic rules test.": "আপনার লার্নার লাইসেন্স আবেদন শুরু করুন। আপনার আধার আইডি প্রমাণ আপলোড করুন এবং অনলাইন ট্রাফিক নিয়ম পরীক্ষা সম্পূর্ণ করুন।",
    "Complete your DL application. Your Learner Licence has been issued. You can now continue with your Driving Licence application.": "আপনার ডিএল আবেদন সম্পূর্ণ করুন। আপনার লার্নার লাইসেন্স জারি করা হয়েছে। আপনি এখন আপনার ড্রাইভিং লাইসেন্স আবেদন চালিয়ে যেতে পারেন।",
    "Start LL Application": "এলএল আবেদন শুরু করুন",
    "Continue DL Application": "ডিএল আবেদন চালিয়ে যান",
    "Journey Checklist": "যাত্রার চেকলিস্ট",
    "Aadhaar Identity Verification": "আধার পরিচয় যাচাইকরণ",
    "Ready to start": "শুরু করার জন্য প্রস্তুত",
    "LL Computer Exam": "এলএল কম্পিউটার পরীক্ষা",
    "Not started": "শুরু হয়নি",
    "Learner Licence Issuance": "লার্নার লাইসেন্স প্রদান",
    "Pending": "মুলতুবি",
    "Learner Licence Issued": "লার্নার লাইসেন্স প্রদান করা হয়েছে",
    "Completed on 12 Aug 2026": "১২ আগস্ট ২০২৬ এ সম্পন্ন",
    "Medical Certificate Uploaded": "মেডিকেল সার্টিফিকেট আপলোড করা হয়েছে",
    "Verified": "যাচাইকৃত",
    "DL Application Form": "ডিএল আবেদনপত্র",
    "In progress": "প্রক্রিয়াধীন",
    "In Progress": "প্রক্রিয়াধীন",
    "GOVERNMENT RECORD": "সরকারি রেকর্ড",
    "Government Record": "সরকারি রেকর্ড",
    "LL Application Status: Not Started · Ready to Begin": "এলএল আবেদন স্থিতি: শুরু হয়নি · শুরু করার জন্য প্রস্তুত",
    "DL Application Status: Under Review · Last updated: 25 Aug 2026 · 4:32 PM": "ডিএল আবেদন স্থিতি: পর্যালোচনার অধীনে · সর্বশেষ আপডেট: ২৫ আগস্ট ২০২৬ · বিকেল ৪:৩২",
    "Application Status": "আবেদন স্থিতি",
    "Under Review": "পর্যালোচনার অধীনে",
    "Last updated": "সর্বশেষ আপডেট",

    // Dashboard Banners & Notifications
    "DRIVING LICENCE ISSUED": "ড্রাইভিং লাইসেন্স প্রদান করা হয়েছে",
    "Practical Driving Test Passed — Driving Licence is active.": "ব্যবহারিক ড্রাইভিং টেস্টে উত্তীর্ণ — ড্রাইভিং লাইসেন্স সক্রিয়।",
    "View Licence": "লাইসেন্স দেখুন",
    "IMPORTANT NOTIFICATION": "গুরুত্বপূর্ণ বিজ্ঞপ্তি",
    "View Details": "বিবরণ দেখুন",
    "Welcome to Indian Drives.": "Indian Drives-এ আপনাকে স্বাগতম।",
    "UPCOMING TEST APPOINTMENT": "আসন্ন টেস্ট অ্যাপয়েন্টমেন্ট",
    "RTO Practical Test": "আরটিও ব্যবহারিক টেস্ট",
    "View appointment": "অ্যাপয়েন্টমেন্ট দেখুন",

    // Government Services Page
    "PORTAL ACCESS": "পোর্টাল অ্যাক্সেস",
    "Government Services": "সরকারি পরিষেবা",
    "Access driving licence and transport services in one place. Streamlined for efficiency and ease of use.": "ড্রাইভিং লাইসেন্স এবং পরিবহন পরিষেবা এক জায়গায় অ্যাক্সেস করুন।",
    "Apply for LL": "এলএল-এর জন্য আবেদন করুন",
    "NEW APPLICANT": "নতুন আবেদনকারী",
    "Apply for DL": "ডিএল-এর জন্য আবেদন করুন",
    "PERMANENT": "স্থায়ী",
    "Manage Services": "পরিষেবা পরিচালনা করুন",
    "SERVICES": "পরিষেবা",
    "Tests & Appointments": "টেস্ট ও অ্যাপয়েন্টমেন্ট",
    "Book Now": "এখনই বুক করুন",
    "SLOT BOOKING": "স্লট বুকিং",

    // Profile Page
    "Personal Information": "ব্যক্তিগত তথ্য",
    "FULL NAME": "পুরো নাম",
    "DATE OF BIRTH": "জন্ম তারিখ",
    "GENDER": "লিঙ্গ",
    "BLOOD GROUP": "রক্তের গ্রুপ",
    "PERMANENT ADDRESS": "স্থায়ী ঠিকানা",
    "Logout Account": "লগ আউট করুন",
    "My Applications": "আমার আবেদনসমূহ",
    "CURRENT APPLICATION": "বর্তমান আবেদন",
    "Driving Licence (DL) Application": "ড্রাইভিং লাইসেন্স (DL) আবেদন",
    "Learner Licence (LL) Application": "লার্নার লাইসেন্স (LL) আবেদন",
    "Last updated: 2 days ago": "সর্বশেষ আপডেট: ২ দিন আগে",
    "My Licences": "আমার লাইসেন্স",
    "Valid till": "মেয়াদ",
    "My Documents": "আমার নথিপত্র",
    "Manage Documents": "নথিপত্র পরিচালনা করুন",
    "Edit Profile Details": "প্রোফাইল বিবরণ সম্পাদনা করুন",
    "Edit Profile": "প্রোফাইল সম্পাদনা",
    "PHONE NUMBER": "মোবাইল নম্বর",
    "EMAIL ADDRESS": "ইমেল ঠিকানা",
    "Save Changes": "সংরক্ষণ করুন",

    // Settings Page
    "Notifications & Alerts": "বিজ্ঞপ্তি এবং সতর্কতা",
    "SMS & WhatsApp Test Slot Reminders": "এসএমএস এবং হোয়াটসঅ্যাপ টেস্ট স্লট রিমাইন্ডার",
    "Receive instant reminders 24h before scheduled RTO driving tests.": "নির্ধারিত ড্রাইভিং টেস্টের ২৪ ঘণ্টা আগে তাত্ক্ষণিক অনুস্মারক পান।",
    "Email Application Status Updates": "ইমেল আবেদন স্থিতি আপডেট",
    "Receive email alerts when RTO officers approve or update your application.": "আরটিও কর্মকর্তারা আবেদন অনুমোদন করলে ইমেল সতর্কতা পান।",
    "Security & Aadhaar e-KYC": "নিরাপত্তা এবং আধার ই-কেওয়াইসি",
    "Manage 2-Factor Authentication and linked DigiLocker accounts.": "২-ফ্যাক্টর প্রমাণীকরণ এবং সংযুক্ত ডিজিলকার অ্যাকাউন্ট পরিচালনা করুন।",
    "Configure Security Pin": "সিকিউরিটি পিন কনফিগার করুন",
    "Preferred Language": "পছন্দের ভাষা",
    "Account & System Settings": "অ্যাকাউন্ট এবং সিস্টেম সেটিংস",
    "Save Preferences": "পছন্দগুলি সংরক্ষণ করুন",
    "PREFERENCES": "পছন্দসমূহ",

    // Help Center & FAQs
    "HELP CENTER & FAQS": "সাহায্য কেন্দ্র এবং সাধারণ প্রশ্নোত্তর",
    "Help Center & FAQs": "সাহায্য কেন্দ্র এবং সাধারণ প্রশ্নোত্তর",
    "Find clear, official answers about Indian Drives services, licensing, and procedures.": "Indian Drives পরিষেবা, লাইসেন্সিং এবং আরটিও পদ্ধতি সম্পর্কে স্পষ্ট অফিসিয়াল উত্তর পান।",
    "Can't find what you're looking for?": "আপনি কি খুঁজছেন তা খুঁজে পাচ্ছেন না?",
    "AI ASSISTANT": "এআই সহকারী",
    "Our AI assistant is trained on official Indian Drives regulations to provide instant, specific guidance for your unique situation.": "আমাদের এআই সহকারী DriveSEVA আপনার পরিস্থিতির জন্য তাৎক্ষণিক নির্দিষ্ট দিকনির্দেশনা প্রদান করে।",
    "Ask DriveSEVA": "DriveSEVA-কে জিজ্ঞাসা করুন",
    "Ask DriveSEVA →": "DriveSEVA-কে জিজ্ঞাসা করুন →",
    "Browse by Category": "বিভাগ অনুসারে ব্রাউজ করুন",
    "Frequently Asked Questions": "সাধারণ প্রশ্নোত্তর",
    "TOP QUERIES": "শীর্ষ প্রশ্নাবলী",
    "View All FAQs": "সব প্রশ্ন দেখুন",
    "Show Less": "কম দেখুন",
    "CATEGORY": "বিভাগ",
    "Learner Licence": "লার্নার লাইসেন্স",
    "Driving Licence": "ড্রাইভিং লাইসেন্স",
    "Documents": "নথিপত্র",
    "Payments": "পেমেন্ট",
    "Appointments": "অ্যাপয়েন্টমেন্ট",
    "Driving Test": "ড্রাইভিং টেস্ট",

    // Documents Center
    "DOCUMENT VAULT & EKYC VERIFICATION": "নথিপত্র ভল্ট এবং ই-কেওয়াইসি যাচাইকরণ",
    "Document Vault & eKYC Verification": "নথিপত্র ভল্ট এবং ই-কেওয়াইসি যাচাইকরণ",
    "Documents Center": "নথিপত্র কেন্দ্র",
    "Manage the verified proofs used across your Indian Drives applications.": "আপনার Indian Drives আবেদনে ব্যবহৃত যাচাইকৃত প্রমাণপত্র পরিচালনা করুন।",
    "Upload New Document": "নতুন নথি আপলোড করুন",
    "All Documents": "সব নথিপত্র",
    "Verified & Cleared": "যাচাইকৃত ও অনুমোদিত",
    "Pending Scrutiny": "যাচাইকরণ মুলতুবি",
    "Needs Update": "আপডেট প্রয়োজন",

    // Nav & Common
    "Dashboard": "ড্যাশবোর্ড",
    "Help": "সাহায্য",
    "Notifications": "বিজ্ঞপ্তি",
    "Profile": "প্রোফাইল",
    "Settings": "সেটিংস",
    "How It Works": "এটি কীভাবে কাজ করে",
    "Services": "পরিষেবা",
    "Sign In": "সাইন ইন করুন",
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
    "New Chat": "নতুন চ্যাট",
    "DriveSEVA Assistant": "DriveSEVA সহকারী",
    "Online • Ready to help": "অনলাইন • সহায়তার জন্য প্রস্তুত",
    "SUGGESTED QUESTIONS": "প্রস্তাবিত প্রশ্নাবলী",
    "Ask anything about driving licences...": "ড্রাইভিং লাইসেন্স সম্পর্কে যা কিছু জিজ্ঞাসা করুন...",
    "AI ASSISTANT CAN MAKE MISTAKES. VERIFY IMPORTANT INFORMATION.": "এআই সহকারী ভুল করতে পারে। গুরুত্বপূর্ণ তথ্য যাচাই করুন।"
  },

  // ─────────────────────────────────────────────────────────────
  // 4. TAMIL (தமிழ்)
  // ─────────────────────────────────────────────────────────────
  ta: {
    // Top Bar, Shell & Footer
    "Indian Drives — A citizen experience concept for driving licence services.": "Indian Drives — ஓட்டுநர் உரிம சேவைகளுக்கான குடிமக்கள் அனுபவ தளம்.",
    "Application ID: DS-2409-KLM": "விண்ணப்ப எண்: DS-2409-KLM",
    "CURRENT STEP": "தற்போதைய படி",

    // Cockpit & Live Assessment
    "NEXT CHECKPOINT": "அடுத்த சோதனைச் சாவடி",
    "Learner Licence Assessment Cockpit": "பழகுநர் உரிம மதிப்பீட்டு காக்பிட்",
    "Prepare for and complete your official online proctored road safety and traffic rules knowledge test.": "உங்கள் அதிகாரப்பூர்வ ஆன்லைன் சாலைப் பாதுகாப்பு மற்றும் போக்குவரத்து விதிமுறைத் தேர்வுக்கு தயாராகி முடிக்கவும்.",
    "Proctored AI Assessment Portal": "ஏஐ மதிப்பீட்டு போர்டல்",
    "YOUR ASSESSMENT CHECKPOINTS": "உங்கள் மதிப்பீட்டு சோதனைச் சாவடிகள்",
    "Road Safety & Traffic Rules Knowledge": "சாலைப் பாதுகாப்பு மற்றும் போக்குவரத்து விதிகள் அறிவு",
    "Revise core concepts before starting your live proctored examination.": "நேரலைத் தேர்வைத் தொடங்குவதற்கு முன் அடிப்படைக் கருத்துக்களைத் திருத்தவும்.",
    "Traffic Signals": "போக்குவரத்து சமிக்ஞைகள்",
    "Mandatory Road Signs": "கட்டாய சாலை அடையாளங்கள்",
    "Rules of the Road": "சாலை விதிகள்",
    "Defensive Driving": "பாதுகாப்பான ஓட்டுதல்",
    "Practice Mock Test": "மாதிரித் தேர்வைப் பயிற்சி செய்யுங்கள்",
    "Assessment Readiness": "மதிப்பீட்டுத் தயார்நிலை",
    "Review the test format and proctoring requirements before starting.": "தொடங்குவதற்கு முன் தேர்வு வடிவம் மற்றும் வழிகாட்டுதல்களை மதிப்பாய்வு செய்யவும்.",
    "TOTAL QUESTIONS": "மொத்த கேள்விகள்",
    "15 Multiple Choice": "15 பலவுள் தெரிவு",
    "DURATION": "கால அளவு",
    "15 Minutes": "15 நிமிடங்கள்",
    "PASSING SCORE": "தேர்ச்சி மதிப்பெண்",
    "9 / 15 (60%)": "9 / 15 (60%)",
    "Complete": "முடிந்தது",
    "Start Live Proctored Exam": "நேரலைத் தேர்வைத் தொடங்கு",
    "Camera must remain on throughout the 15-minute test for identity verification.": "அடையாள சரிபார்ப்பிற்காக 15 நிமிடத் தேர்வு முழுவதும் கேமரா இயங்க வேண்டும்.",

    // LL Flow Subpages
    "Applicant Personal Details": "விண்ணப்பதாரரின் தனிப்பட்ட விவரங்கள்",
    "Enter your personal details as verified with your Aadhaar identity card.": "ஆதார் அடையாள அட்டை விவரங்களின்படி தனிப்பட்ட தகவல்களை உள்ளிடவும்.",
    "Full Name (as per Aadhaar)": "முழுப் பெயர் (ஆதார் படி)",
    "Residential Address Details": "குடியிருப்பு முகவரி விவரங்கள்",
    "Enter your current residential address within the RTO jurisdiction.": "ஆர்டிஓ வரம்பிற்குள் உள்ள தற்போதைய முகவரியை உள்ளிடவும்.",
    "Street Address": "தெரு முகவரி / கதவு எண்",
    "City / Town": "நகரம் / ஊர்",
    "Pincode": "அஞ்சல் குறியீடு",
    "Vehicle Class Selection": "வாகன வகை தேர்வு",
    "Required Documents Upload": "தேவையான ஆவணங்கள் பதிவேற்றம்",
    "Upload identity, age proof, and physical fitness self-declaration.": "அடையாளச் சான்று, வயதுச் சான்று மற்றும் உடல் தகுதி சுய அறிவிப்பைப் பதிவேற்றவும்.",
    "Review Application Details": "விண்ணப்ப விவரங்களை மதிப்பாய்வு செய்யவும்",
    "Please verify all details carefully before submitting and proceeding to fee payment.": "கட்டணம் செலுத்துவதற்கு முன் அனைத்து விவரங்களையும் கவனமாக சரிபார்க்கவும்.",
    "Government Fee Payment Checkout": "அரசு கட்டணம் செலுத்துதல்",

    // DL Flow Subpages
    "Driving Licence (DL) Test Application": "ஓட்டுநர் உரிம (DL) தேர்வு விண்ணப்பம்",
    "Verify your active Learner Licence details and book a practical driving test slot.": "உங்கள் நேரடி பழகுநர் உரிம விவரங்களைச் சரிபார்த்து தேர்வு நேரத்தை முன்பதிவு செய்யுங்கள்.",
    "Learner Licence Record Found": "பழகுநர் உரிம பதிவு கண்டறியப்பட்டது",
    "Learner Licence Found": "பழகுநர் உரிம பதிவு கண்டறியப்பட்டது",
    "Confirm Residential Address": "தற்போதைய குடியிருப்பு முகவரியை உறுதிப்படுத்தவும்",
    "Mandatory Document Verification": "கட்டாய ஆவண சரிபார்ப்பு",
    "Government RTO Fee Settlement": "அரசு ஆர்டிஓ கட்டண தீர்வு",
    "Payment Successful & Verified!": "கட்டணம் செலுத்தப்பட்டு சரிபார்க்கப்பட்டது!",
    "Your fee has been received and credited to the Transport Department account. Your practical driving test booking is now unlocked.": "உங்கள் கட்டணம் பெறப்பட்டு போக்குவரத்துத் துறை கணக்கில் வரவு வைக்கப்பட்டுள்ளது. உங்கள் ஓட்டுநர் தேர்வு முன்பதிவு இப்போது திறக்கப்பட்டுள்ளது.",
    "Select an Automated RTO Test Track": "தானியங்கி ஆர்டிஓ தேர்வு மையத்தைத் தேர்ந்தெடுக்கவும்",
    "Select Preferred Driving Test Slot": "விருப்பமான தேர்வு நேரத்தைத் தேர்ந்தெடுக்கவும்",
    "Driving Test Appointment Fixed!": "ஓட்டுநர் தேர்வு முன்பதிவு உறுதி செய்யப்பட்டது!",
    "Driving Test Evaluation & Results": "ஓட்டுநர் தேர்வு முடிவுகள் மற்றும் மதிப்பீடு",
    "Smartcard Printing & Speed Post Dispatch": "ஸ்மார்ட் கார்டு அச்சிடுதல் மற்றும் ஸ்பீட் போஸ்ட் அனுப்புதல்",

    // Licence Services Subpages
    "Licence Services Hub": "உரிம சேவை மையம்",
    "Driving Licence Renewal": "ஓட்டுநர் உரிம புதுப்பித்தல்",
    "Renew your licence and continue driving legally.": "உங்கள் உரிமத்தைப் புதுப்பித்து சட்டப்பூர்வமாக தொடர்ந்து ஓட்டுங்கள்.",
    "Renew Licence →": "உரிமத்தைப் புதுப்பிக்கவும் →",
    "Duplicate Driving Licence": "நகல் ஓட்டுநர் உரிமம்",
    "Request a duplicate licence if your licence is lost or damaged.": "உரிமம் தொலைந்தாலோ அல்லது சேதமடைந்தாலோ நகல் உரிமத்தைக் கோருங்கள்.",
    "Get Duplicate →": "நகல் பெறவும் →",
    "Update Licence Details": "உரிம விவரங்களைப் புதுப்பிக்கவும்",
    "Update eligible personal or licence information.": "தகுதியான தனிப்பட்ட அல்லது உரிமத் தகவலைப் புதுப்பிக்கவும்.",
    "Update Details →": "விவரங்களைப் புதுப்பிக்கவும் →",
    "How can we help with your licence?": "உங்கள் உரிமத்திற்கு நாங்கள் எவ்வாறு உதவலாம்?",
    "Choose a service for your existing Driving Licence.": "உங்கள் தற்போதைய ஓட்டுநர் உரிமத்திற்கான சேவையைத் தேர்ந்தெடுக்கவும்.",
    "Change of Address in DL": "முகவரி மாற்றம்",
    "Licence Details Extract": "உரிம விவரங்களின் சாறு",
    "International Driving Permit": "சர்வதேச ஓட்டுநர் அனுமதி",

    // Payments Page
    "Total Fees Paid": "செலுத்தப்பட்ட மொத்தக் கட்டணம்",
    "Successful Transactions": "வெற்றிகரமான பரிவர்த்தனைகள்",
    "Pending Charges": "நிலுவைக் கட்டணங்கள்",
    "Transaction History": "பரிவர்த்தனை வரலாறு",
    "No payments recorded yet": "இன்னும் கட்டணங்கள் எதுவும் பதிவு செய்யப்படவில்லை",
    "Download Official Receipt": "அதிகாரப்பூர்வ ரசீதைப் பதிவிறக்குக",
    "Download Proof": "சான்றைப் பதிவிறக்குக",
    "Ref ID:": "குறிப்பு ஐடி:",
    "Method:": "பணம் செலுத்தும் முறை:",

    // Appointments Page
    "Book Driving Test Slot": "ஓட்டுநர் தேர்வு நேரத்தை முன்பதிவு செய்யவும்",
    "Book Practical Test Slot": "செய்முறைத் தேர்வு நேரத்தை முன்பதிவு செய்யவும்",
    "Upcoming": "வரவிருக்கும்",
    "Past & History": "கடந்த கால & வரலாறு",
    "No upcoming appointments scheduled": "வரவிருக்கும் முன்பதிவுகள் எதுவும் திட்டமிடப்படவில்லை",
    "No appointment history": "முன்பதிவு வரலாறு எதுவும் இல்லை",
    "Booking ID:": "முன்பதிவு ஐடி:",
    "Reschedule": "மறுதிட்டமிடு",
    "Appointment Pass": "முன்பதிவு பாஸ்",
    "Cancel Slot": "முன்பதிவை ரத்து செய்",

    // Notifications Page
    "FILTER BY": "வடிகட்டு",
    "All Notifications": "அனைத்து அறிவிப்புகள்",
    "Applications": "விண்ணப்பங்கள்",
    "Appointments": "முன்பதிவுகள்",
    "Payments": "கட்டணங்கள்",
    "Licences": "உரிமங்கள்",
    "No notifications found": "அறிவிப்புகள் எதுவும் கிடைக்கவில்லை",
    "No notifications available": "அறிவிப்புகள் எதுவும் கிடைக்கவில்லை",
    "Mark all as read": "அனைத்தையும் படித்ததாகக் குறிக்கவும்",
    "Clear All": "அனைத்தையும் அழிக்கவும்",
    "Notification sent": "அறிவிப்பு அனுப்பப்பட்டது",
    "Notification Sent": "அறிவிப்பு அனுப்பப்பட்டது",
    "UPCOMING APPOINTMENT": "வரவிருக்கும் முன்பதிவு",
    "View Pass": "பாஸ் பார்க்கவும்",

    // Documents Center Page
    "You haven't uploaded any documents yet": "நீங்கள் இன்னும் எந்த ஆவணங்களையும் பதிவேற்றவில்லை",
    "Upload your Aadhaar ID proof, address verification, or Learner Licence copy to complete application scrutiny.": "விண்ணப்ப ஆய்வை முடிக்க உங்கள் ஆதார் அடையாள அட்டை, முகவரிச் சான்று அல்லது பழகுநர் உரிம நகலைப் பதிவேற்றவும்.",
    "Upload Document": "ஆவணத்தைப் பதிவேற்றவும்",
    "Uploaded:": "பதிவேற்றப்பட்ட தேதி:",
    "Validity:": "செல்லுபடியாகும் காலம்:",
    "Permanent": "நிரந்தரம்",
    "Size:": "அளவு:",
    "Upload New Document": "புதிய ஆவணத்தைப் பதிவேற்றவும்",
    "Upload & Verify": "பதிவேற்றி சரிபார்க்கவும்",
    "Document Category": "ஆவண வகை",
    "Document Label / Title": "ஆவணத் தலைப்பு / பெயர்",
    "Select File": "கோப்பைத் தேர்ந்தெடுக்கவும்",
    "Identity Proof": "அடையாளச் சான்று",
    "Address Proof": "முகவரிச் சான்று",
    "Health & Fitness": "சுகாதாரம் & உடற்தகுதி",
    "Biometric Proof": "பயோமெட்ரிக் சான்று",
    "Licence Proof": "உரிமச் சான்று",
    "Document ID:": "ஆவண ஐடி:",
    "Owner:": "உரிமையாளர்:",
    "Upload Date:": "பதிவேற்றிய தேதி:",
    "Verification Status:": "சரிபார்ப்பு நிலை:",

    // Journey & Speedometer
    "MY JOURNEY": "எனது பயணம்",
    "My Journey": "எனது பயணம்",
    "Track your progress through the complete digital licensing pipeline.": "முழுமையான டிஜிட்டல் உரிம செயல்முறை மூலம் உங்கள் முன்னேற்றத்தைக் கண்காணிக்கவும்.",
    "AUTOMOTIVE DASHBOARD GAUGE": "தானியங்கி டாஷ்போர்டு அளவீடு",
    "0 (START)": "0 (தொடக்க)",
    "LL ISSUED": "எல்எல் வழங்கப்பட்டது",
    "DL TEST": "டிஎல் தேர்வு",
    "100 (DL ISSUED)": "100 (டிஎல் வழங்கப்பட்டது)",
    "SPEEDOMETER REST POSITION (0%)": "வேகமானி ஓய்வு நிலை (0%)",
    "SPEEDOMETER GAUGING": "வேகமானி முன்னேற்றம்",
    "LL APPLICATION": "எல்எல் விண்ணப்பம்",
    "DL APPLICATION · IN PROGRESS": "டிஎல் விண்ணப்பம் · செயலில் உள்ளது",
    "YOUR NEXT STEP": "உங்கள் அடுத்த படி",
    "Your Next Step": "உங்கள் அடுத்த படி",
    "Begin your Learner Licence application. Upload your Aadhaar identity proof and complete the online traffic rules test.": "உங்கள் பழகுநர் உரிம விண்ணப்பத்தைத் தொடங்குங்கள். உங்கள் ஆதார் அடையாளச் சான்றைப் பதிவேற்றி ஆன்லைன் போக்குவரத்து விதிமுறைத் தேர்வை முடிக்கவும்.",
    "Complete your DL application. Your Learner Licence has been issued. You can now continue with your Driving Licence application.": "உங்கள் டிஎல் விண்ணப்பத்தை முடிக்கவும். உங்கள் பழகுநர் உரிமம் வழங்கப்பட்டுள்ளது. இப்போது உங்கள் ஓட்டுநர் உரிம விண்ணப்பத்தைத் தொடரலாம்.",
    "Start LL Application": "எல்எல் விண்ணப்பத்தைத் தொடங்கு",
    "Continue DL Application": "டிஎல் விண்ணப்பத்தைத் தொடரவும்",
    "Journey Checklist": "பயண சரிபார்ப்பு பட்டியல்",
    "Aadhaar Identity Verification": "ஆதார் அடையாள சரிபார்ப்பு",
    "Ready to start": "தொடங்க தயார்",
    "LL Computer Exam": "எல்எல் கணினி தேர்வு",
    "Not started": "தொடங்கப்படவில்லை",
    "Learner Licence Issuance": "பழகுநர் உரிமம் வழங்குதல்",
    "Pending": "நிலுவையில் உள்ளது",
    "Learner Licence Issued": "பழகுநர் உரிமம் வழங்கப்பட்டது",
    "Completed on 12 Aug 2026": "12 ஆகஸ்ட் 2026 அன்று முடிந்தது",
    "Medical Certificate Uploaded": "மருத்துவச் சான்றிதழ் பதிவேற்றப்பட்டது",
    "Verified": "சரிபார்க்கப்பட்டது",
    "DL Application Form": "டிஎல் விண்ணப்பப் படிவம்",
    "In progress": "செயலில் உள்ளது",
    "In Progress": "செயலில் உள்ளது",
    "GOVERNMENT RECORD": "அரசு பதிவு",
    "Government Record": "அரசு பதிவு",
    "LL Application Status: Not Started · Ready to Begin": "எல்எல் விண்ணப்ப நிலை: தொடங்கப்படவில்லை · தொடங்க தயார்",
    "DL Application Status: Under Review · Last updated: 25 Aug 2026 · 4:32 PM": "டிஎல் விண்ணப்ப நிலை: பரிசீலனையில் உள்ளது · கடைசியாக புதுப்பிக்கப்பட்டது: 25 ஆகஸ்ட் 2026 · மாலை 4:32",
    "Application Status": "விண்ணப்ப நிலை",
    "Under Review": "பரிசீலனையில் உள்ளது",
    "Last updated": "கடைசியாக புதுப்பிக்கப்பட்டது",

    // Dashboard Banners & Notifications
    "DRIVING LICENCE ISSUED": "ஓட்டுநர் உரிமம் வழங்கப்பட்டது",
    "Practical Driving Test Passed — Driving Licence is active.": "செய்முறை ஓட்டுநர் தேர்வில் தேர்ச்சி பெற்றீர்கள் — ஓட்டுநர் உரிமம் செயலில் உள்ளது.",
    "View Licence": "உரிமத்தைப் பார்க்கவும்",
    "IMPORTANT NOTIFICATION": "முக்கிய அறிவிப்பு",
    "View Details": "விவரங்களைப் பார்க்கவும்",
    "Welcome to Indian Drives.": "Indian Drives-க்கு நல்வரவு.",
    "UPCOMING TEST APPOINTMENT": "வரவிருக்கும் தேர்வு முன்பதிவு",
    "RTO Practical Test": "ஆர்டிஓ ஓட்டுநர் தேர்வு",
    "View appointment": "முன்பதிவைப் பார்க்கவும்",

    // Government Services Page
    "PORTAL ACCESS": "போர்டல் அணுகல்",
    "Government Services": "அரசு சேவைகள்",
    "Access driving licence and transport services in one place. Streamlined for efficiency and ease of use.": "ஓட்டுநர் உரிமம் மற்றும் போக்குவரத்து சேவைகளை ஒரே இடத்தில் அணுகுங்கள்.",
    "Apply for LL": "எல்எல்-க்கு விண்ணப்பிக்கவும்",
    "NEW APPLICANT": "புதிய விண்ணப்பதாரர்",
    "Apply for DL": "டிஎல்-க்கு விண்ணப்பிக்கவும்",
    "PERMANENT": "நிரந்தரம்",
    "Manage Services": "சேவைகளை நிர்வகிக்கவும்",
    "SERVICES": "சேவைகள்",
    "Tests & Appointments": "தேர்வுகள் & முன்பதிவுகள்",
    "Book Now": "இப்போதே முன்பதிவு செய்யுங்கள்",
    "SLOT BOOKING": "முன்பதிவு",

    // Profile Page
    "Personal Information": "தனிப்பட்ட தகவல்",
    "FULL NAME": "முழுப் பெயர்",
    "DATE OF BIRTH": "பிறந்த தேதி",
    "GENDER": "பாலினம்",
    "BLOOD GROUP": "இரத்த வகை",
    "PERMANENT ADDRESS": "நிரந்தர முகவரி",
    "Logout Account": "கணக்கிலிருந்து வெளியேறுக",
    "My Applications": "எனது விண்ணப்பங்கள்",
    "CURRENT APPLICATION": "தற்போதைய விண்ணப்பம்",
    "Driving Licence (DL) Application": "ஓட்டுநர் உரிம (DL) விண்ணப்பம்",
    "Learner Licence (LL) Application": "பழகுநர் உரிம (LL) விண்ணப்பம்",
    "Last updated: 2 days ago": "கடைசியாக புதுப்பிக்கப்பட்டது: 2 நாட்களுக்கு முன்பு",
    "My Licences": "எனது உரிமங்கள்",
    "Valid till": "செல்லுபடியாகும் காலம்",
    "My Documents": "எனது ஆவணங்கள்",
    "Manage Documents": "ஆவணங்களை நிர்வகிக்கவும்",
    "Edit Profile Details": "சுயவிவர விவரங்களைத் திருத்து",
    "Edit Profile": "சுயவிவரத்தைத் திருத்து",
    "PHONE NUMBER": "மொபைல் எண்",
    "EMAIL ADDRESS": "மின்னஞ்சல் முகவரி",
    "Save Changes": "சேமிக்கவும்",

    // Settings Page
    "Notifications & Alerts": "அறிவிப்புகள் மற்றும் எச்சரிக்கைகள்",
    "SMS & WhatsApp Test Slot Reminders": "எஸ்எம்எஸ் மற்றும் வாட்ஸ்அப் தேர்வு நினைவூட்டல்கள்",
    "Receive instant reminders 24h before scheduled RTO driving tests.": "திட்டமிடப்பட்ட ஓட்டுநர் தேர்வுக்கு 24 மணி நேரத்திற்கு முன்பு உடனடி நினைவூட்டல்களைப் பெறுங்கள்.",
    "Email Application Status Updates": "மின்னஞ்சல் விண்ணப்ப நிலை புதுப்பிப்புகள்",
    "Receive email alerts when RTO officers approve or update your application.": "ஆர்டிஓ அதிகாரிகள் விண்ணப்பத்தை அனுமதிக்கும் போது மின்னஞ்சல் எச்சரிக்கைகளைப் பெறுங்கள்.",
    "Security & Aadhaar e-KYC": "பாதுகாப்பு மற்றும் ஆதார் இ-கேஒய்சி",
    "Manage 2-Factor Authentication and linked DigiLocker accounts.": "2-படி அங்கீகாரம் மற்றும் இணைக்கப்பட்ட டிஜிலாக்கர் கணக்குகளை நிர்வகிக்கவும்.",
    "Configure Security Pin": "பாதுகாப்பு பின்னை அமைக்கவும்",
    "Preferred Language": "விருப்பமான மொழி",
    "Account & System Settings": "கணக்கு மற்றும் கணினி அமைப்புகள்",
    "Save Preferences": "விருப்பங்களைச் சேமிக்கவும்",
    "PREFERENCES": "விருப்பத்தேர்வுகள்",

    // Help Center & FAQs
    "HELP CENTER & FAQS": "உதவி மையம் மற்றும் அடிக்கடி கேட்கப்படும் கேள்விகள்",
    "Help Center & FAQs": "உதவி மையம் மற்றும் அடிக்கடி கேட்கப்படும் கேள்விகள்",
    "Find clear, official answers about Indian Drives services, licensing, and procedures.": "Indian Drives சேவைகள், விதிகள் மற்றும் ஆர்டிஓ நடைமுறைகள் பற்றிய தெளிவான அதிகாரப்பூர்வ பதில்களைப் பெறுங்கள்.",
    "Can't find what you're looking for?": "நீங்கள் தேடுவதைக் கண்டுபிடிக்க முடியவில்லையா?",
    "AI ASSISTANT": "ஏஐ உதவியாளர்",
    "Our AI assistant is trained on official Indian Drives regulations to provide instant, specific guidance for your unique situation.": "எங்கள் ஏஐ உதவியாளர் DriveSEVA உங்கள் சூழ்நிலைக்கு உடனடி தனிப்பயனாக்கப்பட்ட வழிகாட்டுதலை வழங்குகிறது.",
    "Ask DriveSEVA": "DriveSEVA-விடம் கேளுங்கள்",
    "Ask DriveSEVA →": "DriveSEVA-விடம் கேளுங்கள் →",
    "Browse by Category": "வகையின்படி உலாவவும்",
    "Frequently Asked Questions": "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    "TOP QUERIES": "முக்கிய கேள்விகள்",
    "View All FAQs": "அனைத்து கேள்விகளையும் காண்க",
    "Show Less": "குறைவாகக் காட்டு",
    "CATEGORY": "வகை",
    "Learner Licence": "பழகுநர் உரிமம்",
    "Driving Licence": "ஓட்டுநர் உரிமம்",
    "Documents": "ஆவணங்கள்",
    "Payments": "கட்டணங்கள்",
    "Appointments": "முன்பதிவுகள்",
    "Driving Test": "ஓட்டுநர் தேர்வு",

    // Documents Center
    "DOCUMENT VAULT & EKYC VERIFICATION": "ஆவணங்கள் பெட்டகம் மற்றும் இ-கேஒய்சி சரிபார்ப்பு",
    "Document Vault & eKYC Verification": "ஆவணங்கள் பெட்டகம் மற்றும் இ-கேஒய்சி சரிபார்ப்பு",
    "Documents Center": "ஆவணங்கள் மையம்",
    "Manage the verified proofs used across your Indian Drives applications.": "உங்கள் Indian Drives விண்ணப்பங்களில் பயன்படுத்தப்பட்ட சரிபார்க்கப்பட்ட சான்றுகளை நிர்வகிக்கவும்.",
    "Upload New Document": "புதிய ஆவணத்தைப் பதிவேற்றவும்",
    "All Documents": "அனைத்து ஆவணங்கள்",
    "Verified & Cleared": "சரிபார்க்கப்பட்டது மற்றும் அனுமதிக்கப்பட்டது",
    "Pending Scrutiny": "சரிபார்ப்பு நிலுவையில் உள்ளது",
    "Needs Update": "புதுப்பிப்பு தேவை",

    // Nav & Common
    "Dashboard": "டாஷ்போர்டு",
    "Help": "உதவி",
    "Notifications": "அறிவிப்புகள்",
    "Profile": "சுயவிவரம்",
    "Settings": "அமைப்புகள்",
    "How It Works": "இது எவ்வாறு செயல்படுகிறது",
    "Services": "சேவைகள்",
    "Sign In": "உள்நுழைக",
    "Start Your Journey": "உங்கள் பயணத்தைத் தொடங்குங்கள்",
    "Start Your Journey →": "உங்கள் பயணத்தைத் தொடங்குங்கள் →",
    "Continue": "தொடரவும்",
    "Continue →": "தொடரவும் →",
    "Back": "பின்னால்",
    "Next": "அடுத்து",
    "Send": "அனுப்புக",
    "Save": "சேமிக்கவும்",
    "Cancel": "ரத்து செய்",
    "Close": "மூடு",
    "New Chat": "புதிய அரட்டை",
    "DriveSEVA Assistant": "DriveSEVA உதவியாளர்",
    "Online • Ready to help": "ஆன்லைன் • உதவ தயார்",
    "SUGGESTED QUESTIONS": "பரிந்துரைக்கப்பட்ட கேள்விகள்",
    "Ask anything about driving licences...": "ஓட்டுநர் உரிமங்கள் பற்றி எதையும் கேளுங்கள்...",
    "AI ASSISTANT CAN MAKE MISTAKES. VERIFY IMPORTANT INFORMATION.": "ஏஐ உதவியாளர் பிழைகளைச் செய்யலாம். முக்கியமான தகவல்களைச் சரிபார்க்கவும்."
  }
};

// Auto-fallback mapping for regional languages
dictionary.te = dictionary.te || dictionary.hi;
dictionary.mr = dictionary.mr || dictionary.hi;
dictionary.gu = dictionary.gu || dictionary.hi;
dictionary.ml = dictionary.ml || dictionary.hi;
dictionary.pa = dictionary.pa || dictionary.hi;

// Build reverse dictionary mapping all translated texts in all languages back to English
const reverseDictionary = {};
Object.entries(dictionary).forEach(([lang, dict]) => {
  if (lang === 'en' || !dict) return;
  Object.entries(dict).forEach(([enKey, transVal]) => {
    if (typeof transVal === 'string' && typeof enKey === 'string') {
      const cleanTrans = transVal.trim();
      const cleanEn = enKey.trim();
      if (cleanTrans && cleanEn && cleanTrans !== cleanEn) {
        reverseDictionary[cleanTrans] = cleanEn;
      }
    }
  });
});

let sortedReverseKeys = null;
function getSortedReverseKeys() {
  if (!sortedReverseKeys) {
    sortedReverseKeys = Object.entries(reverseDictionary).sort((a, b) => b[0].length - a[0].length);
  }
  return sortedReverseKeys;
}

// Sorted key cache by descending length to guarantee multi-word phrases match before single words
const sortedKeyCache = {};

function getSortedKeys(lang) {
  if (sortedKeyCache[lang]) return sortedKeyCache[lang];
  const dict = dictionary[lang] || dictionary.hi;
  if (!dict) return [];
  const entries = Object.entries(dict).sort((a, b) => b[0].length - a[0].length);
  sortedKeyCache[lang] = entries;
  return entries;
}

export function translateText(text, targetLang) {
  if (!text || typeof text !== 'string') return text;
  const trimmed = text.trim();
  if (!trimmed) return text;

  // 1. Translating back to ENGLISH (Restore original English for all translated terms)
  if (targetLang === 'en') {
    if (reverseDictionary[trimmed]) {
      return text.replace(trimmed, reverseDictionary[trimmed]);
    }
    const revEntries = getSortedReverseKeys();
    let res = text;
    for (const [transVal, enKey] of revEntries) {
      if (transVal.length >= 2 && res.includes(transVal)) {
        res = res.split(transVal).join(enKey);
      }
    }
    return res;
  }

  // 2. Translating English -> Target Language
  const langDict = dictionary[targetLang] || dictionary.hi;
  if (!langDict) return text;

  // First convert to English baseline if text was already in another Indian script
  let enBaseline = text;
  if (reverseDictionary[trimmed]) {
    enBaseline = text.replace(trimmed, reverseDictionary[trimmed]);
  } else {
    const revEntries = getSortedReverseKeys();
    for (const [transVal, enKey] of revEntries) {
      if (transVal.length >= 2 && enBaseline.includes(transVal)) {
        enBaseline = enBaseline.split(transVal).join(enKey);
      }
    }
  }

  const enTrimmed = enBaseline.trim();

  // Direct exact match
  if (langDict[enTrimmed]) {
    return enBaseline.replace(enTrimmed, langDict[enTrimmed]);
  }

  // Case-insensitive exact match
  const lower = enTrimmed.toLowerCase();
  for (const [enKey, transVal] of Object.entries(langDict)) {
    if (enKey.toLowerCase() === lower) {
      return enBaseline.replace(enTrimmed, transVal);
    }
  }

  // Substring / phrase substitution sorted by longest key first
  const sortedEntries = getSortedKeys(targetLang);
  let result = enBaseline;
  for (const [enKey, transVal] of sortedEntries) {
    if (enKey.length >= 2 && result.includes(enKey)) {
      result = result.split(enKey).join(transVal);
    }
  }

  return result;
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
        if (tag === 'input' || tag === 'textarea') {
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
    const currentVal = currentNode.nodeValue;
    if (isEnglish) {
      const enVal = translateText(currentVal, 'en');
      if (enVal !== currentVal) {
        currentNode.nodeValue = enVal;
      }
    } else if (langDict) {
      const translated = translateText(currentVal, targetLang);
      if (translated !== currentVal) {
        currentNode.nodeValue = translated;
      }
    }

    currentNode = walker.nextNode();
  }

  // Also translate input placeholders
  const inputs = rootElement.querySelectorAll('input[placeholder], textarea[placeholder]');
  inputs.forEach((input) => {
    const currentPlaceholder = input.getAttribute('placeholder') || '';
    if (isEnglish) {
      const enPlaceholder = translateText(currentPlaceholder, 'en');
      if (enPlaceholder !== currentPlaceholder) {
        input.setAttribute('placeholder', enPlaceholder);
      }
    } else if (langDict) {
      const translated = translateText(currentPlaceholder, targetLang);
      if (translated !== currentPlaceholder) {
        input.setAttribute('placeholder', translated);
      }
    }
  });

  // Also translate button title attributes
  const titledButtons = rootElement.querySelectorAll('button[title]');
  titledButtons.forEach((btn) => {
    const currentTitle = btn.getAttribute('title') || '';
    if (isEnglish) {
      const enTitle = translateText(currentTitle, 'en');
      if (enTitle !== currentTitle) {
        btn.setAttribute('title', enTitle);
      }
    } else if (langDict) {
      const translated = translateText(currentTitle, targetLang);
      if (translated !== currentTitle) {
        btn.setAttribute('title', translated);
      }
    }
  });
}
