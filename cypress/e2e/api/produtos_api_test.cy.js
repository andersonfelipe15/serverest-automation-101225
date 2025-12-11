/// <reference types="cypress" />
// Informa ao editor que este arquivo usará as definições de tipos do Cypress para autocomplete e IntelliSense

// Descreve o conjunto de testes da API de Produtos
describe('Produtos API', () => {
    let token; // Variável para armazenar o token de autenticação
    let emailCriado; // Variável para armazenar o e-mail gerado dinamicamente
  
    // Hook que roda antes de todos os testes
    before(() => {
      // Gera um e-mail único com timestamp para evitar conflitos de cadastro
      emailCriado = `anderson_qa_teste_${Date.now()}@serverest.dev`;
  
      // Cria um novo usuário administrador
      cy.request('POST', '/usuarios', {
        nome: 'Anderson QA Teste',
        email: emailCriado,
        password: 'teste123',
        administrador: 'true'
      }).then((res) => {
        // Verifica se o usuário foi criado com sucesso (status 201)
        expect(res.status).to.eq(201);
  
        // Realiza login com o novo usuário para obter o token
        cy.request('POST', '/login', {
          email: emailCriado,
          password: 'teste123'
        }).then((loginRes) => {
          // Verifica se o login foi bem-sucedido
          expect(loginRes.status).to.eq(200);
          // Armazena o token retornado
          token = loginRes.body.authorization;
          // Salva o token no ambiente do Cypress para ser reutilizado nos testes
          Cypress.env('token', token);
        });
      });
    });
  
    // Teste: Deve listar todos os produtos
    it('Deve listar todos os produtos', () => {
      // Envia uma requisição GET para listar os produtos
      cy.request({
        method: 'GET',
        url: '/produtos',
        headers: { Authorization: Cypress.env('token') } // Usa o token salvo
      }).then((res) => {
        // Verifica se a requisição foi bem-sucedida
        expect(res.status).to.eq(200);
        // Verifica se há pelo menos um produto cadastrado
        expect(res.body.quantidade).to.be.greaterThan(0);
      });
    });
  
    // Teste: Deve cadastrar um novo produto
    it('Deve cadastrar um novo produto', () => {
      // Envia uma requisição POST para criar um novo produto
      cy.request({
        method: 'POST',
        url: '/produtos',
        headers: { Authorization: Cypress.env('token') },
        body: {
          nome: `Produto Teste ${Date.now()}`, // Nome único
          preco: 150,
          descricao: 'Produto de teste automatizado',
          quantidade: 50
        }
      }).then((res) => {
        // Verifica se o produto foi criado com sucesso
        expect(res.status).to.eq(201);
        // Verifica se a mensagem retornada confirma o cadastro
        expect(res.body.message).to.eq('Cadastro realizado com sucesso');
      });
    });
  
    // Teste: Não deve permitir cadastro de produto com nome duplicado
    it('Deve não permitir cadastrar produto com nome duplicado', () => {
      const produtoDuplicado = {
        nome: `Produto Duplicado ${Date.now()}`, // Nome base para o produto
        preco: 100,
        descricao: 'Produto para testar duplicidade',
        quantidade: 10
      };
  
      // Primeiro cadastro do produto
      cy.request({
        method: 'POST',
        url: '/produtos',
        headers: { Authorization: Cypress.env('token') },
        body: produtoDuplicado
      }).then((res) => {
        // Verifica se o primeiro cadastro foi bem-sucedido
        expect(res.status).to.eq(201);
  
        // Tentativa de cadastro com o mesmo nome (duplicado)
        cy.request({
          method: 'POST',
          url: '/produtos',
          headers: { Authorization: Cypress.env('token') },
          body: produtoDuplicado,
          failOnStatusCode: false // Evita falha automática por status 400
        }).then((res2) => {
          // Verifica se o retorno foi 400 (erro esperado)
          expect(res2.status).to.eq(400);
          // Verifica se a mensagem indica produto duplicado
          expect(res2.body.message).to.eq('Já existe produto com esse nome');
        });
      });
    });
  
    // Teste: Deve buscar um produto específico por ID
    it('Deve buscar um produto específico por ID', () => {
      // Primeiro cria um produto para depois buscá-lo
      cy.request({
        method: 'POST',
        url: '/produtos',
        headers: { Authorization: Cypress.env('token') },
        body: {
          nome: `Produto Para Buscar ${Date.now()}`, // Nome único
          preco: 80,
          descricao: 'Produto para teste de busca por ID',
          quantidade: 20
        }
      }).then((res) => {
        // Verifica se o produto foi criado com sucesso
        expect(res.status).to.eq(201);
        // Armazena o ID do produto criado
        const idProduto = res.body._id;
  
        // Busca o produto usando o ID
        cy.request({
          method: 'GET',
          url: `/produtos/${idProduto}`,
          headers: { Authorization: Cypress.env('token') }
        }).then((resBusca) => {
          // Verifica se o retorno foi bem-sucedido
          expect(resBusca.status).to.eq(200);
          // Verifica se o nome do produto retornado é o esperado
          expect(resBusca.body.nome).to.include('Produto Para Buscar');
        });
      });
    });
});
