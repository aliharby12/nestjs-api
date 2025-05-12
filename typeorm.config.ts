import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import * as path from 'path'

config({ path: path.resolve(process.cwd(), '.env') })

const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
})
