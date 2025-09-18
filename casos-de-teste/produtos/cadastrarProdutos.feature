# language: pt
Funcionalidade: Cadastrar produtos
  Casos de teste de api para o metodo POST da entidade produtos
  Como usuario do sistema serveRest
  Quero cadastrar os produtos
  Para adicionar os meus produtos na plataforma

  Cenário: Cadastro de produto
    Dado que eu acesse a rota POST da entidade "produtos"
    E preencha os campos <nome>, <preco>, <descricao> e <quantidade>
    E o campo <nome> não esteja cadastrado para outro produto
    Quando a requisição for enviada
    Então o produto deve ser cadastrado com sucesso

  Cenário: Não deve cadastrar produto com o mesmo nome
    Dado que eu acesse a rota POST da entidade "produtos"
    E preencha os campos <nome>, <preco>, <descricao> e <quantidade>
    E o campo <nome> já esteja cadastrado para outro produto
    Quando a requisição for enviada
    Então o produto não sera cadastrado e a api tera a resposta "Já existe produto com esse nome"

  Cenário: Não deve cadastrar produto com o token invalido
    Dado que eu acesse a rota POST da entidade "produtos"
    E preencha os campos <nome>, <preco>, <descricao> e <quantidade>
    E esteja com o token invalido
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
    E o produto não será cadastrado

  Cenário: Não deve cadastrar o produto com o usuario sem o acesso de administrador
    Dado que eu acesse a rota POST da entidade "produtos"
    E preencha os campos <nome>, <preco>, <descricao> e <quantidade>
    E esteja com o usuario sem o acesso do administrador
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "Rota exclusiva para administradores"
    E o produto não será cadastrado

  Esquema do Cenário: Não deve cadastrar produto com campo inválido
    Dado que eu acesse a rota POST da entidade "produtos"
    E preencha os campos <nome>, <preco>, <descricao> e <quantidade>
    E deixe o campo <campo_invalido> com o valor <valor_invalido>
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem `<mensagem_erro>`
    E o produto não será cadastrado

    Exemplos:
      | campo_invalido | valor_invalido | mensagem_erro                      |
      | nome           | ""             | nome não pode ficar em branco      |
      | preco          | ""             | preco deve ser um número           |
      | descricao      | ""             | descricao não pode ficar em branco |
      | quantidade     | ""             | quantidade deve ser um número      |

  Esquema do Cenário: Não deve cadastrar produto sem campo obrigatório
    Dado que eu acesse a rota POST da entidade "produtos"
    E preencha os campos <nome>, <preco>, <descricao> e <quantidade>
    E omita o campo <campo_obrigatorio>
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "<mensagem_erro>"
    E o produto não será cadastrado

    Exemplos:
      | campo_obrigatorio | mensagem_erro            |
      | nome              | nome é obrigatório       |
      | preco             | preco é obrigatório      |
      | descricao         | descricao é obrigatório  |
      | quantidade        | quantidade é obrigatório |
