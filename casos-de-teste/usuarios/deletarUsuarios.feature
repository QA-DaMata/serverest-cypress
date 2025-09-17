#language: pt

Funcionalidade: Exclusão de usuário
Casos de teste de api para o metodo DELETE da entidade usuário
Como usuário do sistema serveRest
Quero excluir as informações do meu cadastro
Para remover meu dados

Cenário: Deve excluir o usuário com sucesso
Dado que eu acesse a rota DELETE da entidade "usuarios"
E passe o id do usuário
Quando a requisição for enviada
Então o usuário deve ser excluido com sucesso

Cenário: Não deve excluir usuário com carrinho cadastrado
Dado que eu acesse a rota DELETE da entidade "usuarios"
E passe o id do usuário que possua a um carrinho cadastrado 
Quando a requisição for enviada
Então a requisição irá retornar a mensagem "Não é permitido excluir usuário com carrinho cadastrado"
E o usuário não será excluido

Cenário: Não deve excluir usuário quando o id passado não estiver cadastrado
Dado que eu acesse a rota DELETE da entidade "usuarios"
E passe um id não cadastrado na plataforma
Quando a requisição for enviada
Então a requisição irá retornar a mensagem "Nenhum registro excluido"
E o usuário não será excluido  