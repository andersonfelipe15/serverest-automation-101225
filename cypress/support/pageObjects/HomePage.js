// Define a classe HomePage para representar a página inicial (home)
class HomePage {

  // Agrupamento de elementos de forma clara e estruturada
  elements = {
    search: {
      input: () => cy.get('[data-testid="pesquisar"]'),
      button: () => cy.contains('button', 'Pesquisar')
    },
    productCard: {
      base: (productName) => cy.contains('.card', productName),
      addButton: (productName) => cy.contains('.card', productName).within(() => cy.contains('button', 'Adicionar a lista'))
    }
  }

  // Ações de pesquisa de produto
  searchActions = {
    pesquisarProduto: (nomeProduto) => {
      this.elements.search.input().type(nomeProduto); // Digita o nome do produto no campo de busca
      this.elements.search.button().click(); // Clica no botão "Pesquisar"
    }
  }

  // Ações relacionadas à manipulação de produtos
  productActions = {
    adicionarProduto: (nomeProduto) => {
      this.elements.productCard.addButton(nomeProduto).click(); // Clica no botão "Adicionar a lista" do produto
    }
  }

  // Método para realizar a pesquisa de um produto
  pesquisarProduto(nomeProduto) {
    this.searchActions.pesquisarProduto(nomeProduto); // Chamando a ação de pesquisa
  }

  // Método para adicionar um produto à lista
  adicionarProduto(nomeProduto) {
    this.productActions.adicionarProduto(nomeProduto); // Chamando a ação de adicionar produto
  }
}

// Exportando uma instância da classe HomePage para reutilizar nos testes
export default new HomePage();
