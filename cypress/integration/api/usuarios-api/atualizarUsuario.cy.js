import usuarios from "../../../fixtures/factories/usuario";

describe('Teste de API na rota PUT de usuários', () => {

    it('Deve atualizar o usuário com sucesso', () => {
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
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Deve criar um usuário novo caso o id do usuário não seja encontrado', () => {
        let usuario = usuarios.usuarioData()
        let idNaoEncontrado = '0uxuPY0cbmQhpQa1'
        cy.atualizarUsuario(idNaoEncontrado, usuario).then(res => {
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
        })
    })

    it('Não deve atualizar usuário com email já cadastrado', () => {
        let usuario = usuarios.usuarioData()
        let usuarioPut = usuarios.usuarioData()
        let id = '0uxuPY0cbmQhpQa1'

        cy.cadastrarUsuario(usuario).then(res => {
            let usuarioId = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let email = usuario.email
            usuarioPut.email = email
            cy.log(JSON.stringify(usuarioPut))
            cy.atualizarUsuario(id, usuarioPut).then(res => {
                expect(res.status).eq(400)
                expect(res.body.message).eq('Este email já está sendo usado')
            })
            cy.deletarUsuario(usuarioId).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar usuário com o campo nome em branco ou nulo', () => {
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
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar usuário com o campo email em branco ou nulo', () => {
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
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar usuário com o campo password em branco ou nulo', () => {
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
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar usuário com o campo administrador em branco ou nulo', () => {
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
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar usuário com o campo nome diferente de string', () => {
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
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar usuário com o campo email diferente de string', () => {
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
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar usuário com o campo password diferente de string', () => {
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
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar usuário com o campo administrador diferente de string', () => {
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
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar usuário com o campo email inválido', () => {
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
            cy.deletarUsuario(id).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })
});