/// <reference types="cypress" />
// Esta linha adiciona suporte aos tipos do Cypress para autocomplete e verificação de tipo no editor.

describe('Usuários API', () => {
    // Define um bloco de testes relacionado à API de usuários.

    let emailCriado;
    // Declara uma variável para armazenar o e-mail que será usado durante os testes.

    before(() => {
      // Este bloco é executado antes de todos os testes.
      emailCriado = `anderson_user_${Date.now()}@serverest.dev`;
      // Gera um e-mail único com base na data/hora atual para evitar duplicidade nos testes.
    });

    it('Deve cadastrar um novo usuário', () => {
      // Testa o cadastro de um novo usuário.

      cy.request('POST', '/usuarios', {
        // Faz uma requisição POST para o endpoint /usuarios com os dados do usuário.
        nome: 'Anderson Teste Usuário',
        email: emailCriado,
        password: 'senha123',
        administrador: 'true'
      }).then((res) => {
        // Após a resposta, verifica se o status e a mensagem estão corretos.

        expect(res.status).to.eq(201);
        // Verifica se o status HTTP retornado é 201 (Criado com sucesso).

        expect(res.body.message).to.eq('Cadastro realizado com sucesso');
        // Verifica se a mensagem de resposta indica sucesso no cadastro.
      });
    });

    it('Não deve permitir cadastro de email duplicado', () => {
      // Testa a tentativa de cadastro de um usuário com e-mail já existente.

      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: {
          // Usa os mesmos dados do teste anterior.
          nome: 'Anderson Teste Usuário',
          email: emailCriado,
          password: 'senha123',
          administrador: 'true'
        },
        failOnStatusCode: false
        // Impede que o teste falhe automaticamente se o status HTTP não for 2xx.
      }).then((res) => {
        // Após a resposta, verifica se o status e a mensagem indicam erro por e-mail duplicado.

        expect(res.status).to.eq(400);
        // Espera que o status HTTP seja 400 (Bad Request).

        expect(res.body.message).to.eq('Este email já está sendo usado');
        // Espera que a mensagem de erro seja sobre e-mail duplicado.
      });
    });

    it('Deve listar todos os usuários', () => {
      // Testa a listagem de todos os usuários.

      cy.request('GET', '/usuarios').then((res) => {
        // Faz uma requisição GET para o endpoint /usuarios.

        expect(res.status).to.eq(200);
        // Verifica se a resposta tem status HTTP 200 (OK).

        expect(res.body.quantidade).to.be.greaterThan(0);
        // Verifica se a quantidade de usuários retornados é maior que zero.
      });
    });
});
