const Message = require('../model/message.schema.js');

const getAll = (req, res, next) => {
    let result = Message.findAll();
    res.status(200).json(result);
}


const getById = async (req, res, next) => {
    let result = await Message.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(result);
}

const create = async (req, res, next) => {
    try {
        let result = await Message.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.payload.id});
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const update = (req, res, next) => {
    if(productToUpdate.userId !== req.payload.id){
        res.status(403).json({error: "You cannot change this product"});
    }
    let result = Message.updateOne(req.body, { id: req.params.id });
    res.status(201).json(result);
}

const remove = (req, res, next) => {
    if(productToUpdate.userId !== req.payload.id){
        res.status(403).json({error: "You cannot change this product"});
    }
    let result = Message.remove(req.params.id);
    res.status(200).json(result);
}

module.exports = { getAll, create, getById, update, remove };