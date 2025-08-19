import produtos from "../../../fixtures/factories/produto";
import usuarios from "../../../fixtures/factories/usuario"

describe('Teste de api na rota DELETE de produtos', () => {
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

    it('Deve excluir o produto', () => {
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

    it('Não pode excluir um produto que faça parte de um carrinho', () => {
        let id = 'BeeJh5lz3k6kSIzA'
        cy.deletarProduto(id, token).then(res => {
            expect(res.status).eq(400)
            expect(res.body.message).eq('Não é permitido excluir produto que faz parte de carrinho')
        })
    })

    it('Não deve excluir produto com o token de autenticação invalido', () => {
        let produto = produtos.produtoData()
        let tokenInvalido = "souInvalidoahiwedgqa"

        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.deletarProduto(id, tokenInvalido).then(res => {
                expect(res.status).eq(401)
                expect(res.body.message).eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve excluir um produto se o usuario não tiver o acesso de administrador', () => {
        let produto = produtos.produtoData()
        let usuario = usuarios.usuarioData()
        let adm = "true"
        usuario.administrador = adm

        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.token(usuario.email, usuario.password).then(res => {
                let tkn = res
                cy.cadastrarProduto(tkn, produto).then(res => {
                    let idProduto = res.body._id
                    expect(res.status).eq(201)
                    expect(res.body.message).eq('Cadastro realizado com sucesso')
                    usuario.administrador = "false"
                    cy.atualizarUsuario(id, usuario).then(res => {
                        expect(res.status).eq(200)
                        expect(res.body.message).eq('Registro alterado com sucesso')
                        cy.deletarProduto(idProduto, tkn).then(res => {
                            expect(res.status).eq(403)
                            expect(res.body.message).eq('Rota exclusiva para administradores')
                        })
                        usuario.administrador = "true"
                        cy.atualizarUsuario(id, usuario).then(res => {
                            expect(res.status).eq(200)
                            expect(res.body.message).eq('Registro alterado com sucesso')
                            cy.deletarProduto(idProduto, tkn).then(res => {
                                expect(res.status).eq(200)
                                expect(res.body.message).eq('Registro excluído com sucesso')
                            })
                        })
                    })

                })
            })
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })


        })
    })
});