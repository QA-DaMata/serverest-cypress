import { faker } from "@faker-js/faker";

export default {
    produtoData() {
        const nome = faker.commerce.productName()
        const preco = Math.floor(Math.random() * 100)
        const descricao = faker.commerce.productDescription()
        const quantidade = faker.number.int(100)

        return {
            nome: nome,
            preco: preco,
            descricao: descricao,
            quantidade: quantidade
        }
    }
}