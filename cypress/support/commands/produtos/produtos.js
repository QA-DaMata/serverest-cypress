Cypress.Commands.add('listarProdutos', () => {
    cy.request({
        "method": "GET",
        "url": "produtos",
        "failOnStatusCode": false
    })
})

Cypress.Commands.add('cadastrarProduto', (token, data) => {
    cy.request({
        "method": "POST",
        "url": "produtos",
        "headers": { authorization: token },
        "body": data,
        "failOnStatusCode": false
    })
})

Cypress.Commands.add('listarProdutosId', (id) => {
        cy.request({
        "method": "GET",
        "url": `produtos/${id}`,
        "failOnStatusCode": false
    })
})