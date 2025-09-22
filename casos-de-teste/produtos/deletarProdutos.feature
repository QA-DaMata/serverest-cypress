# language: pt
Funcionalidade: Exclusão de produto
  Casos de teste de API para o método DELETE da entidade produto
  Como usuário do sistema ServeRest
  Quero excluir os meus produtos
  Para remover os produtos selecionados

  Cenário: Deve excluir o produto com sucesso
    Dado que eu acesse a rota DELETE da entidade "produto"
    E passe o id do produto
    Quando a requisição for enviada
    Então o produto deve ser excluído com sucesso

  Cenário: Não pode excluir um produto que faça parte de um carrinho
    Dado que eu acesse a rota DELETE da entidade "produto"
    E passe o id de um produto que faça parte de um carrinho
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "Não é permitido excluir produto que faz parte de carrinho"
    E o produto não será excluido

  Cenário: Não deve excluir produto com o token de autenticação inválido
    Dado que eu acesse a rota DELETE da entidade "produto"
    E passe o id do produto
    E passe um token inválido
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
    E o produto não será excluido

  Cenário: Não deve excluir um produto se o usuário não tiver acesso de administrador
    Dado que eu acesse a rota DELETE da entidade "produto"
    E passe o id do produto
    E esteja com um usuário sem acesso de administrador
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "Rota exclusiva para administradores"
    E o produto não será excluído
