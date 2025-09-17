import usuarios from "../../../fixtures/factories/usuario";
import usuariosArr from "../../../fixtures/usuarios.json"

describe('Teste de API na rota POST de usuarios', () => {

    it('Deve cadastrar um usuário', () => {
        let usuario = usuarios.usuarioData()
        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq("Cadastro realizado com sucesso")
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve cadastrar usuário com email já cadastrado', () => {
        let usuario = usuarios.usuarioData()
        let emailRepetido = "fulano@qa.com"
        usuario.email = emailRepetido
        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).eq(400)
            expect(res.body.message).eq("Este email já está sendo usado")
        })
    })

    it('Não deve cadastrar usuário com o campo nome vazio', () => {
        let usuario = usuarios.usuarioData()
        let nomeVazio = ""
        usuario.nome = nomeVazio
        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).eq(400)
            expect(res.body.nome).eq("nome não pode ficar em branco")
        })
    })

    it('Não deve cadastrar usuário com o campo email vazio', () => {
        let usuario = usuarios.usuarioData()
        let emailVazio = ""
        usuario.email = emailVazio
        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).eq(400)
            expect(res.body.email).eq("email não pode ficar em branco")
        })
    })

    it('Não deve cadastrar usuário com o campo password vazio', () => {
        let usuario = usuarios.usuarioData()
        let pdwVazio = ""
        usuario.password = pdwVazio
        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).eq(400)
            expect(res.body.password).eq("password não pode ficar em branco")
        })
    })

    it('Não deve cadastrar usuário com o campo administrador vazio', () => {
        let usuario = usuarios.usuarioData()
        let admVazio = ""
        usuario.administrador = admVazio
        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).eq(400)
            expect(res.body.administrador).eq("administrador deve ser 'true' ou 'false'")
        })
    })

    it('Não deve cadastrar usuário com email inválido', () => {
        let usuario = usuarios.usuarioData()
        let emailInvalido = "estouinvalido.com.br"
        usuario.email = emailInvalido
        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).eq(400)
            expect(res.body.email).eq("email deve ser um email válido")
        })
    })

    it('Não deve cadastrar usuário com o campo nome diferente de string', () => {
        let usuario = usuarios.usuarioData()
        let nomeNull = null
        usuario.nome = nomeNull
        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).eq(400)
            expect(res.body.nome).eq("nome deve ser uma string")
        })
    })

    it('Não deve cadastrar usuário com o campo email diferente de string', () => {
        let usuario = usuarios.usuarioData()
        let emailNull = null
        usuario.email = emailNull
        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).eq(400)
            expect(res.body.email).eq("email deve ser uma string")
        })
    })

    it('Não deve cadastrar usuário com o campo password diferente de string', () => {
        let usuario = usuarios.usuarioData()
        let pdwNull = null
        usuario.password = pdwNull
        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).eq(400)
            expect(res.body.password).eq("password deve ser uma string")
        })
    })

    it('Não deve cadastrar usuário com o campo administrador diferente de string', () => {
        let usuario = usuarios.usuarioData()
        let admNull = null
        usuario.administrador = admNull
        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).eq(400)
            expect(res.body.administrador).eq("administrador deve ser 'true' ou 'false'")
        })
    })

    it('Não deve cadastrar usuário sem o campo nome', () => {
        cy.cadastrarUsuario(usuariosArr[0]).then(res => {
            expect(res.status).eq(400)
            expect(res.body.nome).eq("nome é obrigatório")
        })
    })

    it('Não deve cadastrar usuário sem o campo email', () => {
        cy.cadastrarUsuario(usuariosArr[1]).then(res => {
            expect(res.status).eq(400)
            expect(res.body.email).eq("email é obrigatório")
        })
    })

    it('Não deve cadastrar usuário sem o campo password', () => {
        cy.cadastrarUsuario(usuariosArr[2]).then(res => {
            expect(res.status).eq(400)
            expect(res.body.password).eq("password é obrigatório")
        })
    })
    
    it('Não deve cadastrar usuário sem o campo administrador', () => {
        cy.cadastrarUsuario(usuariosArr[3]).then(res => {
            expect(res.status).eq(400)
            expect(res.body.administrador).eq("administrador é obrigatório")
        })
    })
});