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
