import carrinhos from "../../../fixtures/factories/carrinho";
import produtos from "../../../fixtures/factories/produto";
import usuarios from "../../../fixtures/factories/usuario";

describe('Teste de api na rota DELETE de carrinhos', () => {
    let token;

    beforeEach(() => {
        let usuario = usuarios.usuarioData()
        usuario.administrador = "true"
        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
        })
        cy.token(usuario.email, usuario.password).then(res => {
            token = res
        })
    });

    it('Deve excluir o carrinho com sucesso', () => {
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
        })
    })

    it('Não deve excluir carrinho não encontrado', () => {
        let produto = produtos.produtoData()

        cy.cadastrarProduto(token, produto).then(res => {
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.concluirCompra(token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Não foi encontrado carrinho para esse usuário')
            })
        })
    })

    it('Não deve excluir o carrinho com o token invalido', () => {
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
            })
        })
    })

});