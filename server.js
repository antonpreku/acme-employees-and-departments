
const db = require('./db/index.js');
const { Cars, Elements,Types } = db.models;
const express = require('express');
const app = express();
const path = require('path');

app.use(require('body-parser').json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, './index.html')));


app.get('/api', async (req,res,next)=>{
    try{
        const data= await Cars.findAll()
        res.send(data)
    }catch (err){
        next(err)
    }
})
app.get('/cartype/:carId', async (req,res,next)=>{
    try{
        const data= await Types.findAll({
            where:{
                carId: req.params.carId
            }
        })
        res.send(data)
    }catch (err){
        next(err)
    }
})
app.get('/types', async (req,res,next)=>{
    try{
        const data= await Elements.findAll()
        res.send(data)
    }catch (err){
        next(err)
    }
})

app.get('/:typeId/elements', async(req,res,next)=>{
    try{
        const data= await Elements.findAll({
            where:{
                typeId: req.params.typeId
            }
        })
        res.send(data)
    }catch (err){
        next(err)
    }
})
app.post('/new/car', async(req,res,next)=>{
    try{
        const data= await Cars.create({name: req.body.name});
        res.status(201).send(data)
    }catch (err){
        next(err)
    }
})

app.post('/new/type', async(req,res,next)=>{
    try{
        const data= await Types.create({make: req.body.make, carId: req.body.carId});
        res.status(201).send(data)
    }catch (err){
        next(err)
    }
})
app.post('/new/type/info', async(req,res,next)=>{
    try{
        const data= await Elements.create({data: req.body.data, typeId: req.body.typeId});
        res.status(201).send(data)
    }catch (err){
        next(err)
    }
})

const init = async()=> {
    try {
    //   await db.syncAndSeed();
      const port = process.env.PORT || 6633;
      app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
      console.log(ex);
    }
  };

  init();