/*single prisma client instance*/

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});//a connection pool to manage multiple db connections


const adapter = new PrismaPg(pool);//the adapter that uses the pool to enable the client to connect to a postgresql driver


const prisma = new PrismaClient({
  adapter,
});//the object that my application will be using to connect to the database


export default prisma;
