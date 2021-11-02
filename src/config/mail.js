const nodemailer = require('nodemailer');
const { mail } = require('./config');
const logger = require('./logger');

// config SMTP options
const options = {
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: mail.username,
    pass: mail.password,
  },
};

// create transport SMTP
const transport = nodemailer.createTransport(options);

const sendEmail = async ({ to, subject, htmlContent }) => {
  // Set mail options: from, to, subject, etc
  const mailOptions = {
    // sender
    from: 'Template - <no-reply@accounts.Template.herokuapp.com>',
    // Receiver
    to,
    // Subject
    subject,
    // Content
    html: htmlContent,
  };

  // Send Email
  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        logger.error('Send email is fail');
        return reject(err);
      }
      logger.info('Send email is successful');
      resolve(info);
    });
  });
};

module.exports = sendEmail;
