import { defineConfig } from "cypress";
import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  e2e: {
    setupNodeEvents(_, config) {
      config.env = process.env
      return config
    },
    experimentalStudio: true,
    baseUrl: 'http://localhost:5173',
  },
  env: {
    auth0_domain: 'dev-n5rdb5xcsb4ya1cg.us.auth0.com',
  },
});
