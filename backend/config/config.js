import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  apiSports: {
    key: process.env.API_SPORTS_KEY,
    host: process.env.API_SPORTS_HOST || 'v3.football.api-sports.io',
    baseUrl: 'https://v3.football.api-sports.io'
  },
  
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/stack'
  },
  
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined
  },
  
  cache: {
    ttlLive: parseInt(process.env.CACHE_TTL_LIVE) || 300,
    ttlFixtures: parseInt(process.env.CACHE_TTL_FIXTURES) || 3600,
    ttlStandings: parseInt(process.env.CACHE_TTL_STANDINGS) || 21600
  },
  
  rateLimiting: {
    maxRequestsPerHour: parseInt(process.env.MAX_REQUESTS_PER_HOUR) || 100,
    scrapingIntervalMinutes: parseInt(process.env.SCRAPING_INTERVAL_MINUTES) || 5
  },
  
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
  }
};
