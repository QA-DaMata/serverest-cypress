Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        "method": "POST",
        "url": "login",
        "body": {
            "email": email,
            "password": senha
        },
        "failOnStatusCode": false
    }).then(res => {
        return res.body.authorization
    })
})

Cypress.Commands.add('buscarUsuarios', () => {
    cy.request({
        "method": "GET",
        "url": "usuarios",
        "failOnStatusCode": false
    })
})

Cypress.Commands.add('buscarUsariosId', (id) => {
    cy.request({
        "method": "GET",
        "url": `usuarios/${id}`,
        "failOnStatusCode": false
    })
})

Cypress.Commands.add('cadastrarUsuario', (data) => {
    cy.request({
        "method": "POST",
        "url": "usuarios",
        "body": data,
        "failOnStatusCode": false
    })
})

Cypress.Commands.add('atualizarUsuario', (id, data) => {
    cy.request({
        "method": "PUT",
        "url": `usuarios/${id}`,
        "body": data,
        "failOnStatusCode": false
    })
})

Cypress.Commands.add('deletarUsuario', (id) => {
    cy.request({
        "method": "DELETE",
        "url": `usuarios/${id}`,
        "failOnStatusCode": false
    })
})