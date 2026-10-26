import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "./supabase.js";
import multer from "multer";
import fs from "fs";
import mime from "mime-types";
import groq from "./groq.js";
import resend from "./resend.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
    dest: "uploads/"
});
// Home Route
app.get("/resumes", async (req, res) => {

    try {

        const email = req.query.email;

        const { data, error } = await supabase
            .from("ResumeIQ")
            .select("*")
            .eq("email", email)
            .order("id", { ascending: true });

        if (error) {

            return res.status(500).json({

                success: false,

                error: error.message

            });

        }

        res.json({

            success: true,

            data

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});

// Analyze Resume
app.post("/analyze", upload.single("resume"), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded."
            });
        }

        const imageBuffer = fs.readFileSync(req.file.path);

        const mimeType = mime.lookup(req.file.originalname);

       const completion = await groq.chat.completions.create({
  model: "qwen/qwen3.8-27b",

  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `You are ResumeIQ AI, an expert ATS Resume Reviewer and Technical Recruiter.

The uploaded resume has been converted to text using OCR.
Ignore minor OCR errors and evaluate the actual resume content.

Analyze ONLY the uploaded resume.

Evaluate it based on:
• ATS Compatibility
• Technical Skills
• Projects & Experience
• Resume Formatting
• Education
• Grammar & Professionalism

Give a realistic score. Reward strong projects, internships, measurable achievements, certifications, leadership experience, and modern technologies.

Return your response EXACTLY in the following format.

Resume Score: <score>/100

────────────────────────

Summary
Write ONLY 2-3 short sentences summarizing the resume.

────────────────────────

Strengths
✔ Maximum 4 bullet points.
Each bullet should be one short sentence.

────────────────────────

Needs Improvement
✖ Maximum 4 bullet points.
Each bullet should be one short sentence.

────────────────────────

Top Missing Skills
Mention ONLY the 5 most important missing technical skills.

Example:
Docker, AWS, CI/CD, REST APIs, Kubernetes

────────────────────────

ATS Tips
Give ONLY 5 short actionable suggestions.

Example:
• Add measurable achievements.
• Improve project descriptions.
• Include GitHub links.
• Add relevant certifications.
• Use stronger action verbs.

────────────────────────

Final Feedback
Write ONLY 2-3 professional and motivating sentences.

Rules:
• Never output <think>.
• Never explain your reasoning.
• Never mention how you calculated the score.
• Never write long paragraphs.
• Keep the complete response under 250 words.
• Use simple, professional English.
• Follow the exact format above.
• Do not add extra headings or notes.`
        },
        {
          type: "image_url",
          image_url: {
            url: `data:${mimeType};base64,${imageBuffer.toString("base64")}`
          }
        }
      ]
    }
  ]
});

        fs.unlinkSync(req.file.path);

        let analysis = completion.choices[0].message.content;

// Remove everything between <think> and </think>
analysis = analysis.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
        const match = analysis.match(/Resume Score:\s*(\d+)/i);

        const score = match ? match[1] : "N/A";

        // Send Email
        await resend.emails.send({

            from: "ResumeIQ AI <onboarding@resend.dev>",

            to: "niyatipatil828@gmail.com",

            subject: "🚀 Your ResumeIQ AI Analysis is Ready",

            html: `
<div style="margin:0;padding:40px;background:#eef4ff;font-family:Arial,Helvetica,sans-serif;">

    <div style="max-width:650px;margin:auto;background:#0f172a;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.25);">

        <div style="background:linear-gradient(90deg,#00d4ff,#2563eb);padding:35px;text-align:center;">

            <h1 style="margin:0;color:white;font-size:32px;">
                🚀 ResumeIQ AI
            </h1>

            <p style="margin-top:10px;color:#e0f7ff;font-size:16px;">
                AI Powered Resume Analysis
            </p>

        </div>

        <div style="padding:35px;background:#111827;">

            <h2 style="color:white;margin-top:0;">
                Hello👋
            </h2>

            <p style="color:#d1d5db;font-size:16px;line-height:1.8;">

                Your resume has been successfully analyzed by <strong style="color:#22d3ee;">ResumeIQ AI</strong>.

                Below is your latest AI evaluation.

            </p>

            <div style="background:#0f172a;border:2px solid #22d3ee;border-radius:15px;padding:25px;text-align:center;margin:30px 0;">

                <p style="margin:0;color:#9ca3af;font-size:16px;">
                    Resume Score
                </p>

                <h1 style="margin:15px 0;font-size:60px;color:#22d3ee;">
                    ${score}
                </h1>

                <p style="margin:0;color:#9ca3af;">
                    out of 100
                </p>

            </div>

            <h3 style="color:#22d3ee;margin-bottom:15px;">
                📋 AI Resume Analysis
            </h3>

            <div style="
                background:#1f2937;
                color:#e5e7eb;
                padding:20px;
                border-radius:12px;
                white-space:pre-wrap;
                line-height:1.7;
                font-size:15px;
            ">
${analysis}
            </div>

            <div style="
                margin-top:35px;
                background:#082f49;
                border-left:5px solid #22d3ee;
                padding:18px;
                border-radius:10px;
            ">

                <h3 style="margin-top:0;color:#67e8f9;">
                    💡 Career Tip
                </h3>

                <p style="margin:0;color:#dbeafe;line-height:1.8;">
                    Keep updating your resume with recent projects,
                    measurable achievements, certifications, and
                    in-demand technical skills to improve your ATS score
                    and increase your chances of getting shortlisted.
                </p>

            </div>

            <div style="text-align:center;margin-top:40px;">

                <a href="https://github.com/"
                   style="
                   display:inline-block;
                   background:#06b6d4;
                   color:white;
                   text-decoration:none;
                   padding:14px 28px;
                   border-radius:8px;
                   font-weight:bold;
                   font-size:16px;
                ">
                    View Project
                </a>

            </div>

        </div>

        <div style="background:#020617;padding:22px;text-align:center;">

            <p style="margin:0;color:#94a3b8;font-size:14px;">
                Thank you for using
                <strong style="color:#22d3ee;">ResumeIQ AI</strong>
            </p>

            <p style="margin-top:10px;color:#64748b;font-size:13px;">
                AI Resume Analyzer • Built with React, Express, Supabase, Groq AI & Resend
            </p>

        </div>

    </div>

</div>
`
        });

        res.json({

            success: true,

            analysis

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});

// Save Resume Score
app.post("/saveResume", async (req, res) => {

    const { username, email, score } = req.body;

    const { error } = await supabase
        .from("ResumeIQ")
        .insert([
            {
                username,
                email,
                score
            }
        ]);

    if (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

    res.json({

        success: true

    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});