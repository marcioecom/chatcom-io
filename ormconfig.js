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
    process.env.MIGRATIONS
  ],
  "entities": [
    process.env.ENTITIES
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
