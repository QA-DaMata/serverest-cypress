const Joi = require('joi')

const produtoSchema = Joi.object({
    idProduto: Joi.string().required(),
    quantidade: Joi.number().required()
}).unknown(true) // o unknow serve para validar campos extras
export default produtoSchema;