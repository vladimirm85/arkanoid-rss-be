import * as nodemailer from 'nodemailer';

const { NODEMAILER_HOST, NODEMAILER_USER, NODEMAILER_PASS } = process.env;

const options = {
  host: NODEMAILER_HOST,
  port: 25,
  secure: false,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transport = nodemailer.createTransport(options);

export const mailSend = (path: string, to: string, subject: string, text: string) =>
  transport
    .sendMail({
      from: NODEMAILER_USER,
      to,
      subject,
      html: `${text} <a href=${path}>Link</a>`,
    })
    .then(() => {
      return true;
    })
    .catch((e: unknown) => {
      if (!(e instanceof Error)) throw e;
      return false;
    });
