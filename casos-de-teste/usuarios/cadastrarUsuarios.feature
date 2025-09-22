# language: pt
Funcionalidade: Cadastro de usuário
  Casos de teste de API para o método POST da entidade usuário
  Como possível novo usuário do sistema ServeRest
  Quero me cadastrar na plataforma
  Para utilizar os seus serviços

  Cenário: Cadastro de usuário com sucesso
    Dado que eu acesse a rota POST da entidade "usuários"
    E preencha os campos <nome>, <email>, <password> e <administrador>
    E o campo <email> não esteja cadastrado para outro usuário
    Quando a requisição for enviada
    Então o usuário deve ser cadastrado com sucesso

  Cenário: Não deve cadastrar usuário com email já cadastrado
    Dado que eu acesse a rota POST da entidade "usuários"
    E preencha os campos <nome>, <email>, <password> e <administrador>
    E o campo <email> já esteja cadastrado para outro usuário
    Quando a requisição for enviada
    Então o usuário não será cadastrado e a API retornará a mensagem "Este email já está sendo usado"

  Esquema do Cenário: Não deve cadastrar usuário com campo inválido ou vazio
    Dado que eu acesse a rota POST da entidade "usuários"
    E preencha os campos <nome>, <email>, <password> e <administrador>
    E deixe o campo <campo_invalido> com valor <valor_invalido>
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "<mensagem_erro>"
    E o usuário não será cadastrado

    Exemplos:
      | campo_invalido | valor_invalido | mensagem_erro                            |
      | nome           | ""             | Nome não pode ficar em branco            |
      | email          | ""             | Email não pode ficar em branco           |
      | password       | ""             | Password não pode ficar em branco        |
      | administrador  | ""             | Administrador deve ser 'true' ou 'false' |
      | email          | "inválido"     | Email deve ser um email válido           |
      | nome           | 123            | Nome deve ser uma string                 |
      | email          | 123            | Email deve ser uma string                |
      | password       | 123            | Password deve ser uma string             |
      | administrador  | 123            | Administrador deve ser 'true' ou 'false' |

  Esquema do Cenário: Não deve cadastrar usuário sem campo obrigatório
    Dado que eu acesse a rota POST da entidade "usuários"
    E preencha os campos <nome>, <email>, <password> e <administrador>
    E omita o campo <campo_obrigatorio>
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "<mensagem_erro>"
    E o usuário não será cadastrado

    Exemplos:
      | campo_obrigatorio | mensagem_erro               |
      | nome              | Nome é obrigatório          |
      | email             | Email é obrigatório         |
      | password          | Password é obrigatório      |
      | administrador     | Administrador é obrigatório |
