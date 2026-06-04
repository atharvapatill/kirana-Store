import nodemailer from 'nodemailer';

const sendMail = async (receiver,amount) => {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
      tls: { rejectUnauthorized: false }

});
    const mail = {
    from: `${process.env.USER_MAIL}`,
    to: receiver,
    subject: "Kirana Store Credit Reminder",
    text: `Reminder to Pay ${amount}`,
    }

    console.log("Before transport",mail);
    console.log(process.env.GOOGLE_APP_PASSWORD);

    await transporter.sendMail(mail,(error,info)=>{
      if(error){
        console.log('Error:', error);
      }else{
        console.log('Email sent: ', info.response);
      }
    })
}


export {sendMail}