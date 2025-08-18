import usuarios from "../../../fixtures/factories/usuario";
import contrato from "../../../contracts/usuarios.contrato"

describe('Teste de api na rota GET de usuarios', () => {

    it('Deve validar contrato de usuarios com sucesso', () => {
        cy.request('usuarios').then(res => {
            return contrato.validateAsync(res.body)
        })
    })

    it('Deve listar todos os usuarios cadastrados', () => {
        cy.buscarUsuarios().then(res => {
            expect(res.status).eq(200)
        })
    })

    it('Deve encontrar o usuario pelo id', () => {
        let usuario = usuarios.usuarioData()
        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq("Cadastro realizado com sucesso")
            cy.buscarUsariosId(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.nome).eq(usuario.nome)
            })
        })
    })

    it('Não deve encontrar usuário pelo id não cadastrado', () => {
        let idInvalido = "0uxuPY0cbmQhpqa1"
        cy.buscarUsariosId(idInvalido).then(res => {
            expect(res.status).eq(400)
            expect(res.body.message).eq("Usuário não encontrado")
        })
    })
});