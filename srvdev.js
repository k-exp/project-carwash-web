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
const config      = conf.dev;
const port        = config.srvPort;
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


app.get('/schema', (req, res) => {
  console.log(req.query);
  res.send(JSON.stringify(container.models.user.schema));
});


/**
 * auth
 */
app.use('/authenticate', srv.routeAuthentication(container));


/**
 * customers
 */
app.use('/customer', srv.routeCustomer(container));


/**
 * service
 */
app.use('/service', srv.routeService(container));


/**
 * job
 */
app.use('/job', srv.routeJob(container));


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


/*
 * listen on port from config
 */
server.listen(port, function () {
  console.log('==> listening on ' + port);
});