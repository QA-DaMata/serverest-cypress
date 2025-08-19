const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "js4fa5",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
    baseUrl: 'http://localhost:3000/',
    specPattern: 'cypress/integration/**/*.{js,jsx,ts,tsx}',
    video: true,

  },
});
