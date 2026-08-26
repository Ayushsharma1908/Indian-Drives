import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { knowledge } from "./rag/knowledge.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const origin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin, credentials: true }));
app.use(express.json());

const ids = { app: 2, doc: 4, pay: 1, appointment: 1, note: 5 };

const db = {
  user: {
    id: "user-demo",
    name: "Ayush Kumar",
    email: "ayush@example.com",
    mobile: "9876543210",
    userType: "ll-holder",
    language: "en",
    avatar: "AK"
  },
  journey: {
    type: "DL",
    status: "in-progress",
    currentStage: "test-booking",
    steps: [
      { id: "application", label: "Application", status: "completed" },
      { id: "documents", label: "Documents", status: "completed" },
      { id: "payment", label: "Payment", status: "completed" },
      { id: "test-booking", label: "Driving Test", status: "current" },
      { id: "licence", label: "DL Issued", status: "upcoming" }
    ]
  },
  applications: [
    {
      id: "app-dl-001",
      type: "DL",
      status: "in-progress",
      currentStage: "test-booking",
      vehicleClass: "LMV",
      applicantName: "Ayush Kumar",
      rto: "Jamshedpur RTO",
      submittedAt: "2026-08-24"
    }
  ],
  licences: {
    ll: {
      number: "JH26/LL/123456",
      name: "Ayush Kumar",
      dob: "2004-05-12",
      vehicleClass: "LMV",
      issueDate: "2026-07-14",
      expiryDate: "2027-01-13",
      status: "valid"
    },
    dl: null
  },
  documents: [
    { id: "doc-1", name: "Aadhaar Card", type: "identity", status: "verified", updatedAt: "2026-08-22" },
    { id: "doc-2", name: "Address Proof", type: "address", status: "verified", updatedAt: "2026-08-22" },
    { id: "doc-3", name: "Learner Licence", type: "licence", status: "verified", updatedAt: "2026-08-23" }
  ],
  payments: [
    { id: "pay-001", purpose: "DL Application Fee", amount: 450, status: "success", transactionId: "TXN-2026-8F92KD", createdAt: "2026-08-23" }
  ],
  serviceRequests: [],
  appointments: [],
  notifications: [
    { id: "note-1", title: "Documents verified", body: "All uploaded documents are verified.", read: false, createdAt: "2026-08-23" },
    { id: "note-2", title: "Payment successful", body: "DL application fee payment was completed.", read: false, createdAt: "2026-08-23" },
    { id: "note-3", title: "Ready for test booking", body: "Choose your RTO, date, vehicle class, and test slot.", read: true, createdAt: "2026-08-24" }
  ],
  centres: [
    { id: "rto001", name: "Jamshedpur RTO Test Centre", address: "Sakchi, Jamshedpur, Jharkhand", latitude: 22.8046, longitude: 86.2029, distance: "4.2 km" },
    { id: "rto002", name: "Adityapur Transport Office", address: "Adityapur, Seraikela Kharsawan", latitude: 22.7835, longitude: 86.1571, distance: "8.8 km" },
    { id: "rto003", name: "Mango Driving Test Track", address: "Mango, Jamshedpur, Jharkhand", latitude: 22.8451, longitude: 86.2064, distance: "10.5 km" }
  ]
};

const schemas = {
  user: new mongoose.Schema({ name: String, email: String, mobile: String, userType: String }),
  application: new mongoose.Schema({ type: String, status: String, currentStage: String, vehicleClass: String }),
  licence: new mongoose.Schema({ number: String, type: String, status: String }),
  document: new mongoose.Schema({ name: String, type: String, status: String }),
  payment: new mongoose.Schema({ purpose: String, amount: Number, status: String, transactionId: String }),
  appointment: new mongoose.Schema({ testCentreId: String, date: String, time: String, vehicleClass: String, slot: String, status: String }),
  notification: new mongoose.Schema({ title: String, body: String, read: Boolean })
};

Object.entries(schemas).forEach(([name, schema]) => {
  if (!mongoose.models[name]) mongoose.model(name, schema);
});

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.warn("MongoDB unavailable, using demo memory store:", error.message));
}

function ok(data) {
  return { success: true, data };
}

function fail(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  throw error;
}

function addNotification(title, body) {
  const notification = {
    id: `note-${ids.note++}`,
    title,
    body,
    read: false,
    createdAt: new Date().toISOString().slice(0, 10)
  };
  db.notifications.unshift(notification);
  return notification;
}

