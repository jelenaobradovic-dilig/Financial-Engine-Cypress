/// <reference types="Cypress" />

const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
    defaultCommandTimeout: 15000,
    env: {baseUrl:"http://192.168.88.105:55755/#/sign-in"
    }
  },
});
