import nodemailer from 'nodemailer';


export const sendMail = async({applicantName,applicantEmail},{companyName,jobLocation,designation})=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: 'codingninjas2k16@gmail.com',
            pass: 'slwvvlczduktvhdj',
        }
    });
    const mailOptions = {
        from: 'codingninjas2k16@gmail.com',
        to: applicantEmail,
        subject: 'Application recieved ',
        text: `hi ${applicantName} you applied for ${companyName} at ${jobLocation} for ${designation} role.`,
        
    };
    try{
        const result = await transporter.sendMail(mailOptions);
        console.log("Email send successfully");
    }catch(err){
        console.log('Email send failed with error:'+ err);
    }
}

