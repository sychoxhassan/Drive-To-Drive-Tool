const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

module.exports = async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Save tokens somewhere (in real app use DB or secure cookie)

    res.status(200).send(`
      <h1>Login Successful</h1>
      <p>You can now close this tab and return to the app.</p>
    `);
  } catch (error) {
    res.status(500).send('Error retrieving access token');
  }
};
