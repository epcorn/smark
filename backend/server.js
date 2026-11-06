import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import fileUpload from "express-fileupload";
import serverless from "serverless-http";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/' // Use Vercel's temporary directory for file uploads
}));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test route to verify backend is working
app.get("/test", (req, res) => {
  return res.status(200).json({ success: true, message: "Backend is working!" });
});

app.post("/send-application", async (req, res) => {
  try {
    let {
      name,
      email,
      contact,
      city,
      qualification,
      currentStatus,
      currentStatusCustom,
      areaOfInterest,
      areaOfInterestCustom,
    } = req.body;

    if (currentStatus === "other") currentStatus = currentStatusCustom;
    if (areaOfInterest === "other") areaOfInterest = areaOfInterestCustom;

    let attachments = [];
    if (req.files && req.files.resume) {
      const uploadedFile = req.files.resume;
      attachments.push({
        filename: uploadedFile.name,
        path: uploadedFile.tempFilePath, // Handle file via temp path for serverless compatibility
      });
    }

    const htmlContent = `
      <div>
        <h2>New Job Application Received</h2>
        <p><strong>Applier Name: </strong><span>${name}</span></p>
        <p><strong>Email: </strong><span>${email}</span></p>
        <p><strong>ContactNo: </strong><span>${contact}</span></p>
        <p><strong>City: </strong><span>${city}</span></p>
        <p><strong>Qualification: </strong><span>${qualification}</span></p>
        <p><strong>Status: </strong><span>${currentStatus}</span></p>
        <p><strong>Area Of Interest: </strong><span>${areaOfInterest}</span></p>
      </div>
    `;

    const mailOptions = {
      from: process.env.NO_REPLY || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO_USER,
      subject: `New Job Application from ${name}`,
      html: htmlContent,
      attachments: attachments,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).send({ success: true, message: "Application sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).send({ success: false, error: error.message || "Failed to send application." });
  }
});

// Local fallback
if (process.env.NODE_ENV !== "production") {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log("Server started on port", PORT);
  });
}

export default serverless(app);