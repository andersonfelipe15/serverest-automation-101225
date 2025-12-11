// Define a classe CadastroPage para representar a página de cadastro
class CadastroPage {
  
  // Cria um objeto chamado elements que contém métodos para localizar os elementos da página
  elements = {
    // Localiza o campo de input de nome usando o atributo data-testid
    nomeInput: () => cy.get('[data-testid="nome"]'),
    
    // Localiza o campo de input de e-mail usando o atributo data-testid
    emailInput: () => cy.get('[data-testid="email"]'),
    
    // Localiza o campo de input de senha pelo ID
    passwordInput: () => cy.get('#password'),
    
    // Localiza o botão de cadastro usando o atributo data-testid
    cadastrarButton: () => cy.get('[data-testid="cadastrar"]'),
    
    // Localiza a mensagem de sucesso de cadastro (link de alerta)
    successMessage: () => cy.get('a.alert-link')
  }

  // Método para preencher o formulário de cadastro
  preencherCadastro(nome, email, senha) {
    // Digita o nome informado no campo de nome
    this.elements.nomeInput().type(nome);
    
    // Digita o e-mail informado no campo de e-mail
    this.elements.emailInput().type(email);
    
    // Digita a senha informada no campo de senha
    this.elements.passwordInput().type(senha);
    
    // Clica no botão de cadastrar
    this.elements.cadastrarButton().click();
  }

  // Método para validar se o cadastro foi realizado com sucesso
  validarCadastroSucesso() {
    // Verifica se a mensagem de sucesso está visível e contém o texto esperado
    this.elements.successMessage().should('be.visible').and('contain.text', 'Cadastro realizado com sucesso');
  }
}

// Exporta uma instância da classe CadastroPage para ser usada nos testes
export default new CadastroPage();