Cypress.Commands.add('listarCarrinho', () => {
    cy.request({
        "method": "GET",
        "url": "carrinhos",
        "failOnStatusCode": false
    })
})

Cypress.Commands.add('cadastrarCarrinho', (token, data) => {
    cy.request({
        "method": "POST",
        "url": "carrinhos",
        "headers": { authorization: token },
        "body": {
            "produtos": [
                data
            ]
        },
        "failOnStatusCode": false
    })
})

Cypress.Commands.add('listarCarrinhoId', (id) => {
    cy.request({
        "method": "GET",
        "url": `carrinhos/${id}`,
        "failOnStatusCode": false
    })
})