import { Controller, Get, Param } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Get('count/:topic')
  async getTopicCount(@Param('topic') topic: string) {
    return {
      topic,
      count: await this.kafkaService.getMessageCount(topic),
    };
  }

  @Get('counts')
  async getAllCounts() {
    return await this.kafkaService.getAllTopicsCount();
  }
} 