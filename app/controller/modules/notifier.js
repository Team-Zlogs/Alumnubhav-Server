const nodemailer = require('nodemailer');

// function successfulAdminRegistration(recipient) {
//     let subject = "Successful registration"
//     let message = "congratulations!!! Now you have successfully registered to our website. Visit the website to setup your mess!!!"
//     main(recipient, subject, message);
// }

function successfulUserRegistration(recipient) {
    let subject = "Successful registration"
    let message = "congratulations!!! Now you have successfully registered to our website. Visit the website to checkout other resources!!!"
    main(recipient, subject, message);
}

function requestOtp(object, recipient) {
    let subject = "Team Zlogs : Verify email-OTP"
    let message = 'Hello User! <br><br>' + "Your one time OTP is " + object.otp + ". This Code is active only for next 10 mins. Please do no share this code with anyone." + '<br><br>Regards ,<br> Team Zlogs'
    main(recipient, subject, message)
}

function successfulPasswordReset(recipient) {
    let subject = "Password reset successful";
    let message = "Dear user, " + recipient + " your password is successfully reset. Try logging in with new password"+'<br><br>Regards ,<br> Team Zlogs';
    main(recipient, subject, message);
}

function broadCast(recipients, subject, message) {
    main(recipients, subject, message)
}

function test() {
    let recipient = "abc@gmail.com"
    let subject = "smtp test 1"
    let message = "smtp works"
    main(recipient, subject, message)
}

async function main(recipients, subject, message) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.APPLICATION_EMAIL,
            pass: process.env.APPLICATION_PASSWORD
        }
    });

    const email_option = {
        from: process.env.APPLICATION_EMAIL,
        to: recipients,
        subject: subject,
        html: message,
        text: message,
    }

    transporter.sendMail(email_option, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

module.exports = {
    successfulUserRegistration,
    // successfulAdminRegistration,
    successfulPasswordReset,
    requestOtp,
    broadCast,
    test
}