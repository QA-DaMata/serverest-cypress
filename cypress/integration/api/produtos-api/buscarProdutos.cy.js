import produtos from "../../../fixtures/factories/produto";
import usuarios from "../../../fixtures/factories/usuario";
import contrato from "../../../contracts/produtos.contrato"


describe('Teste de api na rota GET de produtos', () => {
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

    it('Deve validar o contrato de produtos com sucesso', () => {
        cy.request('produtos').then(res => {
            return contrato.validateAsync(res.body)
        })
    })

    it('Deve listar todos os produto cadastrados', () => {
        cy.listarProdutos().then(res => {
            expect(res.status).eq(200)
        })
    })

    it('Deve buscar produto por id', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.listarProdutosId(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.nome).eq(produto.nome)
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve buscar produto com id não cadastrado', () => {
        let idInvalido = 'GuiJh5lz3k6kSIzA'
        cy.listarProdutosId(idInvalido).then(res => {
            expect(res.status).eq(400)
            expect(res.body.message).eq('Produto não encontrado')
        })
    })
});