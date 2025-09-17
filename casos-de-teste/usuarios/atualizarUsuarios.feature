#language: pt

Funcionalidade: Atualização de usuário
  Casos de teste de API para o método PUT da entidade usuário
  Como usuário do sistema ServeRest
  Quero atualizar as informações do meu cadastro
  Para manter minhas informações atualizadas

Cenário: Atualização de usuário com sucesso
  Dado que eu acesse a rota PUT da entidade "usuários"
  E informe o id do usuário
  E atualize um dos campos <nome>, <email>, <password> ou <administrador>
  E o campo <email> não esteja cadastrado para outro usuário
  Quando a requisição for enviada
  Então o usuário deve ser atualizado com sucesso

Cenário: Criar novo usuário caso o id não seja encontrado
  Dado que eu acesse a rota PUT da entidade "usuários"
  E informe um id não cadastrado na plataforma
  E atualize um dos campos <nome>, <email>, <password> ou <administrador>
  E o campo <email> não esteja cadastrado para outro usuário
  Quando a requisição for enviada
  Então deve cadastrar um novo usuário

Cenário: Não deve atualizar usuário com email já cadastrado
  Dado que eu acesse a rota PUT da entidade "usuários"
  E informe o id do usuário
  E atualize um dos campos <nome>, <email>, <password> ou <administrador>
  E o campo <email> já esteja cadastrado para outro usuário
  Quando a requisição for enviada
  Então a requisição irá retornar a mensagem "Este email já está sendo usado"
  E o usuário não será atualizado

Esquema do Cenário: Não deve atualizar usuário com campo inválido, vazio ou nulo
  Dado que eu acesse a rota PUT da entidade "usuários"
  E informe o id do usuário
  E atualize um dos campos <nome>, <email>, <password> ou <administrador>
  E deixe o campo <campo_invalido> com valor <valor_invalido>
  E o campo <email> não esteja cadastrado para outro usuário
  Quando a requisição for enviada
  Então a requisição irá retornar a mensagem "<mensagem_erro>"
  E o usuário não será atualizado

  Exemplos:
    | campo_invalido  | valor_invalido | mensagem_erro                               |
    | nome            | ""             | Nome não pode ficar em branco               |
    | email           | ""             | Email não pode ficar em branco              |
    | password        | ""             | Password não pode ficar em branco           |
    | administrador   | ""             | Administrador deve ser 'true' ou 'false'   |
    | nome            | 123            | Nome deve ser uma string                     |
    | email           | 123            | Email deve ser uma string                    |
    | password        | 123            | Password deve ser uma string                 |
    | administrador   | 123            | Administrador deve ser 'true' ou 'false'    |
    | email           | "inválido"     | Email deve ser um email válido              |
