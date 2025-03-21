const nodemailer=require("nodemailer");

const sendEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your app password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email sending failed:", error);
        throw new Error("Email sending failed");
    }
};

module.exports=sendEmail
