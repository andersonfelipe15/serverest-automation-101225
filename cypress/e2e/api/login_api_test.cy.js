/// <reference types="cypress" />
// Referência para utilizar a tipagem do Cypress, útil para autocompletar e validação no editor

// Bloco de testes para a API de Login
describe('Login API', () => {
    // Gera um e-mail único usando timestamp para evitar duplicidade
    let emailLogin = `anderson_login_${Date.now()}@serverest.dev`;
    // Define a senha que será usada para login
    let senhaLogin = 'senha123';
  
    // Executa antes de todos os testes
    before(() => {
      // Cria um novo usuário para ser utilizado nos testes de login
      cy.request('POST', '/usuarios', {
        nome: 'Anderson Login',
        email: emailLogin,
        password: senhaLogin,
        administrador: 'true' // Define o usuário como administrador
      }).then((res) => {
        // Verifica se o usuário foi criado com sucesso (status 201)
        expect(res.status).to.eq(201);
      });
    });
  
    // Teste: Login bem-sucedido com credenciais válidas
    it('Deve fazer login com sucesso', () => {
      // Envia uma requisição POST para o endpoint de login com credenciais válidas
      cy.request('POST', '/login', {
        email: emailLogin,
        password: senhaLogin
      }).then((res) => {
        // Verifica se o status da resposta é 200 (OK)
        expect(res.status).to.eq(200);
        // Verifica se a mensagem indica sucesso no login
        expect(res.body.message).to.eq('Login realizado com sucesso');
        // Verifica se o campo de autorização não está vazio (token gerado)
        expect(res.body.authorization).to.not.be.empty;
      });
    });
  
    // Teste: Tentativa de login com senha inválida
    it('Não deve fazer login com senha inválida', () => {
      // Envia uma requisição POST para login com senha incorreta
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          email: emailLogin,
          password: 'senhaerrada' // Senha incorreta
        },
        // Não falha o teste automaticamente em status de erro
        failOnStatusCode: false
      }).then((res) => {
        // Verifica se a resposta retornou status 401 (Não autorizado)
        expect(res.status).to.eq(401);
        // Verifica se a mensagem retornada informa erro nas credenciais
        expect(res.body.message).to.eq('Email e/ou senha inválidos');
      });
    });
  
    // Teste: Tentativa de login com e-mail inexistente
    it('Não deve fazer login com email inexistente', () => {
      // Envia uma requisição POST para login com e-mail que não foi cadastrado
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          email: 'emailinexistente@serverest.dev', // E-mail inválido
          password: 'senha123'
        },
        // Não falha o teste automaticamente em status de erro
        failOnStatusCode: false
      }).then((res) => {
        // Verifica se a resposta retornou status 401 (Não autorizado)
        expect(res.status).to.eq(401);
        // Verifica se a mensagem retornada informa erro nas credenciais
        expect(res.body.message).to.eq('Email e/ou senha inválidos');
      });
    });
});
