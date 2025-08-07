import usuarios from "../../../fixtures/factories/usuario";

describe('Teste de api na rota PUT de usuarios', () => {

    it('Deve atualizar o usuario com sucesso', () => {
        let usuario = usuarios.usuarioData()
        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let novoNome = 'nome alterado'
            usuario.nome = novoNome
            cy.atualizarUsuario(id, usuario).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro alterado com sucesso')
            })
        })
    })

    it('Deve criar um usuario novo caso o id do usuario não for encontrado', () => {
        let usuario = usuarios.usuarioData()
        let idNaoEncontrado = '0uxuPY0cbmQhpQa1'
        cy.atualizarUsuario(idNaoEncontrado, usuario).then(res => {
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
        })
    })

    it('Não deve atualizar o email do usuario se o mesmo já estiver cadastrado', () => {
        let usuario = usuarios.usuarioData()
        let usuarioPut = usuarios.usuarioData()
        let id = '0uxuPY0cbmQhpQa1'

        cy.cadastrarUsuario(usuario).then(res => {
            cy.log(JSON.stringify(usuario))
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let email = usuario.email
            usuarioPut.email = email
            cy.log(JSON.stringify(usuarioPut))
            cy.atualizarUsuario(id, usuarioPut).then(res => {
                expect(res.status).eq(400)
                expect(res.body.message).eq('Este email já está sendo usado')
            })
        })
    })

    it('Não deve atualizar com o campo nome em branco/nulo', () => {
        let usuario = usuarios.usuarioData()
        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let nomeNull = ''
            usuario.nome = nomeNull
            cy.atualizarUsuario(id, usuario).then(res => {
                expect(res.status).eq(400)
                expect(res.body.nome).eq('nome não pode ficar em branco')
            })
        })
    })

    it('Não deve atualizar com o campo email em branco/nulo', () => {
        let usuario = usuarios.usuarioData()
        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let emailNull = ''
            usuario.email = emailNull
            cy.atualizarUsuario(id, usuario).then(res => {
                expect(res.status).eq(400)
                expect(res.body.email).eq('email não pode ficar em branco')
            })
        })
    })

    it('Não deve atualizar com o campo password em branco/nulo', () => {
        let usuario = usuarios.usuarioData()
        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let pwdNull = ''
            usuario.password = pwdNull
            cy.atualizarUsuario(id, usuario).then(res => {
                expect(res.status).eq(400)
                expect(res.body.password).eq('password não pode ficar em branco')
            })
        })
    })

    it('Não deve atualizar com o campo administrador em branco/nulo', () => {
        let usuario = usuarios.usuarioData()
        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let admNull = ''
            usuario.administrador = admNull
            cy.atualizarUsuario(id, usuario).then(res => {
                expect(res.status).eq(400)
                expect(res.body.administrador).eq("administrador deve ser 'true' ou 'false'")
            })
        })
    })

    it('Não deve atualixar com o campo nome diferente de string', () => {
        let usuario = usuarios.usuarioData()
        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let nomeNull = null
            usuario.nome = nomeNull
            cy.atualizarUsuario(id, usuario).then(res => {
                expect(res.status).eq(400)
                expect(res.body.nome).eq('nome deve ser uma string')
            })
        })
    })

    it('Não deve atualixar com o campo email diferente de string', () => {
        let usuario = usuarios.usuarioData()
        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let emailNull = null
            usuario.email = emailNull
            cy.atualizarUsuario(id, usuario).then(res => {
                expect(res.status).eq(400)
                expect(res.body.email).eq('email deve ser uma string')
            })
        })
    })

    it('Não deve atualixar com o campo password diferente de string', () => {
        let usuario = usuarios.usuarioData()
        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let pdwNull = null
            usuario.password = pdwNull
            cy.atualizarUsuario(id, usuario).then(res => {
                expect(res.status).eq(400)
                expect(res.body.password).eq('password deve ser uma string')
            })
        })
    })

    it('Não deve atualixar com o campo administrador diferente de string', () => {
        let usuario = usuarios.usuarioData()
        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let admNull = null
            usuario.administrador = admNull
            cy.atualizarUsuario(id, usuario).then(res => {
                expect(res.status).eq(400)
                expect(res.body.administrador).eq("administrador deve ser 'true' ou 'false'")
            })
        })
    })
      
    it('Não deve atualizar com o campo email invalido', () => {
         let usuario = usuarios.usuarioData()
        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let emailInvalido = 'guilherme.qa.com.br'
            usuario.email = emailInvalido
            cy.atualizarUsuario(id, usuario).then(res => {
                expect(res.status).eq(400)
                expect(res.body.email).eq('email deve ser um email válido')
            })
        })
    })
});