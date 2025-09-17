import carrinhos from "../../../fixtures/factories/carrinho";
import produtos from "../../../fixtures/factories/produto";
import usuarios from "../../../fixtures/factories/usuario";

describe('Teste de API na rota POST de carrinhos', () => {
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

    it('Deve cadastrar carrinho com sucesso', () => {
        let produto = produtos.produtoData()
        let carrinho = carrinhos.carrinhoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            carrinho.idProduto = id
            expect(res.status).eq(201)
            cy.cadastrarCarrinho(token, carrinho).then(res => {
                expect(res.status).eq(201)
                expect(res.body.message).eq('Cadastro realizado com sucesso')
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

    it('Não deve cadastrar o carrinho com produto duplicado', () => {
        let produto = produtos.produtoData()
        let carrinho = carrinhos.carrinhoData()
        let duplicado = carrinhos.duplicado()

        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            carrinho.idProduto = id
            duplicado.idProduto = carrinho.idProduto
            duplicado.quantidade = carrinho.quantidade
            expect(res.status).eq(201)
            cy.cadastrarCarrinhoDuplicado(token, carrinho, duplicado).then(res => {
                expect(res.status).eq(400)
                expect(res.body.message).eq('Não é permitido possuir produto duplicado')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve cadastrar dois carrinhos para o mesmo usuário', () => {
        let produto = produtos.produtoData()
        let carrinho = carrinhos.carrinhoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            carrinho.idProduto = id
            expect(res.status).eq(201)
            cy.cadastrarCarrinho(token, carrinho).then(res => {
                expect(res.status).eq(201)
                expect(res.body.message).eq('Cadastro realizado com sucesso')
            })
            cy.cadastrarCarrinho(token, carrinho).then(res => {
                expect(res.status).eq(400)
                expect(res.body.message).eq('Não é permitido ter mais de 1 carrinho')
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

    it('Não deve cadastrar o carrinho com o id do produto não encontrado', () => {
        let produto = produtos.produtoData()
        let carrinho = carrinhos.carrinhoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let idProduto = res.body._id
            let id = 'souInvalidosieuf'
            carrinho.idProduto = id
            expect(res.status).eq(201)
            cy.cadastrarCarrinho(token, carrinho).then(res => {
                expect(res.status).eq(400)
                expect(res.body.message).eq('Produto não encontrado')
            })
            cy.deletarProduto(idProduto, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve cadastrar o carrinho com o produto sem quantidade', () => {
        let produto = produtos.produtoData()
        let carrinho = carrinhos.carrinhoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            carrinho.idProduto = id
            expect(res.status).eq(201)
            produto.quantidade = 0
            cy.atualizarProduto(id, token, produto).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro alterado com sucesso')
            })
            cy.cadastrarCarrinho(token, carrinho).then(res => {
                expect(res.status).eq(400)
                expect(res.body.message).eq('Produto não possui quantidade suficiente')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve cadastrar carrinho com token inválido', () => {
        let produto = produtos.produtoData()
        let carrinho = carrinhos.carrinhoData()
        let tokenInvalido = 'souInvalidoASEHJKGF'
        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            carrinho.idProduto = id
            expect(res.status).eq(201)
            cy.cadastrarCarrinho(tokenInvalido, carrinho).then(res => {
                expect(res.status).eq(401)
                expect(res.body.message).eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
            })
                        cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })
});