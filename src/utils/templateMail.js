// Set Template Content
// Set Header
const mailHeader = `<h2 style="color: #018c4c; font-size: 30px; border-bottom: solid 2px #ccc;padding-bottom: 10px">
      Template - Learn English Application<br />
    </h2>`;
// Set Footer
const mailFooter = `<h4 style="color: red">
        Warming: Do not give the code to any one, it may lead to lose your account.<br />
        The code is only valid for <i>10 minutes </i> when you receive this mail.
    </h4>
    <h1>Best Regard</h1>`;

// Content to reset Password
const resetPasswordMailContent = (code) => `<div>
    ${mailHeader}
    <h3 style="padding: 10px 0; margin-bottom: 10px;">
        Dear you,<br />
        Template has received your request about resetting the password.<br />
        Don't worry about that, Please enter this code to set new password:
    </h3>
    <h2 style="background: #eee;padding: 10px;">
      <i><b>${code}</b></i>
    </h2>
    ${mailFooter}
  </div>`;

module.exports = {
  resetPasswordMailContent,
};
