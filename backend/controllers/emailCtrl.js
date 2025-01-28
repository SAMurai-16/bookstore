const nodemailer = require("nodemailer")
const asynchandler = require("express-async-handler")

const sendEmail  = asynchandler(async(data,req,res)=>{

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "samyakchoudhary200516@gmail.com",
          pass: "tlhm modd nnwq tupt",
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"hey" <maddison53@ethereal.email>', // sender address
          to: data.to , // list of receivers
          subject: data.subject, // Subject line
          text: data.text, // plain text body
          html: data.htm, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }
      
      main().catch(console.error);


})



module.exports = {sendEmail}