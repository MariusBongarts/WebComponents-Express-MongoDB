import { MongoClient } from 'mongodb';
import { Express } from 'express';
import { MongoGenericDAO } from './models/mongo-generic.dao';
import { Trailer } from './models/trailer';
import { User } from './models/user';
import { InMemoryGenericDAO } from './models/in-memory-generic.dao';

const dbname = process.env.MONGO_INITDB_DATABASE as string;

export default async function startDB(app: Express, dbms = 'mongodb') {
  switch (dbms) {
    case 'mongodb':
      startMongoDB(app);
      break;
    case 'in-memory-db':
      startInMemoryDB(app);
  }
}

async function startMongoDB(app: Express) {
  const db = (await connectToMongoDB())!.db(dbname);
  app.locals.trailerDAO = new MongoGenericDAO<Trailer>(db, 'trailers');
  app.locals.userDAO = new MongoGenericDAO<User>(db, 'users');
}

function startInMemoryDB(app: Express) {
  app.locals.taskDAO = new InMemoryGenericDAO<Trailer>();
  app.locals.userDAO = new InMemoryGenericDAO<User>();
}

async function connectToMongoDB() {
  console.warn(process.env.MONGO_USER);
  const mongoUser = process.env.MONGO_USER as string;
  const mongoPassword = process.env.MONGO_PASSWORD as string;
  const url = `mongodb://app-mongodb:27017/${dbname}`;
  const options = {
    useNewUrlParser: true,
    auth: { user: mongoUser, password: mongoPassword },
    authSource: 'app'
  };
  try {
    return await MongoClient.connect(url, options);
  } catch (err) {
    console.log('Could not connect to MongoDB: ', err.stack);
    process.exit(1);
  }
}
