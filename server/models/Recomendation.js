const {Schema, model, ObjectId} = require("mongoose")

const Message = new Schema({
    sender: {type: String, required: true },
    name: {type: String},
    number: {type: Number},
    title: {type: String},
    status: {type: String},
    type: {type: String},
    rooms: {type: Number},
    square: {type: Number},
    location: {type: String},
    price: {type: Number},
    content: {type: String},
    image: {type: String},
    moderated: {type: Boolean},
    validation: {type: String},
    likes: { type: Array, default: [] }
})

module.exports = model('Message', Message)