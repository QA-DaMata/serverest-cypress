# language: pt
Funcionalidade: Cancelamento de carrinhos
  Casos de teste de API para o método DELETE da entidade "carrinhos/cancelar-comprar"
  Como usuário do sistema ServeRest
  Quero cancelar o meu carrinho
  Para remover todos os itens e começar um novo carrinho do zero

  Cenário: Deve cancelar a compra com sucesso
    Dado que eu acesse a rota DELETE da entidade "carrinhos/cancelar-comprar"
    E passe apenas o token do usuário
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "Registro excluído com sucesso. Estoque dos produtos reabastecido"
    E o carrinho será cancelado

  Cenário: Não deve cancelar a compra com carrinho não encontrado
    Dado que eu acesse a rota DELETE da entidade "carrinhos/cancelar-comprar"
    E passe apenas o token de um usuário que não possui um carrinho
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "Não foi encontrado carrinho para esse usuário"
    E o carrinho não será cancelado

  Cenário: Não deve cancelar o carrinho com token inválido
    Dado que eu acesse a rota DELETE da entidade "carrinhos/cancelar-comprar"
    E passe apenas o token do usuário inválido
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
    E o carrinho não será cancelado
