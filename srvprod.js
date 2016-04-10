import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import conf from './config.json';
import iofn from 'socket.io';
import container from './container';
import srv from './src/server';
import session from 'express-session';
import redisStoreFn from 'connect-redis';


const app         = express();
const server      = http.Server(app);
const io          = iofn(server);
const config      = conf.prod;
const port        = config.port;
const redisStore  = redisStoreFn(session);


/**
 * setup redis session storage
 */
app.use(session({
  secret: config.session.secret,
  // create new redis store.
  store: new redisStore({ 
    host: config.redis.host, 
    port: config.redis.port, 
    client: container.redisClient, 
    ttl: config.session.timeout
  }),
  saveUninitialized: false,
  resave: false
}));


/*
 * setup morgan middleware
 */
app.use(morgan('short'));


/*
 * setup body parser middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/*
 * use ejs as template engine
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));


/*
 * set path for static assets
 */
app.use(express.static(path.join(__dirname, 'content')));


/*
 * main route
 */
app.get('/', (req, res) => {
  if(req.session.key) {
    res.render('index');
  }
  else {
    res.redirect('/authenticate');
  }   
});


/**
 * auth
 */
app.use('/authenticate', srv.routeAuthentication({ models: container.models }));


/**
 * simple socket io test
 */
io.on('connection', function(socket){
  socket.on('MESSAGE', function(msg){
    io.emit('MESSAGE', msg);
  });
});


/**
 * unknown route given. 404
 */
app.use((req, res, next) => {
  res.status(404).render('_404');
});


/**
 * internal error
 */
app.use((error, req, res) => {
  var statusCode = error.statusCode || 500;
  var err = {
    error: statusCode,
    message: error.message
  };
  if (!res.headersSent) {
    res.status(statusCode).send(err);
  }
});


/*
 * listen on port from config
 */
server.listen(port, function () {
  console.log('==> listening on ' + port);
});