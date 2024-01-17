const fs = require("fs");

module.exports = (on, config) => {
  on("task", {
    logToFile: ({ fileName, logs }) => {
      const logContent = logs
        .map((log) => `${log.name} - ${log.message}`)
        .join("\n");
      fs.writeFileSync(fileName, logContent);
      return null;
    },
  });
};
