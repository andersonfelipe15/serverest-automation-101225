const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // URL principal da aplicação FRONT
    baseUrl: 'https://serverest.dev',

    // URLs separadas como variáveis caso use API e Front híbrido
    env: {
      apiUrl: 'https://serverest.dev',   // API Serverest
      frontUrl: 'https://serverest.dev', // se no futuro o front estiver em outro domínio
    },

    // Arquivo de suporte único para ambos
    supportFile: 'cypress/support/e2e.js',

    // Padrão de testes (API + FRONT)
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // Pastas
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    // Configurações úteis
    video: true,
    chromeWebSecurity: false,

    retries: {
      runMode: 2,
      openMode: 0,
    },

    // Eventos do Node (plugins)
    setupNodeEvents(on, config) {
      return config;
    },
  }
});