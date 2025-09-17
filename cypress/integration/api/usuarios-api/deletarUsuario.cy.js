import usuarios from "../../../fixtures/factories/usuario";

describe('Teste de API na rota DELETE de usuários', () => {

    it('Deve excluir o usuário com sucesso', () => {
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

    it('Não deve excluir usuário com carrinho cadastrado', () => {
        let id = '0uxuPY0cbmQhpEz1'
        cy.deletarUsuario(id).then(res => {
            expect(res.status).eq(400)
            expect(res.body.message).eq('Não é permitido excluir usuário com carrinho cadastrado')
        })
    })

    it('Não deve excluir usuário quando o id passado não estiver cadastrado', () => {
        let id = '0guiPY0cbmQhpEz1'
        cy.deletarUsuario(id).then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Nenhum registro excluído')
        })
    })
    
});