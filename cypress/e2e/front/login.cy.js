// Importa as page objects e utilitários
import LoginPage from '../../support/pageObjects/LoginPage';
import CadastroPage from '../../support/pageObjects/CadastroPage';
import HomePage from '../../support/pageObjects/HomePage';
import GeradorUsuario from '../../support/GeradorUsuario';

// Inicia a suíte de testes para a automação FrontEnd do ServeRest
describe('Automação FrontEnd ServeRest', () => {
  // Declara variáveis para guardar os dados do usuário gerado
  let nome;
  let email;
  let senha;

  // Antes de cada teste, acessa a página de login
  beforeEach(() => {
    LoginPage.visit();
  });

  // Teste: Login com credenciais inválidas
  it('Não deve conseguir logar com credenciais inválidas', () => {
    LoginPage.loginActions.fillEmail('automacao@teste.com'); // Preenche email inválido
    LoginPage.loginActions.fillPassword('qualidade@123');    // Preenche senha inválida
    LoginPage.loginActions.clickLogin();                     // Clica no botão de login
    LoginPage.alertActions.assertAlertContains('Email e/ou senha inválidos'); // Valida mensagem de erro
  });

  // Teste: Login sem preencher campos obrigatórios
  it('Não deve conseguir logar sem preencher os campos obrigatórios', () => {
    LoginPage.loginActions.clickLogin(); // Tenta logar sem preencher nada
    LoginPage.elements.alerts.alertMessage().should('have.length', 2); // Verifica que há 2 alertas
    LoginPage.alertActions.assertAlertContains('Password é obrigatório'); // Valida alerta da senha
    LoginPage.alertActions.assertAlertContains('Email é obrigatório');    // Valida alerta do email
  });

  // Teste: Cadastro de um novo usuário
  it('Realiza cadastro de novo usuário', () => {
    LoginPage.registerActions.clickRegister(); // Clica para ir até a tela de registro

    const usuario = GeradorUsuario.gerarUsuario(); // Gera um usuário aleatório
    nome = usuario.nome;   // Armazena o nome
    email = usuario.email; // Armazena o email
    senha = usuario.senha; // Armazena a senha

    CadastroPage.preencherCadastro(nome, email, senha); // Preenche formulário de cadastro
    CadastroPage.validarCadastroSucesso();              // Valida sucesso no cadastro
  });

  // Teste: Pesquisa de produto após login
  it('Realiza pesquisa de produto', () => {
    LoginPage.loginActions.fillEmail(email); // Usa o email do usuário cadastrado
    LoginPage.loginActions.fillPassword(senha); // Usa a senha do usuário cadastrado
    LoginPage.loginActions.clickLogin(); // Faz login

    cy.url().should('include', '/home'); // Confirma que foi redirecionado para a Home

    HomePage.pesquisarProduto('Camiseta'); // Pesquisa o produto
  });

  // Teste: Login sem preencher o campo senha
  it('Não deve conseguir logar sem preencher o campo senha', () => {
    LoginPage.loginActions.fillEmail('automacao@teste.com'); // Preenche apenas o email
    LoginPage.loginActions.clickLogin();                     // Clica no botão de login
    LoginPage.alertActions.assertAlertContains('Password é obrigatório'); // Valida alerta de senha obrigatória
  });

  // Teste: Login sem preencher o campo email
  it('Não deve conseguir logar sem preencher o campo usuário', () => {
    LoginPage.loginActions.fillPassword('qualidade@123'); // Preenche apenas a senha
    LoginPage.loginActions.clickLogin();                  // Clica no botão de login
    LoginPage.alertActions.assertAlertContains('Email é obrigatório'); // Valida alerta de email obrigatório
  });
});
