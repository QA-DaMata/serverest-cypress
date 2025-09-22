# language: pt
Funcionalidade: Busca de produtos
  Casos de teste de api para o metodo GET da entidade produtos
  Como usuário do sistema ServeRest
  Quero pesquisar as informações dos produtos
  Para manter o controle dos meus produtos

  Cenário: Deve validar o contrato de produtos com sucesso
    Dado que eu acesse a rota GET da entidade "produtos"
    Quando o contrato da resposta estiver em conformidade
    Então o sistema deve aceitar a requisição

  Cenário: Deve listar todos os produtos cadastrados
    Dado que eu acesse a rota GET da entidade "produtos"
    Quando a requisição for enviada
    Então o sistema deve listar todos os produtos

  Cenário: Deve buscar produto por ID
    Dado que eu acesse a rota GET por id da entidade "produtos"
    Quando for enviado um id que está cadastrado na plataforma
    Então deve retornar as informações do produto que possui o mesmo id

  Cenário: Não deve buscar produto com ID não cadastrado
    Dado que eu acesse a rota GET por ID da entidade "produtos"
    Quando for enviado um ID que não está cadastrado
    Então deve retornar a mensagem de 'Produto não encontrado'
