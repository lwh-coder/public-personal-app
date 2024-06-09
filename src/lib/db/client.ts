import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise: Promise<MongoClient> | undefined;

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local');
}

// Extend the global object to include _mongoClientPromise
declare global {
  namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient>;
    }
  }
}

// Ensure global._mongoClientPromise is declared


const globalNode = global as typeof global & { _mongoClientPromise?: Promise<MongoClient> };

if (process.env.NODE_ENV === 'development') {
  // Development specific logic (replace with your implementation)
  if (!globalNode._mongoClientPromise) {
    client = new MongoClient(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as MongoClientOptions);
    globalNode._mongoClientPromise = client.connect();
  }
  clientPromise = globalNode._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as MongoClientOptions); // Add 'as MongoClientOptions' to specify the type
  clientPromise = client.connect();
}

export default clientPromise;
