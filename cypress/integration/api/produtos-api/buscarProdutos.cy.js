import produtos from "../../../fixtures/factories/produto";
import contrato from "../../../contracts/produtos.contrato"

describe('Teste de api na rota GET de produtos', () => {
    let token;

    beforeEach(() => {
        cy.token("fulano@qa.com", "teste").then(res => {
            token = res
        })
    });

    it('Deve validar o contrato de produtos com sucesso', () => {
        cy.request('produtos').then(res => {
            return contrato.validateAsync(res.body)
        })
    })

    it('Deve listar todos os produto cadastrados', () =>{
        cy.listarProdutos().then(res => {
            expect(res.status).eq(200)
        })
    })

    it('Deve buscar produto por id', () =>{
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token ,produto).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.listarProdutosId(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.nome).eq(produto.nome)
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