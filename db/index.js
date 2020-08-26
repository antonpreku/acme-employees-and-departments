const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_employee');

const Departments = conn.define('Departments', {
  Department: {
    type: STRING
  }
});
const Employees = conn.define('Employees', {
  Employee: {
    type: STRING
  }
});

Departments.hasMany(Employees,{foreignKey:'departmentId'})

const syncAndSeed = async()=> {
    await conn.sync({ force: true });
    const depatmentOne = facer.create(department)
    const [Computers, Shoes, Home] = await Promise.all([
    Departments.create({Department:'Computers'}),
    Departments.create({Department: 'Shoes'}),
    Departments.create({Department:'Home'})
  ])
    const [moe, lucy, Telarry, ethyl] = await Promise.all([
    Employees.create({Employee:'moe'}),
    Employees.create({Employee:'lucy'}),
    Employees.create({Employee:'Telarry'}),
    Employees.create({Employee:'ethyl'})
    ])

    lucy.departmentId = Computers.id;
    moe.departmentId = Shoes.id;
    Telarry.departmentId = Home.id;
    ethyl.departmentId = Home.id;

    await Promise.all([
      moe.save(),
      lucy.save(),
      ethyl.save(),
      Telarry.save()
    ]);
};


module.exports = {
  models: {
    Departments,
    Employees
  },
  syncAndSeed
};
