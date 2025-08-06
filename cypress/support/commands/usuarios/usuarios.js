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