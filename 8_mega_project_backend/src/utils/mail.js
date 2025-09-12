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
}

// Factory Functions

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
