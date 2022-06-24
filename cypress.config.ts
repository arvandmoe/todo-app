import { defineConfig } from "cypress";
const fs = require("fs")

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        resetdb() {
          fs.copyFile('db-backup.json', 'db.json', (err: any) => {
            if (err) throw err;
            console.log('db-backup.json was copied to db.json');
          })
          return null
        }
      })
    },
  },
});
