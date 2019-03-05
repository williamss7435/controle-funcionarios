var express = require('express');
var router = express.Router();

var employee = require("./../src/services/Employees");
var users = require('./../src/users');

var jwt = require('jsonwebtoken');
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "*");
  next();
  
})

router.post('/login', (req, res, next) => {

  users.loginIn(req.body.login, req.body.password).then(name => {
    let token = jwt.sign({
      sub: name,
      iss: "wss"
    }, "project-employees");

    res.send({
      name,
      token: token
    })


  }).catch(error => {
    res.send({
      error
    })
  });

});

router.use((req, res, next) => {
  console.log(req.headers.authorization);
  if(!req.headers.authorization)
    res.send("Não Autorizado");
  else{
    jwt.verify(req.headers.authorization, 'project-employees', (error, decode) => {

      if(error)
        res.send(error);
      else{
        next();
      }

    });
  }

});

router.put('/employees', (req, res, next) => {
  
  employee.save(req.body.employee).then(results => {

    res.send(results);

  }).catch(error => {

    res.send(error);

  });

});

router.post('/search-employees', (req, res, next) => {

  let field = (req.body.field) ? req.body.field : "";

  employee.search(req.body.search, field).then(result => {
    res.send(result);
  }).catch(error => {
    res.send(error)
  });

});

router.post('/employees', (req, res, next) => {

  employee.edit(req.body).then(result => {
    res.send(result);
  }).catch(error => {
    res.send(error);
  });

});

router.delete('/employees/:id', (req, res, next) => {

  employee.demiss(req.params.id).then(result => {

    res.send(result);

  }).catch(error => {

    res.send(error);
    
  })

});

router.post('/statistics', (req, res, next) => {

  employee.statistics(req.body.type).then(result => {

    res.send(result);

  }).catch(error => {

    res.send(error);
      
  })

});

module.exports = router;
