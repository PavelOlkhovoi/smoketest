const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    setupNodeEvents(on, config) {
      // Register the 'logToFile' task
      on("task", {
        logToFile(message) {
          // Perform any task-related logic here
          console.log(message);
          return null; // You can return a value if needed
        },
      });
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