function setJourney(stage) {
  const order = ["application", "documents", "payment", "test-booking", "processing", "licence"];
  db.journey.currentStage = stage;
  db.journey.steps = [
    { id: "application", label: "Application", status: stage === "application" ? "current" : "completed" },
    { id: "documents", label: "Documents", status: order.indexOf(stage) > 1 ? "completed" : stage === "documents" ? "current" : "upcoming" },
    { id: "payment", label: "Payment", status: order.indexOf(stage) > 2 ? "completed" : stage === "payment" ? "current" : "upcoming" },
    { id: "test-booking", label: "Driving Test", status: order.indexOf(stage) > 3 ? "completed" : stage === "test-booking" ? "current" : "upcoming" },
    { id: "licence", label: "DL Issued", status: stage === "licence" ? "completed" : "upcoming" }
  ];
}

app.get("/api/health", (_req, res) => res.json(ok({ status: "ready" })));

app.post("/api/auth/login", (req, res) => {
  const { email, mobile } = req.body;
  if (!email && !mobile) fail("Email or mobile is required");
  res.json(ok({ token: "demo-token", user: db.user }));
});

app.post("/api/auth/logout", (_req, res) => res.json(ok({ loggedOut: true })));
app.get("/api/auth/me", (_req, res) => res.json(ok(db.user)));

app.get("/api/journey", (_req, res) => res.json(ok(db.journey)));

app.post("/api/licences/verify/ll", (req, res) => {
  const { llNumber, dob } = req.body;
  if (llNumber !== db.licences.ll.number || dob !== db.licences.ll.dob) fail("Learner licence details could not be verified", 422);
  setJourney("test-booking");
  addNotification("Learner licence verified", "Your LL is linked. Continue with driving licence booking.");
  res.json(ok({ verified: true, licence: db.licences.ll, nextRoute: "/dl" }));
});

app.post("/api/licences/verify/dl", (req, res) => {
  const { dlNumber, dob } = req.body;
  const valid = dlNumber === "JH26/DL/654321" && dob === "2004-05-12";
  if (!valid) fail("Driving licence details could not be verified", 422);
  db.licences.dl = db.licences.dl || issuedLicence();
  res.json(ok({ verified: true, licence: db.licences.dl, nextRoute: "/services" }));
});

app.get("/api/licences/ll", (_req, res) => res.json(ok(db.licences.ll)));
app.get("/api/licences/dl", (_req, res) => res.json(ok(db.licences.dl)));

app.get("/api/applications", (_req, res) => res.json(ok(db.applications)));
app.get("/api/applications/:id", (req, res) => res.json(ok(db.applications.find((item) => item.id === req.params.id))));
app.post("/api/applications", (req, res) => {
  const application = {
    id: `app-${ids.app++}`,
    status: "in-progress",
    currentStage: "documents",
    submittedAt: new Date().toISOString().slice(0, 10),
    ...req.body
  };
  db.applications.unshift(application);
  setJourney("documents");
  addNotification(`${application.type || "Application"} submitted`, "Your application is saved and ready for document verification.");
  res.status(201).json(ok(application));
});
app.patch("/api/applications/:id", (req, res) => {
  const application = db.applications.find((item) => item.id === req.params.id);
  if (!application) fail("Application not found", 404);
  Object.assign(application, req.body);
  res.json(ok(application));
});
app.post("/api/applications/:id/approve", (req, res) => {
  const application = db.applications.find((item) => item.id === req.params.id);
  if (!application) fail("Application not found", 404);
  application.status = "approved";
  application.currentStage = "licence";
  db.licences.dl = issuedLicence();
  setJourney("licence");
  addNotification("Driving licence issued", "Your digital driving licence is ready.");
  res.json(ok({ application, licence: db.licences.dl }));
});

app.get("/api/documents", (_req, res) => res.json(ok(db.documents)));
app.post("/api/documents", (req, res) => {
  const document = { id: `doc-${ids.doc++}`, status: "processing", updatedAt: new Date().toISOString().slice(0, 10), ...req.body };
  db.documents.push(document);
  res.status(201).json(ok(document));
});
app.patch("/api/documents/:id", (req, res) => {
  const document = db.documents.find((item) => item.id === req.params.id);
  if (!document) fail("Document not found", 404);
  Object.assign(document, req.body, { updatedAt: new Date().toISOString().slice(0, 10) });
  if (document.status === "verified") addNotification("Document verified", `${document.name} has been verified.`);
  if (db.documents.every((item) => item.status === "verified")) setJourney("payment");
  res.json(ok(document));
});

