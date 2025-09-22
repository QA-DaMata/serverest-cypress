# language: pt
Funcionalidade: Atualizar produtos
  Casos de teste de API para o método PUT da entidade produtos
  Como usuário do sistema ServeRest
  Quero atualizar as informações do meu produto
  Para manter o produto atualizado

  Cenário: Deve atualizar o produto com sucesso
    Dado que eu acesse a rota PUT da entidade "produto"
    E passe o id do produto
    E atualize um dos campos <nome>, <preco>, <descricao> e <quantidade>
    E o campo <nome> não esteja cadastrado para outro produto
    Quando a requisição for enviada
    Então o produto deve ser atualizado com sucesso

  Cenário: Deve cadastrar um produto caso não encontre o id
    Dado que eu acesse a rota PUT da entidade "produto"
    E passe o id de um produto não cadastrado
    E atualize um dos campos <nome>, <preco>, <descricao> e <quantidade>
    E o campo <nome> não esteja cadastrado para outro produto
    Quando a requisição for enviada
    Então um novo produto será criado

  Cenário: Não deve atualizar o produto com o mesmo nome de outro
    Dado que eu acesse a rota PUT da entidade "produto"
    E passe o id do produto
    E com o <nome> de outro produto já cadastrado
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "Já existe produto com esse nome"
    E o produto não será atualizado

  Cenário: Não deve atualizar produto com o token inválido
    Dado que eu acesse a rota PUT da entidade "produto"
    E passe o id do produto
    E passe um token inválido
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
    E o produto não será atualizado

  Cenário: Não deve atualizar o produto com o usuário sem a permissão de administrador
    Dado que eu acesse a rota PUT da entidade "produto"
    E passe o id do produto
    E esteja com o usuário sem o acesso de administrador
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "Rota exclusiva para administradores"
    E o produto não será atualizado

  Esquema do Cenário: Não deve atualizar o produto com campo inválido
    Dado que eu acesse a rota PUT da entidade "produto"
    E passe o id do produto
    E deixe o campo <campo_invalido> com o valor <valor_invalido>
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "<mensagem_erro>"
    E o produto não será atualizado

    Exemplos:
      | campo_invalido | valor_invalido | mensagem_erro                      |
      | nome           | ""             | Nome não pode ficar em branco      |
      | preco          | ""             | Preço deve ser um número           |
      | descricao      | ""             | Descrição não pode ficar em branco |
      | quantidade     | ""             | Quantidade deve ser um número      |

  Esquema do Cenário: Não deve atualizar o produto sem campo obrigatório
    Dado que eu acesse a rota PUT da entidade "produto"
    E passe o id do produto
    E omita o campo <campo_obrigatorio>
    Quando a requisição for enviada
    Então a requisição irá retornar a mensagem "<mensagem_erro>"
    E o produto não será atualizado

    Exemplos:
      | campo_obrigatorio | mensagem_erro            |
      | nome              | Nome é obrigatório       |
      | preco             | Preço é obrigatório      |
      | descricao         | Descrição é obrigatória  |
      | quantidade        | Quantidade é obrigatória |
