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
    "./dist/database/migrations/**.js",
    "./src/database/migrations/**.ts"
  ],
  "entities": [
    "./dist/entities/**.js",
    "./src/entities/**.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
