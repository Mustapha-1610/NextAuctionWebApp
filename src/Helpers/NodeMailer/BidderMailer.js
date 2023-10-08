import nodemailer from "nodemailer";
const user = "mustapha.talbi2002@gmail.com"; // hedhi t7ot feha l email
const pass = "lhxa ryjh kszp sejk";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
//fonction te5ou 3 parametres
export const sendBidderConfirmationEmail = async (
  name,
  email,
  BidderId,
  ActivationCode
) => {
  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  await transport
    .sendMail({
      from: user,
      to: email,
      subject: "TuniBids Account Activation",
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px;">
  <h1>TuniBids Account Activation</h1>
  <img src="https://firebasestorage.googleapis.com/v0/b/tunibids.appspot.com/o/OIG.TIxJyC2EdW2GBKQEO%20(1).jpg?alt=media&token=9d76c959-ea06-4b7a-9df5-2526750040e1&_gl=1*14fxoko*_ga*MTU1NzQ5MzYxMC4xNjk2NjgwMjU2*_ga_CW55HF8NVT*MTY5NjY4MjY0Ni4yLjEuMTY5NjY4MzA4MS4zNS4wLjA." style="max-width: 600px; max-height: 320px;">
  <h3>Welcome to TuniBids! To activate your account, please click the button below.</h3>
  <a href="https://auctionwebapp-liard.vercel.app//Bactivation/${BidderId}/${ActivationCode}" style="background-color: #E14F76; border: 1px solid #007bff; color: white; padding: 10px 20px; text-decoration: none;">Click Here</a>
  <p>Thank you for choosing TuniBids!</p>
</div>`,
    })
    .catch((err) => console.log(err));
};

export const sendSellerConfirmationEmail = (BusinessName, email) => {
  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Welcome to tuniBids - Your Business Account is Activated!",
      html: `
      <div>
      <h1> Business Account Activated </h1>
        <h2> Dear  ${BusinessName} </h2>
        <h3> We are pleased to inform you that your business account with tuniBids has been successfully activated! <br/>

You are now able to post auction listings and start doing business on our platform. We are excited to have you join our community of sellers and we look forward to seeing your listings.<br/>

As a seller on tuniBids, you have the opportunity to reach a wide range of customers and grow your business. We encourage you to take full advantage of this opportunity.</br>

If you need any assistance or have any questions, please do not hesitate to contact our support team. We are here to help you make the most of your tuniBids experience.</br>

Thank you for choosing tuniBids. We wish you all the best in your business endeavors.<br/>

Best Regards,

TuniBids Team</h3>
        <a href="http://localhost:3000/index/"><button>Login</button></a>
        </div>`,
    })
    .catch((err) => console.log(err));
};
