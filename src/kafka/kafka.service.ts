import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaService implements OnModuleInit {
  private topics: string[] = [];

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const topicsEnv = this.configService.get<string>('KAFKA_TOPICS', '');
    this.topics = topicsEnv.split(',').map(t => t.trim()).filter(Boolean);

    this.topics.forEach(topic => {
      this.kafkaClient.subscribeToResponseOf(topic);
      this.initializeTopicCounter(topic);
    });
  }

  private async initializeTopicCounter(topic: string) {
    const count = await this.cacheManager.get<number>(topic);
    if (count === undefined) {
      await this.cacheManager.set(topic, 0);
    }
  }

  async incrementMessageCount(topic: string): Promise<number> {
    const currentCount = await this.cacheManager.get<number>(topic) || 0;
    const newCount = currentCount + 1;
    await this.cacheManager.set(topic, newCount);
    return newCount;
  }

  async getMessageCount(topic: string): Promise<number> {
    return await this.cacheManager.get<number>(topic) || 0;
  }

  async getAllTopicsCount(): Promise<Record<string, number>> {
    const counts: Record<string, number> = {};
    for (const topic of this.topics) {
      counts[topic] = await this.getMessageCount(topic);
    }
    return counts;
  }
} 