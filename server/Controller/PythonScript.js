const { exec } = require("child_process");
const nodemailer = require("nodemailer");
const Recipients = require("../model/EmailNotificationModel.js");
const Staff = require("../model/StaffAllocationModel.js");
const Retrive = require("../model/RetrievModel.js");
const User = require("../model/UserModel.js")


const getPythonScript = (req, res) => {
  const pythonScriptPath = "/root/staff_allocation_script/allocationBackup/allocation_script.py";

  console.log(`Executing Python script at path: ${pythonScriptPath}`);

  exec(`python3.8 ${pythonScriptPath}`, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing python script: ${error}`);
      console.error(`Python script error output: ${stderr}`);
      res.status(500).send("Error occurred");
    } else {
      console.log(`Python script output: ${stdout}`);
      res.send("Python script executed successfully");
  
      // Send email notifications to all recipients from the database
      await sendEmailNotifications(req);
    }
  });
};


const getTotalAllocations = async () => {
  try {
    const staffAllocations = await Staff.findAll({
      attributes: ['VOICE', 'DATA', 'SMS'],
    });

    let totalVoiceAllocated = 0;
    let totalDataAllocated = 0;
    let totalSmsAllocated = 0;

    staffAllocations.forEach((allocation) => {
      totalVoiceAllocated += parseFloat(allocation.VOICE) || 0;
      totalDataAllocated += parseFloat(allocation.DATA) || 0;
      totalSmsAllocated += parseFloat(allocation.SMS) || 0;
    });

    return { totalVoiceAllocated, totalDataAllocated, totalSmsAllocated };
  } catch (error) {
    throw new Error(`Error calculating total allocations: ${error.message}`);
  }
};



const sendEmailNotifications = async (req, res) => {
  try {
    // Retrieve email addresses and names from the database
    const recipients = await Recipients.findAll();
    const users = await User.findAll();
    const userMap = new Map();
    for (const user of users) {
      userMap.set(user.id, user);
    }

  
    const { totalVoiceAllocated, totalDataAllocated, totalSmsAllocated } = await getTotalAllocations();
    
    // Create a nodemailer transporter with your email service configuration
    const transporter = nodemailer.createTransport({
      host: 'webmail.orange-sonatel.com',
      port: 25,
      tls: {
        rejectUnauthorized: false,
      },
    });

    var date = new Date();
    const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
    const month1 = formatter.format(new Date());
    const value = date.getFullYear();
    const dateTime = month1 + " " + value
    // Loop through recipients and send individual emails
    for (const recipient of recipients) {
      // Define the email content for each recipient
      const user = userMap.get(recipient.userId);
      console.log(user)
      const mailOptions = {
        from: 'digitalFactoryOSL@orange-sonatel.com',
        to: recipient.recipientEmail,
        subject: 'Staff Allocation',
        html: `<p>Dear ${recipient.RecieverName},</p>
        <p>I hope this email finds you well. We are pleased to provide you with an update on the allocations we've made for our OSL staffs for the month:${dateTime}</p>
        <ul>
        <li><strong>VOICE Allocated:</strong> ${totalVoiceAllocated}</li>
        <li><strong>DATA Allocated:</strong> ${totalDataAllocated} GB</li>
        <li><strong>SMS Allocated:</strong> ${totalSmsAllocated}</li>
        </ul>
        <p>Rest assured, these allocations have been carefully tailored to align with our organizational objectives and operational requirements. If you have any questions or require further information regarding this report, please do not hesitate to get in touch with us. Your feedback and inquiries are highly valued.</p>
        <p>Thank you for your attention, and we eagerly await your feedback.</p>
        
        <p>Best regards,</p>
        
        <p>Staff Allocation <br/>Human Resource Department (HR)<br/>Orange-sl</p>
        `,
      };
      

      // Send the email for each recipient
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${recipient.recipientEmail}: ${info.response}`);
    }
  } catch (error) {
    console.error(`Error sending emails: ${error}`);
  }
};

module.exports = {
  getPythonScript,
};


