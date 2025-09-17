import produtos from "../../../fixtures/factories/produto";
import usuarios from "../../../fixtures/factories/usuario"
import produtosArr from "../../../fixtures/produtos.json"

describe('Teste de API na rota POST de produtos', () => {
    let token;
    let id;
    beforeEach(() => {
        let usuario = usuarios.usuarioData()
        usuario.administrador = "true"
        cy.cadastrarUsuario(usuario).then(res => {
            id = res.body._id
            cy.token(usuario.email, usuario.password).then(res => {
                token = res
            })
        })
    });

    afterEach(() => {
        cy.deletarUsuario(id).then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Registro excluído com sucesso')
        })
    });

    it("Deve cadastrar produto com sucesso", () => {
        let produto = produtos.produtoData()

        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve cadastrar produto com o mesmo nome', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.cadastrarProduto(token, produto).then(res => {
                expect(res.status).eq(400)
                expect(res.body.message).eq('Já existe produto com esse nome')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve cadastrar o produto com o campo nome nulo', () => {
        let produto = produtos.produtoData()
        let nomeNull = ''
        produto.nome = nomeNull
        cy.cadastrarProduto(token, produto).then(res => {
            expect(res.status).eq(400)
            expect(res.body.nome).eq('nome não pode ficar em branco')
        })
    })

    it('Não deve cadastrar o produto com o campo preço nulo', () => {
        let produto = produtos.produtoData()
        let precoNull = ''
        produto.preco = precoNull
        cy.cadastrarProduto(token, produto).then(res => {
            expect(res.status).eq(400)
            expect(res.body.preco).eq('preco deve ser um número')
        })
    })

    it('Não deve cadastrar o produto com o campo descrição nulo', () => {
        let produto = produtos.produtoData()
        let descNull = ''
        produto.descricao = descNull
        cy.cadastrarProduto(token, produto).then(res => {
            expect(res.status).eq(400)
            expect(res.body.descricao).eq('descricao não pode ficar em branco')
        })
    })

    it('Não deve cadastrar o produto com o campo quantidade nulo', () => {
        let produto = produtos.produtoData()
        let qntNull = ''
        produto.quantidade = qntNull
        cy.cadastrarProduto(token, produto).then(res => {
            expect(res.status).eq(400)
            expect(res.body.quantidade).eq('quantidade deve ser um número')
        })
    })

    it('Não deve cadastrar o produto sem o campo nome', () => {
        cy.cadastrarProduto(token, produtosArr[0]).then(res => {
            expect(res.status).eq(400)
            expect(res.body.nome).eq('nome é obrigatório')
        })
    })

    it('Não deve cadastrar o produto sem o campo preço', () => {
        cy.cadastrarProduto(token, produtosArr[1]).then(res => {
            expect(res.status).eq(400)
            expect(res.body.preco).eq('preco é obrigatório')
        })
    })

    it('Não deve cadastrar o produto sem o campo descrição', () => {
        cy.cadastrarProduto(token, produtosArr[2]).then(res => {
            expect(res.status).eq(400)
            expect(res.body.descricao).eq('descricao é obrigatório')
        })
    })

    it('Não deve cadastrar o produto sem o campo quantidade', () => {
        cy.cadastrarProduto(token, produtosArr[3]).then(res => {
            expect(res.status).eq(400)
            expect(res.body.quantidade).eq('quantidade é obrigatório')
        })
    })

    it('Não deve cadastrar produto com o token inválido', () => {
        let tokenInvalido = 'souinvalidoasjklfbnAWUIL'
        let produto = produtos.produtoData()
        cy.cadastrarProduto(tokenInvalido, produto).then(res => {
            expect(res.status).eq(401)
            expect(res.body.message).eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    it('Não deve cadastrar o produto com o usuário sem acesso de administrador', () => {
        let produto = produtos.produtoData()
        let usuario = usuarios.usuarioData()
        let adm = "false"
        usuario.administrador = adm

        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.token(usuario.email, usuario.password).then(res => {
                let tkn = res
                cy.cadastrarProduto(tkn, produto).then(res => {
                    expect(res.status).eq(403)
                    expect(res.body.message).eq('Rota exclusiva para administradores')
                })
            })
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

});