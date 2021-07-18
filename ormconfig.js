module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  },
  "migrations": [
    "./dist/database/migrations/**.js"
  ],
  "entities": [
    "./dist/entities/**.js"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
