// Definindo a classe LoginPage com responsabilidades bem separadas
class LoginPage {

  // Agrupamento de elementos de forma clara
  elements = {
    // Campos de entrada
    inputs: {
      email: () => cy.get('[data-testid="email"]'),
      password: () => cy.get('[data-testid="senha"], [name="password"]')
    },

    // Botões e links
    buttons: {
      login: () => cy.get('[data-testid="entrar"], button[type="submit"]'),
      registerLink: () => cy.contains('Cadastre-se')
    },

    // Elementos de alerta
    alerts: {
      alertMessage: () => cy.get('div.alert')
    }
  }

  // Ações relacionadas ao login
  loginActions = {
    // Preenche o campo de email
    fillEmail: (email) => {
      this.elements.inputs.email().type(email); // Preenche o campo de email
    },

    // Preenche o campo de senha
    fillPassword: (password) => {
      this.elements.inputs.password().type(password); // Preenche o campo de senha
    },

    // Clica no botão de login
    clickLogin: () => {
      this.elements.buttons.login().click(); // Executa o clique no botão de login
    }
  }

  // Ações relacionadas ao link de cadastro
  registerActions = {
    // Clica no link de cadastro
    clickRegister: () => {
      this.elements.buttons.registerLink().click(); // Executa o clique no link de cadastro
    }
  }

  // Ações relacionadas a alertas
  alertActions = {
    // Verifica se o alerta contém uma mensagem específica
    assertAlertContains: (message) => {
      this.elements.alerts.alertMessage()
        .should('be.visible')
        .and('contain.text', message); // Verifica a mensagem no alerta
    }
  }

  // Método para visitar a página de login
  visit() {
    cy.visit('https://front.serverest.dev/login'); // Comando para abrir a URL de login
  }

  // Método para realizar o login com os dados fornecidos
  login(email, password) {
    this.loginActions.fillEmail(email); // Preenche o email
    this.loginActions.fillPassword(password); // Preenche a senha
    this.loginActions.clickLogin(); // Clica no botão de login
  }

  // Método para realizar o cadastro (caso necessário)
  register() {
    this.registerActions.clickRegister(); // Clica no link de cadastro
  }

  // Método para validar o alerta
  assertAlert(message) {
    this.alertActions.assertAlertContains(message); // Verifica se o alerta contém a mensagem esperada
  }
}

// Exportando uma instância da classe LoginPage para ser reutilizada em outros testes
export default new LoginPage();
