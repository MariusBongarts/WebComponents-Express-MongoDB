import express, { Express, Request } from 'express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import * as http from 'http';
import trailers from './routes/trailers';
import users from './routes/users';
import startDB from './db';

const port = 3443;

//const certDir = path.join(__dirname, 'certs');

function configureApp(app: Express) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use((req, res, next) => {
    if (isOriginAllowed(req.get('Origin'))) {
      res.set('Access-Control-Allow-Origin', req.get('Origin'));
      res.set('Access-Control-Allow-Credentials', 'true');
    }
    if (isPreflight(req)) {
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
      res.status(204).end();
    } else {
      next();
    }
  });
  app.use('/api/users', users);
  app.use((req, res, next) => {
    const token = req.cookies['jwt-token'] || '';
    try {
      res.locals.user = jwt.verify(token, 'mysecret');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Bitte melden Sie sich an!' });
    }
  });
  app.use('/api/trailers', trailers);
}

function isPreflight(req: Request) {
  return req.method === 'OPTIONS' && req.get('Origin') && req.get('Access-Control-Request-Method');
}

function isOriginAllowed(origin?: string) {
  return !!origin;
}

async function start() {
  const app = express();

  configureApp(app);
  await startDB(app, process.argv[2]);
  startHttpsServer(app);
}

function startHttpsServer(app: Express) {
  // const options = {
  //   // key: fs.readFileSync(path.join(certDir, 'server.key.pem')),
  //   // cert: fs.readFileSync(path.join(certDir, 'server.cert.pem')),
  //   // ca: fs.readFileSync(path.join(certDir, 'intermediate-ca.cert.pem'))
  // };
  const httpsServer = http.createServer(app);
  httpsServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

start();
