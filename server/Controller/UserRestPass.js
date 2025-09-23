const bcrypt =require ('bcrypt');
const nodemailer =require ('nodemailer');
const User= require ("../model/UserModel.js")
const jwt = require("jsonwebtoken")

// Define the route for sending a password reset link
const forgotPassword = async (req, res) => {
    // Find the user with the provided email address
    User.findOne({ where: { userEmail: req.body.userEmail } }).then((user) => {
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Generate a reset token and expiry date
        const resetToken = jwt.sign({ userUid: user.userUid }, 'secret', {
            expiresIn: '10m',
        });
        const resetTokenExpiry = Date.now() + 10 * 60 * 1000;

        // Update the user with the reset token and expiry date
        user
            .update({
                resetPasswordToken: resetToken,
                resetPasswordExpires: resetTokenExpiry,
            })
            .then(() => {
                // Send the password reset email
                const transporter = nodemailer.createTransport({
                    host: "webmail.orange-sonatel.com",
                    port: 25,
                    tls: {
                        rejectUnauthorized: false
                    },
                });
                const mailOptions = {
                    from: 'digitalFactoryOSL@orange-sonatel.com',
                    to: user.userEmail,
                    subject: 'Password Reset',
                    text: 'You are receiving this email because you (or someone else) have requested for the reset of this account password\n\n'
                    + 'Please click on the following link below, or paste this into your browser to complete the process within five (5) Minutes of receiving it:\n\n'
                    + `http://172.25.160.235:2502/reset-password/${resetToken}\n\n`
                    + 'If you did not request for this, please ignore this email and your password will remain unchanged.\n',
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to send email' });
                        
                    }
                    res.json({ message: 'Password reset email sent' });
                });
            });
    });
}


const resetPasswordToken = async (req, res) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{12,}$/;
    try {
        const { token } = req.params;
        const { userPassword, confPassword } = req.body;

        // Password validation
        if (!passwordRegex.test(userPassword)) {
            return res.status(400).json({
                message: "Password must contain at least 12 characters, including uppercase and lowercase letters, numbers, and symbols",
            });
        }

        if (userPassword !== confPassword) {
            return res.status(400).json({ message: "Password and Confirm Password do not match" });
        }

        // Verify the token
        jwt.verify(token, 'secret', async (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Invalid or expired reset token. Please request a new link.' });
            }

            // Find the user with the matching reset token
            const user = await User.findOne({ where: { resetPasswordToken: token } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the reset token has expired
            if (user.resetPasswordExpires < Date.now()) {
                return res.status(401).json({ message: 'Reset token has expired' });
            }

            // Check if the new password is the same as the old password
            const isSamePassword = await bcrypt.compare(userPassword, user.userPassword);
            if (isSamePassword) {
                return res.status(400).json({ message: 'New password cannot be the same as the old password' });
            }

            // Hash the new password
            const hashedPass = await bcrypt.hash(userPassword, 10);

            // Update the user with the new password and clear the reset token
            user.userPassword = hashedPass;
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;

            await user.save();

            res.json({ message: 'Password reset successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// const resetPassword = async (req, res) => {
//     try {
//         const { userEmail, userPassword, confPassword } = req.body;
//         const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{12,}$/;

//         if (!passwordRegex.test(userPassword)) {
//             return res.status(400).json({
//                 message: "Password must contain at least 12 characters, including uppercase and lowercase letters, numbers, and symbols",
//             });
//         }

//         if (userPassword !== confPassword) {
//             return res.status(400).json({ message: "Password and Confirm Password do not match" });
//         }

//         // Find the user by email
//         const user = await User.findOne({where: {userEmail}});

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Hash the new password and update the user record
//         const hashedPass = await bcrypt.hash(userPassword, 10);
//         user.userPassword = hashedPass;

//         await user.save();

//         res.json({ message: 'Password reset successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

const resetPassword = async (req, res) => {
    try {
        const { defaultPassword, userPassword, confPassword } = req.body;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{12,}$/;

        if (!passwordRegex.test(userPassword)) {
            return res.status(400).json({
                message: "Password must contain at least 12 characters, including uppercase and lowercase letters, numbers, and symbols",
            });
        }

        if (userPassword !== confPassword) {
            return res.status(400).json({ message: "Password and Confirm Password do not match" });
        }

        // Fetch all users (not ideal for large datasets)
        const users = await User.findAll();

        // Find the user with the matching default password
        let user = null;
        for (let i = 0; i < users.length; i++) {
            const isMatch = await bcrypt.compare(defaultPassword, users[i].userPassword);
            if (isMatch) {
                user = users[i];
                break;
            }
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password and update the user record
        const hashedPass = await bcrypt.hash(userPassword, 10);
        user.userPassword = hashedPass;

        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};






module.exports ={
    forgotPassword,
    resetPasswordToken,
    resetPassword

}




