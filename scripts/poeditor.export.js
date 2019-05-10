const request = require("request");
const fs = require("fs");
const POEditorSettings = require("./poeditor.settings.js");

const formData = {
  api_token: POEditorSettings.apiToken,
  id: POEditorSettings.proyectId,
  type: "po"
};

const downloadPOFiles = (url, language) => {
  request
    .get(url)
    .on("error", function(err) {
      console.error(err);
    })
    .pipe(fs.createWriteStream("./translations/" + language + ".po"));
};

const exportProject = function(data) {
  JSON.parse(data).result.languages.forEach(lang => {
    formData.language = lang.code;
    request.post(
      { url: "https://api.poeditor.com/v2/projects/export", formData: formData },
      (err, _, body) => {
        if (err) {
          return console.error("upload failed:", err);
        }
        downloadPOFiles(JSON.parse(body).result.url, lang.code);
      }
    );
  });
};

const getLanguages = function() {
  request.post(
    { url: "https://api.poeditor.com/v2/languages/list", formData: formData },
    (err, _, body) => {
      if (err) {
        return console.error("upload failed:", err);
      }
      exportProject(body);
    }
  );
};

getLanguages();
