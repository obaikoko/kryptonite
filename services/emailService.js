import nodemailer from 'nodemailer';
// import asyncHandler from 'express-async-handler';

const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.GMAILEMAIL,
        pass: process.env.GMAILPASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const mailOptions = {
      from: {
        name: 'Kryptonite',
        address: 'admin@kryptonite.org',
      },
      to: email,
      subject: 'Kryptonite OTP password',
      text: `here is your otp ${otp} which expires in 5 minutes`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    throw new Error('Email could not be sent.');
  }
};

export { sendOtpEmail };
