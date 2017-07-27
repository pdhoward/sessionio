'use strict';

////////////////////////////////////////////////////
////////  			chaoticbots Interchange      ///////
///////            version 0.5.0            ///////
//////////////////////////////////////////////////
const express =     require('express');
const app = express();
const path =        require('path');
const bodyParser =  require('body-parser');
const cors =        require('cors')
const flash =       require('connect-flash');

//  application components
const routes =      require('../app/routes');
const session =     require('../app/session');
const passport =    require('../app/auth');
const ioServer =    require('../app/socket')(app);
const logger =      require('../app/logger');
const config =      require('../app/config')

// View engine setup
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cors())

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', function(req, res, next){
  console.log('HEARD FROM CHANNELS')
  console.log({method: req.method})
  console.log(JSON.stringify(req.body))
  next()
})

app.use('/', routes);

// Middleware to catch 404 errors
app.use(function(req, res, next) {
  res.status(404).sendFile(process.cwd() + '/app/views/404.htm');
});

ioServer.listen(config.port, () => {
  console.log('Interchange Server listening on port %s', config.port)
});
