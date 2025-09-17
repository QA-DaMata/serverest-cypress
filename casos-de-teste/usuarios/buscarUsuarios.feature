#language: pt

Funcionalidade: Busca de usuários
Casos de teste de api para os metodos GET da entidade usuario
Como usuario do sistema serveRest
Quero listar os usuarios
Para visualizar suas informações

Cenário: Deve validar contrato de usuários com sucesso
Dado que eu acesse a rota GET da entidade "usuarios"
Quando a resposta contiver dados fora do contrato esperado
Então o sistema deve recusar a requisição

Cenário: Deve listar todos os usuarios cadastrados
Dado que eu acesse a rota GET da entidade "usuarios"
Quando a requisição for feita
Então deve retornar todos os usuarios cadastrados

Cenário: Deve encontrar o usuario pelo id
Dado que eu acesse a rota GET por id da entidade "usuarios"
Quando for enviado um id que está cadastrado na plataforma
Então deve retornar as informações do usuario que possui o mesmo id

Cenário: Não deve encontrar usuário pelo id não cadastrado
Dado que eu acesse a rota GET por id da entidade "usuarios"
Quando for enviado um id que não está cadastrado na plataforma
Então deve retornar a mensagem de 'Usuário não encontrado'