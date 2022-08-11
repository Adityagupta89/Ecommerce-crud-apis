const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const mail = async (req, res) => {
  let newpassword = uuidv4();
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send(
        new Error({
          msg: "No user found with provided email",
          data: "",
          status: 400,
        })
      );
  try {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(newpassword, salt);
    user.password = newPassword;

    await user.save();
  } catch (err) {
    res.send({ msg: err.message, status: 400 });
  }
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jmuradnar@intouchtechnology.com",
      pass: "Jiten@321",
    },
  });

  var mailOptions = {
    from: '"Jiten" <jmuradnar@intouchtechnology.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "Welcome!",
    // text:'Hello world',// the name of the template file i.e email.handlebars
    html: `<div>Hi <b> ${user.first_name} ${user.last_name} ,</b></div>
        <div style="margin-top:1rem">Thank You for shopping in E-commerce web-application.</div>
        <div style="margin-top:.7rem;line-height:2.5">The Password for your E-Commerce Account ${user.email} was changed.</div>
        <div style="margin-top:.7rem"> your new password is - ${newpassword}</div>
        <div style="margin-top:.7rem;line-height:2.5">you can login from this password or you can change this password from Profile section.</div>
        `,
  };

  // trigger the sending of the E-mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (info.response)
      res.status(200).send({ msg: "Please check your email", status: 200 });
    if (error) {
      return console.log(error);
    }
  });
};
module.exports.mail = mail;
