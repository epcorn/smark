import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import fileUpload from "express-fileupload";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-application", async (req, res) => {
  console.log(req.body);
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
        content: uploadedFile.data,
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
      from: process.env.NO_REPLY,
      to: process.env.EMAIL_TO_USER,
      subject: `New Job Application from ${name}`,
      html: htmlContent,
      attachments: attachments,
    };

    await transporter.sendMail(mailOptions);
    // await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .send({ success: true, message: "Application sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .send({ success: false, error: "Failed to send application." });
  }
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
