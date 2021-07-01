module.exports = {
  "type": "postgres",
  "host": process.env.HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "migrations": [
    "./src/database/migrations/**.ts",
    "./dist/database/migrations/**.js"
  ],
  "entities": [
    "./src/entities/**.ts",
    "./dist/entities/**.js"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
