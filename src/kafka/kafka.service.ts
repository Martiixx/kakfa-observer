import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async onModuleInit() {
    // Subscribe to all topics
    const topics = ['your-topic-1', 'your-topic-2']; // Add your topics here
    topics.forEach(topic => {
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
    const topics = ['your-topic-1', 'your-topic-2']; // Add your topics here
    const counts: Record<string, number> = {};
    
    for (const topic of topics) {
      counts[topic] = await this.getMessageCount(topic);
    }
    
    return counts;
  }
} 