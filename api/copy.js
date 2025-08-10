const { google } = require('googleapis');

module.exports = async (req, res) => {
  try {
    const { driveUrl, tokens } = req.body;

    const fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || driveUrl.match(/folders\/([a-zA-Z0-9_-]+)/);
    const fileId = fileIdMatch ? fileIdMatch[1] : null;

    if (!fileId) return res.status(400).json({ error: 'Invalid Google Drive URL' });

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials(tokens);

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    const copyResponse = await drive.files.copy({
      fileId: fileId,
      requestBody: { name: 'Copied Course' },
    });

    res.json({ success: true, copiedFile: copyResponse.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
