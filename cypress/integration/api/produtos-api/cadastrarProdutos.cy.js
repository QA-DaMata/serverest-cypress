import produtos from "../../../fixtures/factories/produto";
import usuarios from "../../../fixtures/factories/usuario"
import produtosArr from "../../../fixtures/produtos.json"

describe('Teste de api na rota POST de produtos', () => {
    let token;

    beforeEach(() => {
        cy.token("fulano@qa.com", "teste").then(res => {
            token = res
        })
    });

    it("Deve cadastrar produto com sucesso", () => {
        let produto = produtos.produtoData()

        cy.cadastrarProduto(token, produto).then(res => {
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
        })
    })

    it('Não deve cadastrar produto com o mesmo nome', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.cadastrarProduto(token, produto).then(res => {
                expect(res.status).eq(400)
                expect(res.body.message).eq('Já existe produto com esse nome')
            })
        })
    })

    it('Não deve cadastar o produto com o campo nome nulo', () => {
        let produto = produtos.produtoData()
        let nomeNull = ''
        produto.nome = nomeNull
        cy.cadastrarProduto(token, produto).then(res => {
            expect(res.status).eq(400)
            expect(res.body.nome).eq('nome não pode ficar em branco')
        })
    })

    it('Não deve cadastar o produto com o campo preco nulo', () => {
        let produto = produtos.produtoData()
        let precoNull = ''
        produto.preco = precoNull
        cy.cadastrarProduto(token, produto).then(res => {
            expect(res.status).eq(400)
            expect(res.body.preco).eq('preco deve ser um número')
        })
    })

    it('Não deve cadastar o produto com o campo descricao nulo', () => {
        let produto = produtos.produtoData()
        let descNull = ''
        produto.descricao = descNull
        cy.cadastrarProduto(token, produto).then(res => {
            expect(res.status).eq(400)
            expect(res.body.descricao).eq('descricao não pode ficar em branco')
        })
    })

    it('Não deve cadastar o produto com o campo quantidade nulo', () => {
        let produto = produtos.produtoData()
        let qntNull = ''
        produto.quantidade = qntNull
        cy.cadastrarProduto(token, produto).then(res => {
            expect(res.status).eq(400)
            expect(res.body.quantidade).eq('quantidade deve ser um número')
        })
    })

    it('Não deve cadastar o produto sem o campo nome', () => {
        cy.cadastrarProduto(token, produtosArr[0]).then(res => {
            expect(res.status).eq(400)
            expect(res.body.nome).eq('nome é obrigatório')
        })
    })

    it('Não deve cadastar o produto sem o campo preco', () => {
        cy.cadastrarProduto(token, produtosArr[1]).then(res => {
            expect(res.status).eq(400)
            expect(res.body.preco).eq('preco é obrigatório')
        })
    })

    it('Não deve cadastar o produto sem o campo descricao', () => {
        cy.cadastrarProduto(token, produtosArr[2]).then(res => {
            expect(res.status).eq(400)
            expect(res.body.descricao).eq('descricao é obrigatório')
        })
    })

    it('Não deve cadastar o produto sem o campo quantidade', () => {
        cy.cadastrarProduto(token, produtosArr[3]).then(res => {
            expect(res.status).eq(400)
            expect(res.body.quantidade).eq('quantidade é obrigatório')
        })
    })

    it('Não deve cadastrar produto com o token invalido', () => {
        let tokenInvalido = 'souinvalidoasjklfbnAWUIL'
        let produto = produtos.produtoData()
        cy.cadastrarProduto(tokenInvalido, produto).then(res => {
            expect(res.status).eq(401)
            expect(res.body.message).eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    it('Não deve cadastrar o produto com o usuario sem o acesso de adiminstrador', () => {
        let produto = produtos.produtoData()
        let usuario = usuarios.usuarioData()
        let adm = "false"
        usuario.administrador = adm

        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.token(usuario.email, usuario.password).then(res => {
                let tkn = res
                cy.cadastrarProduto(tkn, produto).then(res => {
                    expect(res.status).eq(403)
                    expect(res.body.message).eq('Rota exclusiva para administradores')
                })
            })

        })
    })




});