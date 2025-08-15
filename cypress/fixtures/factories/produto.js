import { faker } from "@faker-js/faker";

export default {
    produtoData() {
        const nome = faker.commerce.productName() + faker.number.int({ min: 1000000 })
        const preco = Math.floor(Math.random() * 100)
        const descricao = faker.commerce.productDescription()
        const quantidade = faker.number.int(100) + 1

        return {
            nome: nome,
            preco: preco,
            descricao: descricao,
            quantidade: quantidade
        }
    }
}