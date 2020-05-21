import fetch from "node-fetch";
import nodemailer from "nodemailer";
import sgTransPort from "nodemailer-sendgrid-transport";

export const secretGenerator = async () => {
  return await fetch("https://random-word-api.herokuapp.com/word?number=2")
    .then((res) => res.json())
    .then((json) => {
      return `${json[0]} ${json[1]}`;
    });
};

const sendMail = (email) => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD,
    },
  };
  const client = nodemailer.createTransport(sgTransPort(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "plus470@gmail.com",
    to: address,
    subject: "Login Secret",
    html: `Hello! Your login secret key is<br/> 
    <strong style="font-size:30;">${secret}</strong><br/>`,
  };
  return sendMail(email);
};
