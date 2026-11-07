import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { google } from "googleapis";
import { v2 as cloudinary } from "cloudinary";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "https://in-smark.com",
      "https://www.in-smark.com",
      "http://localhost:5173",
    ],
  }),
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function uploadFile(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "smark_resumes",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Failed:", error.message);
    throw new Error("Resume upload failed");
  }
}

app.get("/test", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Backend is working!" });
});

// for converting json file into base64
//$b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes((Resolve-Path ".\google-credentials.json").Path)) 
//Add-Content -Path ".env" -Value "GOOGLE_SERVICE_ACCOUNT_B64=$b64" -Encoding utf8

function getServiceAccount() {
  let creds;
  if (process.env.GOOGLE_SERVICE_ACCOUNT_B64) {
    creds = JSON.parse(
      Buffer.from(
        process.env.GOOGLE_SERVICE_ACCOUNT_B64.trim(),
        "base64",
      ).toString("utf8"),
    );
  } else {
    creds = JSON.parse(fs.readFileSync("./google-credentials.json", "utf8"));
  }
  creds.private_key = creds.private_key.replace(/\\n/g, "\n");
  return creds;
}

async function appendToGoogleSheet(data) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: getServiceAccount(),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const googleSheets = google.sheets({ version: "v4", auth });

    await googleSheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:I",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toLocaleString(),
            data.name,
            data.email,
            data.contact,
            data.city,
            data.qualification,
            data.currentStatus,
            data.areaOfInterest,
            data.resumeUrl || "No Resume",
          ],
        ],
      },
    });
  } catch (error) {
    console.error("Error appending to Google Sheet:", error.message);
    throw error;
  }
}

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

    let resumeUrl = "";
    let attachments = [];

    if (req.files && req.files.resume) {
      const uploadedFile = req.files.resume;

      resumeUrl = await uploadFile(uploadedFile.tempFilePath);

      attachments.push({
        filename: uploadedFile.name,
        path: uploadedFile.tempFilePath,
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
        <p><strong>Resume Link: </strong><a href="${resumeUrl}" target="_blank">View / Download Resume</a></p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_TO_USER,
      to: process.env.EMAIL_TO_USER,
      subject: `New Job Application from ${name}`,
      html: htmlContent,
      attachments: attachments,
    };

    // Execute mail delivery and Google Sheet logging concurrently
    await Promise.all([
      // transporter.sendMail(mailOptions),
      appendToGoogleSheet({
        name,
        email,
        contact,
        city,
        qualification,
        currentStatus,
        areaOfInterest,
        resumeUrl,
      }),
    ]);

    return res
      .status(200)
      .send({ success: true, message: "Application sent successfully!" });
  } catch (error) {
    console.error("Error processing application:", error);
    return res.status(500).send({
      success: false,
      error: error.message || "Failed to send application.",
    });
  }
});

// Local dev fallback (Ignored when running on Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log("Server started on port", PORT);
  });
}

// Export the serverless handler
export default app;
