import produtos from "../../../fixtures/factories/produto";
import usuarios from "../../../fixtures/factories/usuario"
import produtosArr from "../../../fixtures/produtos.json"

describe('Teste de API na rota PUT de produtos', () => {
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

    it('Deve atualizar o produto com sucesso', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let descricao = 'Descricao atualizada'
            produto.descricao = descricao
            cy.atualizarProduto(id, token, produto).then(res => {
                expect(res.status).eq(200)
                expect(produto.descricao).eq(descricao)
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Deve cadastrar um produto caso não encontre o id', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let idProduto = res.body._id
            let id = 'guifODIlXsqxNFS2'
            let novoProduto = produtos.produtoData()
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.atualizarProduto(id, token, novoProduto).then(res => {
                let idNovoProduto = res.body._id
                expect(res.status).eq(201)
                expect(res.body.message).eq('Cadastro realizado com sucesso')
                cy.deletarProduto(idNovoProduto, token).then(res => {
                    expect(res.status).eq(200)
                    expect(res.body.message).eq('Registro excluído com sucesso')
                })
            })
            cy.deletarProduto(idProduto, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar o produto com o mesmo nome de outro já cadastrado', () => {
        let produto = produtos.produtoData()
        let produtoCadastrado = produtos.produtoData()
        cy.cadastrarProduto(token, produtoCadastrado).then(res => {
            let idProduto1 = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.cadastrarProduto(token, produto).then(res => {
                let novoProduto = produtos.produtoData()
                let nomeIgual = produtoCadastrado.nome
                novoProduto.nome = nomeIgual
                let id = res.body._id
                expect(res.body.message).eq('Cadastro realizado com sucesso')
                cy.atualizarProduto(id, token, novoProduto).then(res => {
                    expect(res.status).eq(400)
                    expect(res.body.message).eq('Já existe produto com esse nome')

                    cy.deletarProduto(idProduto1, token).then(res => {
                        expect(res.status).eq(200)
                        expect(res.body.message).eq('Registro excluído com sucesso')
                    })
                    cy.deletarProduto(id, token).then(res => {
                        expect(res.status).eq(200)
                        expect(res.body.message).eq('Registro excluído com sucesso')
                    })
                })
            })
        })
    })

    it('Não deve atualizar o produto com o token inválido', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let novoProduto = produtos.produtoData()
            let id = res.body._id
            let tkn = 'souInvalidoASEHJKGF'
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.atualizarProduto(id, tkn, novoProduto).then(res => {
                expect(res.status).eq(401)
                expect(res.body.message).eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar o produto com o usuário sem permissão de administrador', () => {
        let produto = produtos.produtoData()
        let usuario = usuarios.usuarioData()
        let adm = "true"
        usuario.administrador = adm

        cy.cadastrarUsuario(usuario).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.token(usuario.email, usuario.password).then(res => {
                let tkn = res
                cy.cadastrarProduto(tkn, produto).then(res => {
                    let idProduto = res.body._id
                    expect(res.status).eq(201)
                    expect(res.body.message).eq('Cadastro realizado com sucesso')
                    usuario.administrador = "false"
                    cy.atualizarUsuario(id, usuario).then(res => {
                        expect(res.status).eq(200)
                        expect(res.body.message).eq('Registro alterado com sucesso')
                        let novoProduto = produtos.produtoData()
                        cy.atualizarProduto(idProduto, tkn, novoProduto).then(res => {
                            expect(res.status).eq(403)
                            expect(res.body.message).eq('Rota exclusiva para administradores')
                        })
                    })
                    cy.deletarUsuario(id).then(res => {
                        expect(res.status).eq(200)
                        expect(res.body.message).eq('Registro excluído com sucesso')
                    })
                    cy.deletarProduto(idProduto, token).then(res => {
                        expect(res.status).eq(200)
                        expect(res.body.message).eq('Registro excluído com sucesso')
                    })
                })
            })

        })
    })

    it('Não deve atualizar o produto com o campo nome nulo', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            let novoProduto = produtos.produtoData()
            let nomeNulo = ''
            novoProduto.nome = nomeNulo
            cy.atualizarProduto(id, token, novoProduto).then(res => {
                expect(res.status).eq(400)
                expect(res.body.nome).eq('nome não pode ficar em branco')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar o produto com o campo preço nulo', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let novoProduto = produtos.produtoData()
            let precoNulo = ''
            novoProduto.preco = precoNulo
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.atualizarProduto(id, token, novoProduto).then(res => {
                expect(res.status).eq(400)
                expect(res.body.preco).eq('preco deve ser um número')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar o produto com o campo descrição nulo', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let novoProduto = produtos.produtoData()
            let descNulo = ''
            novoProduto.descricao = descNulo
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.atualizarProduto(id, token, novoProduto).then(res => {
                expect(res.status).eq(400)
                expect(res.body.descricao).eq('descricao não pode ficar em branco')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar o produto com o campo quantidade nulo', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let novoProduto = produtos.produtoData()
            let qntdNulo = ''
            novoProduto.quantidade = qntdNulo
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.atualizarProduto(id, token, novoProduto).then(res => {
                expect(res.status).eq(400)
                expect(res.body.quantidade).eq('quantidade deve ser um número')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar o produto sem o campo nome', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.atualizarProduto(id, token, produtosArr[0]).then(res => {
                expect(res.status).eq(400)
                expect(res.body.nome).eq('nome é obrigatório')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar o produto sem o campo preço', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.atualizarProduto(id, token, produtosArr[1]).then(res => {
                expect(res.status).eq(400)
                expect(res.body.preco).eq('preco é obrigatório')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar o produto sem o campo descrição', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            cy.log(JSON.stringify(res))
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.atualizarProduto(id, token, produtosArr[2]).then(res => {
                expect(res.status).eq(400)
                expect(res.body.descricao).eq('descricao é obrigatório')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })

    it('Não deve atualizar o produto sem o campo quantidade', () => {
        let produto = produtos.produtoData()
        cy.cadastrarProduto(token, produto).then(res => {
            let id = res.body._id
            expect(res.status).eq(201)
            expect(res.body.message).eq('Cadastro realizado com sucesso')
            cy.atualizarProduto(id, token, produtosArr[3]).then(res => {
                expect(res.status).eq(400)
                expect(res.body.quantidade).eq('quantidade é obrigatório')
            })
            cy.deletarProduto(id, token).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro excluído com sucesso')
            })
        })
    })
});