import carrinhos from "../../../fixtures/factories/carrinho";
import produtos from "../../../fixtures/factories/produto";
import usuarios from "../../../fixtures/factories/usuario";

describe('Teste de api na rota DELETE de carrinhos', () => {
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

    it('Deve concluir o carrinho com sucesso', () => {
        let produto = produtos.produtoData()
        let carrinho = carrinhos.carrinhoData()

        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            carrinho.idProduto = id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.cadastrarCarrinho(token, carrinho).then(res => {
                expect(res.status).eq(201)
                expect(res.body.message).eq('Cadastro realizado com sucesso')
                cy.concluirCompra(token).then(res => {
                    expect(res.status).eq(200)
                    expect(res.body.message).eq('Registro excluído com sucesso')
                })
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve concluir carrinho não encontrado', () => {
        let produto = produtos.produtoData()

        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.concluirCompra(token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Não foi encontrado carrinho para esse usuário')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve concluir o carrinho com o token invalido', () => {
        let produto = produtos.produtoData()
        let carrinho = carrinhos.carrinhoData()

        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            carrinho.idProduto = id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.cadastrarCarrinho(token, carrinho).then(res => {
                let tokenInvalido = 'souInvalidoASEHJKGF'
                expect(res.status).eq(201)
                expect(res.body.message).eq('Cadastro realizado com sucesso')
                cy.concluirCompra(tokenInvalido).then(res => {
                    expect(res.status).eq(401)
                    expect(res.body.message).eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
                })
                cy.cancelarCompra(token).then(res => {
                    expect(res.status).eq(200)
                    expect(res.body.message).eq('Registro excluído com sucesso. Estoque dos produtos reabastecido')
                })
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

});