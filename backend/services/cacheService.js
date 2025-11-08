import { createClient } from 'redis';

class CacheService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.initializeRedis();
  }

  async initializeRedis() {
    try {
      const redisUrl = process.env.REDIS_URL;
      
      if (!redisUrl) {
        console.log('⚠️ REDIS_URL no configurado - Cache deshabilitado');
        return;
      }

      this.client = createClient({
        url: redisUrl,
        socket: {
          reconnectStrategy: (retries) => {
            if (retries > 10) {
              console.error('❌ Redis: Máximo de reintentos alcanzado');
              return new Error('Máximo de reintentos alcanzado');
            }
            return Math.min(retries * 100, 3000);
          }
        }
      });

      this.client.on('error', (err) => {
        console.error('❌ Redis error:', err.message);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        console.log('🔄 Conectando a Redis...');
      });

      this.client.on('ready', () => {
        console.log('✅ Redis conectado correctamente');
        this.isConnected = true;
      });

      this.client.on('disconnect', () => {
        console.log('⚠️ Redis desconectado');
        this.isConnected = false;
      });

      await this.client.connect();
    } catch (error) {
      console.error('❌ Error inicializando Redis:', error.message);
      this.isConnected = false;
    }
  }

  async get(key) {
    if (!this.isConnected) return null;

    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error obteniendo de cache:', error.message);
      return null;
    }
  }

  async set(key, value, expirationInSeconds = 300) {
    if (!this.isConnected) return false;

    try {
      await this.client.setEx(
        key,
        expirationInSeconds,
        JSON.stringify(value)
      );
      return true;
    } catch (error) {
      console.error('Error guardando en cache:', error.message);
      return false;
    }
  }

  async del(key) {
    if (!this.isConnected) return false;

    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      console.error('Error eliminando de cache:', error.message);
      return false;
    }
  }
}

export default new CacheService();