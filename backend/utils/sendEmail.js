import nodeMailer from 'nodemailer'

async function sendEmail(to, subject, text) {
    const transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'raghav.king333@gmail.com',
            pass: 'mmlg nmzz rwgh kfnb'
        }
    });

    const mailOptions = {
        from: 'raghav.king333@gmail.com',
        to: to,
        subject: subject,
        text: text,
    }

    try {
        await transporter.sendMail(mailOptions)
    }
    catch (error) {
        throw(error)
    }
}   

export default sendEmail;