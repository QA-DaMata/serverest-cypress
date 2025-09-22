# language: pt
Funcionalidade: Busca de carrinhos
  Casos de teste de API para o método GET da entidade carrinhos
  Como usuário do sistema ServeRest
  Quero pesquisar as informações dos meus carrinhos
  Para manter o controle dos meus itens selecionados

  Cenário: Deve validar contrato de carrinhos com sucesso
    Dado que eu acesse a rota GET da entidade "carrinhos"
    Quando for enviado alguma informação do response body com o contrato alterado
    Então o sistema deve recusar a requisição

  Cenário: Deve listar todos os carrinhos cadastrados
    Dado que eu acesse a rota GET da entidade "carrinhos"
    Quando a requisição for enviada
    Então deve listar todos os carrinhos

  Cenário: Deve buscar carrinho pelo ID
    Dado que eu acesse a rota GET por ID da entidade "carrinho"
    Quando for enviado um ID que está cadastrado na plataforma
    Então deve retornar as informações do carrinho que possui o mesmo ID

  Cenário: Não deve buscar carrinho com o ID não cadastrado
    Dado que eu acesse a rota GET por ID da entidade "carrinho"
    Quando for enviado um ID que não está cadastrado na plataforma
    Então deve retornar a mensagem "Carrinho não encontrado"
