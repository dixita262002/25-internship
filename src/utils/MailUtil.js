//to/from,sub,text
const mailer = require('nodemailer')

const sendingMail = async(to,subject,text) =>{

    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"dixitap016@gmail.com",
            pass:"fiza hokp iklk vfoq"

        }
    })
const mailOptions = {
    from:'dixitap016@gmail.com',
    to: to,
    subject:subject,
   // text:text
   //html:"<h1>"+text+"<h1>"
   //html:"<h1>"+text+"</h1>"
   html:text
}

const mailresponse = await transporter.sendMail(mailOptions);
console.log(mailresponse);
return mailresponse;


}

module.exports = {
    sendingMail
}

//sendingMail("dixita.dixitapatel2002@mail.com","test mail","this is test mail")