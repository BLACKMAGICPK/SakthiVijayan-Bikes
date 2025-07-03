import { MongoClient } from 'mongodb'

// --- TEMPORARY DEBUGGING STEP ---
// The MongoDB URI is hardcoded here to bypass issues with loading environment variables.
// This is NOT recommended for production. Once the .env.local file issue is resolved,
// this should be reverted to: const uri = process.env.MONGODB_URI
const uri = "mongodb+srv://SakthiVijayan:Sakthivel%402006@sakthivijayan.rudh8iz.mongodb.net/SakthiVijayan?retryWrites=true&w=majority&appName=SakthiVijayan"

const options = {
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!uri) {
  // This check is unlikely to fail now, but we keep it for when we revert the hardcoded value.
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI". Please ensure you have a .env.local file in the root of your project with this variable defined. You may need to restart your development server after creating the file.')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
