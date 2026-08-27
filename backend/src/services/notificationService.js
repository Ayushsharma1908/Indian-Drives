import nodemailer from "nodemailer";

// ─────────────────────────────────────────────────────────────
// 1. EMAIL TRANSPORTER CONFIGURATION (GMAIL / SMTP / SES)
// ─────────────────────────────────────────────────────────────
let emailTransporter = null;

function getEmailTransporter() {
  if (emailTransporter) return emailTransporter;

  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (smtpUser && smtpPass) {
    emailTransporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE || "gmail",
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });
  }

  return emailTransporter;
}

export const NotificationService = {
  /**
   * Send Real-Time Email
   */
  async sendEmail({ to, subject, html, text }) {
    const transporter = getEmailTransporter();
    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || "no-reply@indiandrives.gov.in";

    if (!transporter) {
      console.log(`\n📧 [EMAIL SIMULATION]`);
      console.log(`   To: ${to}`);
      console.log(`   Subject: ${subject}`);
      console.log(`   Body: ${text || subject}`);
      return { success: true, simulated: true };
    }

    try {
      const info = await transporter.sendMail({
        from: `"Indian Drives (MoRTH)" <${fromAddress}>`,
        to,
        subject,
        text,
        html
      });
      console.log(`\n✅ [REAL EMAIL SENT] Message ID: ${info.messageId} to ${to}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`\n❌ [EMAIL SEND ERROR] To: ${to} - ${error.message}`);
      return { success: false, error: error.message };
    }
  },

  /**
   * Send Real-Time SMS
   */
  async sendSMS({ to, message }) {
    const fast2smsKey = process.env.FAST2SMS_API_KEY;
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

    // 1. Fast2SMS Provider (India)
    if (fast2smsKey) {
      try {
        const cleanMobile = String(to).replace(/[^0-9]/g, "").slice(-10);
        const res = await fetch("https://www.fast2sms.com/dev/bulkV2", {
          method: "POST",
          headers: {
            authorization: fast2smsKey,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            route: "q",
            message,
            language: "english",
            flash: 0,
            numbers: cleanMobile
          })
        });
        const data = await res.json();
        if (data.return) {
          console.log(`\n📱 [FAST2SMS SENT] To: ${cleanMobile}`);
          return { success: true, provider: "fast2sms" };
        }
      } catch (err) {
        console.error(`\n❌ [FAST2SMS ERROR]`, err.message);
      }
    }

    // 2. Twilio Provider (Global / India)
    if (twilioSid && twilioToken && twilioPhone) {
      try {
        const twilio = (await import("twilio")).default;
        const client = twilio(twilioSid, twilioToken);
        const msg = await client.messages.create({
          body: message,
          from: twilioPhone,
          to
        });
        console.log(`\n📱 [TWILIO SMS SENT] SID: ${msg.sid} to ${to}`);
        return { success: true, sid: msg.sid };
      } catch (err) {
        console.error(`\n❌ [TWILIO SMS ERROR]`, err.message);
      }
    }

    // 3. Fallback Dev Console Simulator
    console.log(`\n📱 [SMS SIMULATION]`);
    console.log(`   To: ${to}`);
    console.log(`   Message: ${message}`);
    return { success: true, simulated: true };
  },

  // ─────────────────────────────────────────────────────────────
  // HIGH-LEVEL CITIZEN WORKFLOW EVENT NOTIFIERS
  // ─────────────────────────────────────────────────────────────

  /**
   * 1. DL / LL Test Slot Booked
   */
  async notifySlotBooking({ user, appointment, centre }) {
    const mobile = user.mobile || "+91 98765 43210";
    const email = user.email || "citizen@indiandrives.gov.in";
    const appNumber = appointment.applicationId || `DL-${new Date().getFullYear()}-009281`;
    const venue = centre?.name || "Automated Driving Test Track";

    const sms = `Namaste ${user.name || "Citizen"}, your Driving Test for ${appointment.vehicleClass || "LMV"} is CONFIRMED on ${appointment.date} at ${appointment.slot || appointment.time} at ${venue}. App ID: ${appNumber}. Please carry original Aadhaar & LL Form 3. - Indian Drives`;

    const html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff;">
        <div style="background: #002542; color: #ffffff; padding: 28px 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px; letter-spacing: -0.5px;">Driving Skill Test Appointment Pass</h2>
          <p style="margin: 6px 0 0 0; opacity: 0.85; font-size: 13px;">Ministry of Road Transport & Highways · Govt. of India</p>
        </div>
        <div style="padding: 28px 24px; color: #1e293b;">
          <p style="font-size: 15px; margin-top: 0;">Dear <strong>${user.name || "Citizen"}</strong>,</p>
          <p style="font-size: 14px; color: #475569; line-height: 1.5;">Your practical driving test appointment has been successfully scheduled. Details of your test slot are below:</p>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Application Number:</td>
                <td style="padding: 6px 0; font-weight: 700; color: #002542; text-align: right;">${appNumber}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Vehicle Class:</td>
                <td style="padding: 6px 0; font-weight: 700; color: #002542; text-align: right;">${appointment.vehicleClass || "LMV (Light Motor Vehicle)"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Appointment Date:</td>
                <td style="padding: 6px 0; font-weight: 700; color: #002542; text-align: right;">${appointment.date}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Reporting Slot:</td>
                <td style="padding: 6px 0; font-weight: 700; color: #002542; text-align: right;">${appointment.slot || appointment.time}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">RTO Test Track:</td>
                <td style="padding: 6px 0; font-weight: 700; color: #002542; text-align: right;">${venue}</td>
              </tr>
            </table>
          </div>

          <h4 style="margin: 20px 0 10px 0; color: #002542; font-size: 14px;">Mandatory Documents Checklist:</h4>
          <ul style="font-size: 13.5px; color: #475569; line-height: 1.6; padding-left: 20px; margin: 0;">
            <li>Original Aadhaar Card / Government Identity Proof</li>
            <li>Learner Licence (Form 3) Printout</li>
            <li>Appointment Confirmation Slip</li>
            <li>Test Vehicle with Valid RC, Insurance, PUC & 'L' Signboards</li>
          </ul>
        </div>
        <div style="background: #f1f5f9; padding: 14px; text-align: center; font-size: 12px; color: #64748b;">
          Indian Drives Portal · Sarathi 4.0 Digital Citizen Integration
        </div>
      </div>
    `;

    return Promise.all([
      this.sendSMS({ to: mobile, message: sms }),
      this.sendEmail({ to: email, subject: `Driving Test Slot Confirmed: ${appointment.date} at ${venue}`, html, text: sms })
    ]);
  },

  /**
   * 2. Application Fee Payment Confirmation
   */
  async notifyPaymentSuccess({ user, payment }) {
    const mobile = user.mobile || "+91 98765 43210";
    const email = user.email || "citizen@indiandrives.gov.in";
    const txnId = payment.transactionId || `TXN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const purpose = payment.purpose || "Driving Licence Application & Test Fee";

    const sms = `Payment Received: ₹${payment.amount}.00 for ${purpose}. Transaction Ref: ${txnId}. Official receipt is available on your Indian Drives dashboard.`;

    const html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff;">
        <div style="background: #002542; color: #ffffff; padding: 26px 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px;">Official Payment Receipt</h2>
          <p style="margin: 4px 0 0 0; opacity: 0.85; font-size: 13px;">Indian Drives · Ministry of Road Transport & Highways</p>
        </div>
        <div style="padding: 24px 24px 28px 24px; color: #1e293b;">
          <p style="font-size: 15px; margin-top: 0;">Dear <strong>${user.name || "Citizen"}</strong>,</p>
          <p style="font-size: 14px; color: #475569; line-height: 1.5;">Thank you for your payment. Your transaction has been successfully confirmed and recorded in the government transport system.</p>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Amount Paid:</td>
                <td style="padding: 6px 0; font-weight: 800; font-size: 19px; color: #166534; text-align: right;">₹${Number(payment.amount).toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Purpose:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #002542; text-align: right;">${purpose}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Transaction ID:</td>
                <td style="padding: 6px 0; font-family: monospace; font-weight: 700; color: #002542; text-align: right;">${txnId}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Payment Status:</td>
                <td style="padding: 6px 0; font-weight: 700; color: #166534; text-align: right;">● Success / Verified</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Payment Date:</td>
                <td style="padding: 6px 0; color: #334155; text-align: right;">${payment.createdAt || new Date().toISOString().slice(0, 10)}</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 13px; color: #64748b; margin: 0; line-height: 1.5;">
            You can view, track, or download your complete official receipt slip at any time directly from the <strong>Payments</strong> section in your Indian Drives account.
          </p>
        </div>
        <div style="background: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b;">
          This is an electronically generated official receipt. No physical signature required.
        </div>
      </div>
    `;

    return Promise.all([
      this.sendSMS({ to: mobile, message: sms }),
      this.sendEmail({ to: email, subject: `Payment Receipt: ₹${payment.amount}.00 — ${purpose} (${txnId})`, html, text: sms })
    ]);
  },

  /**
   * 3. Driving Licence Issued
   */
  async notifyDrivingLicenceIssued({ user, licence }) {
    const mobile = user.mobile || "+91 98765 43210";
    const email = user.email || "citizen@indiandrives.gov.in";

    const sms = `Congratulations ${user.name}! Your Driving Skill Test has PASSED. Digital Driving Licence ${licence.number} is now active and ready on Indian Drives & DigiLocker.`;

    const html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #bbf7d0; border-radius: 16px; overflow: hidden; background: #ffffff;">
        <div style="background: #166534; color: #ffffff; padding: 28px 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">Driving Licence Issued Successfully 🎉</h2>
          <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 13px;">Ministry of Road Transport & Highways</p>
        </div>
        <div style="padding: 24px; color: #1e293b;">
          <p style="font-size: 15px; margin-top: 0;">Dear <strong>${user.name}</strong>,</p>
          <p style="font-size: 14px; color: #475569;">Congratulations! You have passed your practical driving test. Your digital driving smart card licence is officially active.</p>
          
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin: 18px 0;">
            <p style="margin: 4px 0; font-size: 13px; color: #166534; text-transform: uppercase; font-weight: 700;">Licence Number:</p>
            <p style="margin: 0 0 12px 0; font-size: 20px; font-weight: 800; color: #166534; letter-spacing: 0.5px;">${licence.number}</p>
            <p style="margin: 4px 0; font-size: 13.5px; color: #334155;"><strong>Vehicle Class:</strong> ${licence.vehicleClass || "LMV"}</p>
            <p style="margin: 4px 0; font-size: 13.5px; color: #334155;"><strong>Validity:</strong> Up to ${licence.expiryDate || "2046-08-25"}</p>
            <p style="margin: 4px 0; font-size: 13.5px; color: #334155;"><strong>Issuing Authority:</strong> ${licence.rto || "RTO Transport Department"}</p>
          </div>
        </div>
      </div>
    `;

    return Promise.all([
      this.sendSMS({ to: mobile, message: sms }),
      this.sendEmail({ to: email, subject: `Driving Licence Active: ${licence.number}`, html, text: sms })
    ]);
  }
};