app.get("/api/payments", (_req, res) => res.json(ok(db.payments)));
app.get("/api/payments/:id", (req, res) => res.json(ok(db.payments.find((item) => item.id === req.params.id))));
app.post("/api/payments", (req, res) => {
  const payment = {
    id: `pay-${String(ids.pay++).padStart(3, "0")}`,
    purpose: req.body.purpose || "DL Application Fee",
    amount: Number(req.body.amount || 450),
    status: "success",
    transactionId: `TXN-2026-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    createdAt: new Date().toISOString().slice(0, 10)
  };
  db.payments.unshift(payment);
  setJourney("test-booking");
  addNotification("Payment successful", `Payment ${payment.transactionId} is complete.`);
  res.status(201).json(ok(payment));
});

app.get("/api/services", (_req, res) => {
  res.json(ok([
    { id: "renewal", title: "Renewal", fee: 416, eta: "7 working days", required: ["Driving Licence", "Address Proof", "Photo"] },
    { id: "duplicate", title: "Duplicate Licence", fee: 216, eta: "5 working days", required: ["FIR/Declaration", "Identity Proof", "Photo"] },
    { id: "address-update", title: "Address Update", fee: 216, eta: "6 working days", required: ["Driving Licence", "New Address Proof"] },
    { id: "personal-update", title: "Personal Details Update", fee: 216, eta: "8 working days", required: ["Driving Licence", "Identity Proof", "Supporting Document"] }
  ]));
});

app.get("/api/service-requests", (_req, res) => res.json(ok(db.serviceRequests)));
app.post("/api/service-requests", (req, res) => {
  const { serviceId, licenceNumber, dob, address } = req.body;
  if (!serviceId || !licenceNumber || !dob) fail("Service, licence number, and DOB are required");
  const request = {
    id: `srv-${db.serviceRequests.length + 1}`,
    serviceId,
    licenceNumber,
    dob,
    address: address || "",
    status: "submitted",
    paymentStatus: "pending",
    referenceId: `SRV-2026-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    createdAt: new Date().toISOString().slice(0, 10)
  };
  db.serviceRequests.unshift(request);
  addNotification("Service request submitted", `Reference ${request.referenceId} has been created.`);
  res.status(201).json(ok(request));
});

app.get("/api/test-centres", (_req, res) => res.json(ok(db.centres)));
app.get("/api/test-centres/:id/slots", (req, res) => {
  const centre = db.centres.find((item) => item.id === req.params.id);
  if (!centre) fail("Test centre not found", 404);
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  const bookedSlots = db.appointments.filter((item) => item.testCentreId === centre.id && item.date === date).map((item) => item.slot);
  const slots = ["09:00", "10:30", "12:00", "14:30", "16:00"].map((time, index) => ({
    id: `${centre.id}-${date}-${index}`,
    time,
    status: bookedSlots.includes(time) ? "booked" : index === 4 ? "disabled" : "available"
  }));
  res.json(ok(slots));
});

app.get("/api/appointments", (_req, res) => res.json(ok(db.appointments)));
app.get("/api/appointments/:id", (req, res) => res.json(ok(db.appointments.find((item) => item.id === req.params.id))));
app.post("/api/appointments", (req, res) => {
  const { testCentreId, date, slot, vehicleClass } = req.body;
  if (!testCentreId || !date || !slot || !vehicleClass) fail("Test centre, date, slot, and vehicle class are required");
  const conflict = db.appointments.some((item) => item.testCentreId === testCentreId && item.date === date && item.slot === slot);
  if (conflict) fail("This slot is already booked", 409);
  const appointment = {
    id: `apt-${ids.appointment++}`,
    applicationId: "app-dl-001",
    testCentreId,
    date,
    time: slot,
    slot,
    vehicleClass,
    status: "booked"
  };
  db.appointments.unshift(appointment);
  setJourney("processing");
  addNotification("Driving test booked", `Your ${vehicleClass} test is booked for ${date} at ${slot}.`);
  res.status(201).json(ok(appointment));
});
app.delete("/api/appointments/:id", (req, res) => {
  db.appointments = db.appointments.filter((item) => item.id !== req.params.id);
  res.json(ok({ deleted: true }));
});

