import carrinhos from "../../../fixtures/factories/carrinho";
import produtos from "../../../fixtures/factories/produto";
import usuarios from "../../../fixtures/factories/usuario";
import contrato from "../../../contracts/carrinhos.contrato"

describe('Teste de api na rota GET de carrinhos', () => {
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

    it('Deve validar o contrato de carrinhos com sucesso', () => {
        cy.request('carrinhos').then(res => {
            return contrato.validateAsync(res.body.carrinhos[0].produtos[0])
        })
    })

    it('Deve listar todos os carrinhos', () => {
        cy.listarCarrinho().then(res => {
            expect(res.status).eq(200)
        })
    })

    it("Deve listar um carrinho pelo id", () => {
        let produto = produtos.produtoData()
        let carrinho = carrinhos.carrinhoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            carrinho.idProduto = id
            expect(res.status).eq(201)
            cy.cadastrarCarrinho(token, carrinho).then(res => {
                let idCarrinho = res.body._id
                expect(res.status).eq(201)
                expect(res.body.message).eq('Cadastro realizado com sucesso')
                cy.listarCarrinhoId(idCarrinho).then(res => {
                    expect(res.status).eq(200)
                    expect(res.body.produtos[0].idProduto).eq(id)
                })
                cy.cancelarCompra(token).then(res => {
                    expect(res.status).eq(200)
                    expect(res.body.message).eq('Registro excluído com sucesso. Estoque dos produtos reabastecido')
                })
                cy.deletarProduto(id, token).then(res => {
                    expect(res.status).eq(200)
                    expect(res.body.message).eq('Registro excluído com sucesso')
                })
            })
        })
    })

    it('Não deve listar o carrinho pelo id não cadastrado', () => {
        let idInvalido = 'souInvalidosieuf'
        cy.listarCarrinhoId(idInvalido).then(res => {
            expect(res.status).eq(400)
            expect(res.body.message).eq('Carrinho não encontrado')
        })
    })

});