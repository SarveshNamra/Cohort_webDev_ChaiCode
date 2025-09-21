import Mailgem from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Mailgen',
            link: 'https://mailgen.js/'
        },
    });

    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);
    var emailHtml = mailGenerator.generate(options.mailGenContent);

    // From Nodemailer
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false,
        auth: {
            user: MAILTRAP_SMTP_USER,
            pass: MAILTRAP_SMTP_PASS,
        },
    });

    const mail = {
        from: 'mail.taskmanager@example.com',
        to: options.email,
        subject: options.subject,
        text: emailText, // plain‑text body
        html: emailHtml, // HTML body
    };

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email failed",error)
    }
}

// Factory Functions/method

const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
        body : {
            name: username,
            intro: "Welcome to App! We're very excited to have you on board.",
            action: {
                instructions: "To get started with our App, please click here:",
                button: {
                    color: '#22BC66', // Optional action button color
                    text: "Verify your email",
                    link: verificationUrl,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we\'d love to help.",
        },
    };
}

const forgotPasswordMailGenContent = (username, passeordResetUrl) => {
    return {
        body : {
            name: username,
            intro: "We got the request to reset your password.",
            action: {
                instructions: "To change your password, please click here:",
                button: {
                    color: '#22BC66', // Optional action button color
                    text: "Reset password",
                    link: passeordResetUrl,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we\'d love to help.",
        },
    };
}

// sendMail({
//     email: user.email,
//     subject: "xyz",
//     mailGenContent: emailVerificationMailGenContent(
//         username,
//         `` //url
//     )
// });
