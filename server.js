const db = require('./db/index.js');
const { Departments, Employees } = db.models;
const express = require('express');
const app = express();
const path = require('path');

app.use(require('body-parser').json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));


app.get('/api', async (req,res,next)=>{
    try{
        const data= await Departments.findAll()
        res.send(data)
    }catch (err){
        next(err)
    }
})

app.get('/:departmentid/employees', async(req,res,next)=>{
    try{
        const data= await Employees.findAll({
            where:{
                departmentId: req.params.departmentid
            }
        })
        res.send(data)
    }catch (err){
        next(err)
    }
})

// app.delete('/api/friends/:id', async (req, res, next)=> {
//     try {
//       const friend = await Friend.findByPk(req.params.id);
//       await friend.destroy();
//       res.sendStatus(204);
//     }
//     catch(ex){
//       next(ex);
//     }
//   });
  
//   app.post('/api/friends', async (req, res, next)=> {
//     try {
//       res.send(await Friend.create({ name: faker.name.firstName() }));
//     }
//     catch(ex){
//       next(ex);
//     }
//   });


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