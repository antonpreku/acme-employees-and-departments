const Sequelize = require('sequelize');
const { STRING, BOOLEAN, INTEGER } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/Dealer');

const Cars = db.define('cars', {
  name: {
    type: STRING
  }
});

const Types= db.define('types', {
  make:{
    type: STRING
  }
});

const Elements = db.define('elements', {
  data: {
    type: STRING
  }
});

Cars.hasMany(Types)
Types.hasMany(Elements)

const syncAndSeed = async()=> {
    await db.sync({ force: true });
    const [Honda, BMW , Mercedez]= await Promise.all([    
    Cars.create({name:'Honda'}),
    Cars.create({name:'BMW'}),
    Cars.create({name:'Mercedez'})
  ])
  const [Accord, CRV , CLS,EClass, X6, X5]= await Promise.all([    
    Types.create({make:'Accord',  carId: Honda.id}),
    Types.create({make: 'CRV', carId: Honda.id}),
    Types.create({make:'CLS', carId: Mercedez.id}),
    Types.create({make: 'EClass',  carId: Mercedez.id}),
    Types.create({make:'X6',  carId: BMW.id}),
    Types.create({make:'X5',  carId: BMW.id})
  ])
  await Promise.all([    
    Elements.create({data:'The Honda Accord is a series of automobiles manufactured by Honda since 1976, best known for its four-door sedan variant.',  typeId: Accord.id}),
    Elements.create({data: 'The Honda CR-V is a compact crossover SUV manufactured by Japanese automaker Honda since 1995 and introduced in the North American market in 1997.', typeId: CRV.id}),
    Elements.create({data:'The Mercedes-Benz CLS-Class is a series of executive cars produced by Mercedes-Benz since 2004.', typeId: CLS.id}),
    Elements.create({data: 'The Mercedes-Benz E-Class is a range of executive cars manufactured by German automaker Mercedes-Benz in various engine and body configurations. Produced since 1953.',typeId: EClass.id}),
    Elements.create({data:'The BMW X6 is a mid-size luxury crossover by German automaker BMW.The first generation  was released for sale in April 2008', typeId: X6.id}),
    Elements.create({data:'The BMW E70 is the second-generation BMW X5 mid-size luxury crossover SUV. It replaced the BMW X5 (E53) in July 2006', typeId: X5.id})
  ])
};


module.exports = {
  models: {
    Cars,
    Elements,
    Types
  },
  syncAndSeed
};
