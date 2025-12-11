/// <reference types="cypress" />
// Referência para usar a tipagem do Cypress no VSCode e IntelliSense

// Bloco de testes para a API de Carrinhos
describe('Carrinhos API', () => {
    let token;      // Variável para armazenar o token de autenticação
    let idProduto;  // Variável para armazenar o ID do produto criado

    // Executa uma vez antes de todos os testes
    before(() => {
      // Gera um e-mail único para o usuário
      const emailCriado = `anderson_cart_${Date.now()}@serverest.dev`;

      // Cria um novo usuário administrador via API
      cy.request('POST', '/usuarios', {
        nome: 'Anderson Carrinho',
        email: emailCriado,
        password: 'cart123',
        administrador: 'true'
      }).then(() => {
        // Após criar o usuário, realiza login para obter o token JWT
        cy.request('POST', '/login', {
          email: emailCriado,
          password: 'cart123'
        }).then((resLogin) => {
          // Armazena o token retornado no login
          token = resLogin.body.authorization;
          // Define o token no ambiente do Cypress para ser reutilizado
          Cypress.env('token', token);

          // Cria um novo produto para usar nos testes de carrinho
          cy.request({
            method: 'POST',
            url: '/produtos',
            headers: { Authorization: token }, // Usa o token para autenticar a criação do produto
            body: {
              nome: `Produto Carrinho ${Date.now()}`, // Nome único com timestamp
              preco: 200, // Preço do produto
              descricao: 'Produto para carrinho', // Descrição do produto
              quantidade: 5 // Quantidade em estoque
            }
          }).then((resProduto) => {
            // Armazena o ID do produto criado para usar nos testes
            idProduto = resProduto.body._id;
          });
        });
      });
    });

    // Teste: Deve criar um carrinho com sucesso
    it('Deve criar um carrinho com sucesso', () => {
      // Faz uma requisição POST para criar um carrinho com o produto criado
      cy.request({
        method: 'POST',
        url: '/carrinhos',
        headers: { Authorization: Cypress.env('token') }, // Usa o token do ambiente
        body: {
          produtos: [
            {
              idProduto: idProduto, // Usa o ID do produto criado anteriormente
              quantidade: 1 // Adiciona 1 unidade ao carrinho
            }
          ]
        }
      }).then((res) => {
        // Verifica se o status da resposta é 201 (Criado)
        expect(res.status).to.eq(201);
        // Verifica se a mensagem de retorno confirma o cadastro
        expect(res.body.message).to.eq('Cadastro realizado com sucesso');
      });
    });

    // Teste: Deve listar todos os carrinhos existentes
    it('Deve listar carrinhos', () => {
      // Faz uma requisição GET para listar os carrinhos cadastrados
      cy.request({
        method: 'GET',
        url: '/carrinhos',
        headers: { Authorization: Cypress.env('token') } // Token para autenticação
      }).then((res) => {
        // Verifica se o status da resposta é 200 (OK)
        expect(res.status).to.eq(200);
        // Verifica se existe pelo menos 1 carrinho na resposta
        expect(res.body.quantidade).to.be.greaterThan(0);
      });
    });
});
