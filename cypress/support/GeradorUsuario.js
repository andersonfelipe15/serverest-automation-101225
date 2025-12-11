// Define uma classe chamada GeradorUsuario
class GeradorUsuario {
  
  // Método estático que gera um novo usuário
  static gerarUsuario() {
    
    // Cria uma string com a data e hora atual, removendo caracteres -, :, . para formar um identificador único
    const dataHora = new Date().toISOString().replace(/[-:.]/g, '');
    
    // Monta o nome do usuário usando o prefixo 'user' seguido da data e hora
    const nome = `user${dataHora}`;
    
    // Monta o e-mail do usuário com o mesmo identificador para garantir que seja único
    const email = `user${dataHora}@gmail.com`;
    
    // Define uma senha fixa para todos os usuários gerados
    const senha = 'user@123';
    
    // Retorna um objeto contendo o nome, o e-mail e a senha gerados
    return { nome, email, senha };
  }
}

// Exporta a classe GeradorUsuario para poder ser utilizada em outros arquivos do projeto
export default GeradorUsuario;
