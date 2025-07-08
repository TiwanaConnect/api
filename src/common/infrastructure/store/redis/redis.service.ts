// import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { createClient, RedisClientType } from 'redis';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class RedisService implements OnModuleInit, OnModuleDestroy {
//   constructor(private readonly configService: ConfigService) {}
//   private client: RedisClientType;

//   async onModuleInit() {
//     this.client = createClient({
//       url: this.configService.get<string>('redis.uri'),
//     });

//     this.client.on('error', (err) => {
//       console.error('❌ Redis Client Error', err);
//     });

//     await this.client.connect();
//     console.log('✅ Connected to Redis');
//   }

//   async onModuleDestroy() {
//     await this.client?.quit();
//     console.log('🛑 Disconnected from Redis');
//   }

//   getClient(): RedisClientType {
//     return this.client;
//   }

//   // 🔧 Utility Methods
//   async set(key: string, value: string, ttlInSec?: number) {
//     if (ttlInSec) {
//       await this.client.set(key, value, { EX: ttlInSec });
//     } else {
//       await this.client.set(key, value);
//     }
//   }

//   async get(key: string): Promise<string | null> {
//     return await this.client.get(key);
//   }

//   async del(key: string) {
//     await this.client.del(key);
//   }
// }