app.post("/api/tests/:appointmentId/result", (req, res) => {
  const appointment = db.appointments.find((item) => item.id === req.params.appointmentId);
  if (!appointment) fail("Appointment not found", 404);
  const result = req.body.result || "passed";
  appointment.status = result;
  const application = db.applications[0];
  if (result === "passed") {
    application.status = "processing";
    application.currentStage = "processing";
    db.licences.dl = issuedLicence();
    setJourney("licence");
    addNotification("Driving test passed", "Your application moved to processing and your digital DL is ready for demo.");
  } else {
    application.status = "retest-required";
    application.currentStage = "test-booking";
    setJourney("test-booking");
    addNotification("Retest required", "Book another driving test slot when ready.");
  }
  res.json(ok({ appointment, application, licence: db.licences.dl }));
});

app.get("/api/notifications", (_req, res) => res.json(ok(db.notifications)));
app.patch("/api/notifications/read-all", (_req, res) => {
  db.notifications.forEach((item) => (item.read = true));
  res.json(ok(db.notifications));
});
app.patch("/api/notifications/:id/read", (req, res) => {
  const notification = db.notifications.find((item) => item.id === req.params.id);
  if (!notification) fail("Notification not found", 404);
  notification.read = true;
  res.json(ok(notification));
});

app.post("/api/ai/chat", (req, res) => {
  const message = String(req.body.message || "").toLowerCase();
  const current = db.journey.steps.find((step) => step.status === "current") || db.journey.steps.at(-1);
  let answer = `Your current stage is ${current.label}. `;
  const actions = [];

  if (message.includes("document") || message.includes("proof")) {
    answer = "For your Driving Licence application in Delhi (DL-01), your Aadhaar card, address proof, and Form 3 Learner Licence are verified. No further document uploads are currently required.";
    actions.push({ label: "Open Document Center", route: "/documents" });
  } else if (message.includes("book") || message.includes("slot") || message.includes("test")) {
    answer = "Your documents and fee payment are complete. You are eligible to select your automated test track and driving skill test slot.";
    actions.push({ label: "Book Driving Test Slot", route: "/appointments" });
  } else if (message.includes("bring") || message.includes("rto") || message.includes("visit") || message.includes("prepare")) {
    answer = "For your RTO visit, please carry: (1) Printed Appointment Confirmation Slip, (2) Original Aadhaar Card / ID Proof, (3) Printed Learner Licence Form 3, (4) Fee Payment Receipt (TXN-882194), and (5) Vehicle with valid RC, Insurance, PUC & 'L' plates.";
    actions.push({ label: "View Appointment Pass", route: "/appointments" });
  } else if (message.includes("pay") || message.includes("fee") || message.includes("receipt")) {
    answer = "Your DL application fee (₹200) was successfully paid under Transaction ID TXN-882194. You can view or download the receipt.";
    actions.push({ label: "View Payment Receipt", route: "/payments" });
  } else if (message.includes("renew") || message.includes("duplicate") || message.includes("address")) {
    answer = "Citizen licence services (Renewal, Duplicate Licence, Address Update) can be accessed directly online through Indian Drives.";
    actions.push({ label: "Licence Services Hub", route: "/licence-services" });
  } else if (message.includes("next") || message.includes("step") || message.includes("what")) {
    answer = "Your Learner Licence is active and verified. The next step is to attend your scheduled driving test at the Burari Automated Track or continue your DL application.";
    actions.push({ label: "View Appointment", route: "/appointments" });
  } else {
    answer += "I can help with driving test booking, document verification, payment receipts, RTO visit preparation, or licence renewal.";
    actions.push({ label: "Application Status", route: "/journey" });
  }

  res.json(ok({
    answer,
    sources: knowledge.map((item) => ({ name: item.source, url: item.sourceUrl })),
    actions
  }));
});

app.get("/api/help", (_req, res) => res.json(ok(knowledge)));

app.use((req, _res, next) => next(Object.assign(new Error(`Route not found: ${req.method} ${req.path}`), { status: 404 })));
app.use((error, _req, res, _next) => {
  res.status(error.status || 500).json({ success: false, message: error.message || "Something went wrong" });
});

function issuedLicence() {
  return {
    number: "JH26/DL/654321",
    name: "Ayush Kumar",
    dob: "2004-05-12",
    vehicleClass: "LMV",
    issueDate: "2026-08-26",
    expiryDate: "2046-08-25",
    status: "active",
    rto: "Jamshedpur RTO"
  };
}

app.listen(port, () => console.log(`Indian Drives API listening on ${port}`));
