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

Cypress.Commands.add('cadastrarCarrinhoDuplicado', (token, data, data2) => {
    cy.request({
        "method": "POST",
        "url": "carrinhos",
        "headers": { authorization: token },
        "body": {
            "produtos": [
                data,
                data2
            ]
        },
        "failOnStatusCode": false
    })
})

Cypress.Commands.add('concluirCompra', (token)=>{
        cy.request({
        "method": "DELETE",
        "url": "carrinhos/concluir-compra",
        "headers": { authorization: token },
        "failOnStatusCode": false
    })
})