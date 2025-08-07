import usuarios from "../../../fixtures/factories/usuario";

describe('Teste de api na rota Delete de usuarios', () => {

    it('Deve excluir usuario', () => {
        let usuario = usuarios.usuarioData()
        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve excluir usuario com carrinho cadastrado', () => {
        let id = '0uxuPY0cbmQhpEz1'
        cy.deletarUsuario(id).then(res => {
            expect(res.status).eq(400)
            expect(res.body.message).eq('Não é permitido excluir usuário com carrinho cadastrado')
        })
    })

    it('Ao não encontrar um id deve aparecer a mensagem (Nenhum registro excluído)', () => {
        let id = '0guiPY0cbmQhpEz1'
        cy.deletarUsuario(id).then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Nenhum registro excluído')
        })
    })
    
});