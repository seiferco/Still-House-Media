import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// load server/.env so DATABASE_URL works
dotenv.config({ path: path.join(__dirname, '.env') })

export const prisma = new PrismaClient()
