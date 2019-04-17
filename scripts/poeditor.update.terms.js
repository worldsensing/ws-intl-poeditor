const request = require("request");
const fs = require("fs");
const POEditorSettings = require("./poeditor.settings.js");

const formData = {
  api_token: POEditorSettings.apiToken,
  id: POEditorSettings.proyectId,
  updating: "terms",
  file: {
    value: fs.createReadStream("./output/messages.pot"),
    options: {
      filename: "messages.pot"
    }
  }
};

request.post(
  { url: "https://api.poeditor.com/v2/projects/upload", formData: formData },
  (err, _, body) => {
    if (err) {
      return console.error("upload failed:", err);
    }
    console.log("Upload successful! Server responded with:", body);
  }
);
