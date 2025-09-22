#language: pt

Funcionalidade: Conclusão de carrinhos
Casos de teste de API para o método DELETE da entidade "carrinhos/concluir-comprar"
Como usuário do sistema ServeRest
Quero concluir o meu carrinho
Para realizar a compra dos itens do meu carrinho

Cenário: Deve concluir o carrinho com sucesso
Dado que eu acesse a rota DELETE da entidade "carrinhos/concluir-comprar"
E passe apenas o token do usuário
Quando a requisição for enviada
Então a requisição irá retornar a mensagem "Registro excluído com sucesso"
E o carrinho será concluído com sucesso

Cenário: Não deve concluir carrinho não encontrado
Dado que eu acesse a rota DELETE da entidade "carrinhos/concluir-comprar"
E passe apenas o token de um usuário que não possui um carrinho
Quando a requisição for enviada
Então a requisição irá retornar a mensagem "Não foi encontrado carrinho para esse usuário"
E o carrinho não será concluído

Cenário: Não deve concluir o carrinho com token inválido
Dado que eu acesse a rota DELETE da entidade "carrinhos/concluir-comprar"
E passe apenas o token do usuário inválido
Quando a requisição for enviada
Então a requisição irá retornar a mensagem "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
E o carrinho não será concluído