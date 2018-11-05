const express = require('express');
const router = express.Router();

const Episode = require('../models/Episode');

router.get('/', async (req, res)=>{
    try{
            const episodes = await Episode.find({});
        res.json({
            status: 200,
            data: episodes
        });
    }catch(err){
        res.json({
            status: 500,
            data: err
        })
    }
})

router.get('/:id', async (req, res)=>{
    const episode = await Episode.findById(req.params.id)
    res.json(episode);
})

router.post('/', async (req, res)=>{
    try{
        console.log(req.body);
        console.log("MAKING AN EPISODE OF STAR TREEEEEK");
        const newepisode = await Episode.create(req.body)
        res.json({
            data: newepisode,
            status: 200})
    }catch(err){
        res.json({
            data: err,
            status: 500
        })
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        console.log("BALEETED");
        const deleted = await Episode.findByIdAndDelete(req.params.id);
        console.log(deleted);
        res.json({
            status: 200
        })
    }catch(err){
        res.json({
            status: 500, 
            data: err
        })
    }
})


module.exports = router;