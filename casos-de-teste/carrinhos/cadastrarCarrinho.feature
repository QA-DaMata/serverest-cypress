#language: pt

Funcionalidade: Cadastro de carrinhos
Casos de teste de API para o método POST da entidade "carrinhos"
Como usuário do sistema ServeRest
Quero cadastrar o meu carrinho
Para efetuar a compra dos itens selecionados

Cenário: Deve cadastrar carrinho com sucesso
Dado que eu acesse a rota POST da entidade "carrinhos"
E passe o ID do produto
Quando a requisição for enviada
Então o carrinho deve ser cadastrado com sucesso

Cenário: Não deve cadastrar o carrinho com produto duplicado
Dado que eu acesse a rota POST da entidade "carrinhos"
E passe o mesmo produto 2 ou mais vezes
Quando a requisição for enviada
Então a requisição irá retornar a mensagem "Não é permitido possuir produto duplicado"
E o carrinho não será cadastrado

Cenário: Não deve cadastrar 2 carrinhos para o mesmo usuário
Dado que eu acesse a rota POST da entidade "carrinhos"
E envie o ID do produto
E envie o token de um usuário que já possui um carrinho cadastrado
Quando a requisição for enviada
Então a requisição irá retornar a mensagem "Não é permitido ter mais de 1 carrinho"
E o carrinho não será cadastrado

Cenário: Não deve cadastrar o carrinho com o ID do produto não encontrado
Dado que eu acesse a rota POST da entidade "carrinhos"
E passe o ID de um produto não cadastrado
Quando a requisição for enviada
Então a requisição irá retornar a mensagem "Produto não encontrado"
E o carrinho não será cadastrado

Cenário: Não deve cadastrar o carrinho com produto sem estoque
Dado que eu acesse a rota POST da entidade "carrinhos"
E passe o ID de um produto com o campo <quantidade> zerado
Quando a requisição for enviada
Então a requsição irá retonar a mensagem "Produto não possui quantidade suficiente"
E o carrinho não será cadastrado

Cenário: Não deve cadastrar carrinho com o token inválido
Dado que eu acesse a rota POST da entidade "carrinhos"
E envie o ID do produto
E esteja com o token inválido
Quando a requisição for enviada
Então a requisição irá retornar a mensagem "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
E o carrinho não será cadastrado