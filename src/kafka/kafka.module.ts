import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0, // Cache never expires
      max: 100, // Maximum number of items in cache
    }),
  ],
  controllers: [KafkaController],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {} 