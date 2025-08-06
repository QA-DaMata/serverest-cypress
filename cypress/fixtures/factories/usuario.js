import { faker } from "@faker-js/faker";

export default {
    usuarioData() {
        const nome = faker.person.firstName()
        const email = faker.internet.email({ firstName: nome })
        const pwd = 'senha123@'
        const adm = faker.datatype.boolean().toString()

        return {
            nome: nome,
            email: email,
            password: pwd,
            administrador: adm
        }
    }
}