# Kafka Observer

A NestJS-based service that monitors Kafka topics and maintains message counts in memory using cache manager.

## Description

Kafka Observer is a microservice that connects to Kafka topics and keeps track of message counts in real-time. It provides REST endpoints to query the current message counts for each topic.

## Features

- Connect to multiple Kafka topics
- Real-time message counting
- In-memory caching of message counts
- REST API for querying message counts
- Environment-based configuration

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Kafka broker running

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd kafka-observer

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

## Configuration

Update the `.env` file with your Kafka configuration:

```env
# Kafka Configuration
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=kafka-observer
KAFKA_GROUP_ID=kafka-observer-group
KAFKA_TOPICS=topic1,topic2,topic3

# Application Configuration
PORT=3000
NODE_ENV=development
```

## Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Get Message Count for a Topic
```http
GET /kafka/count/:topic
```

Response:
```json
{
  "topic": "topic1",
  "count": 42
}
```

### Get Message Counts for All Topics
```http
GET /kafka/counts
```

Response:
```json
{
  "topic1": 42,
  "topic2": 15,
  "topic3": 7
}
```

## Project Structure

```
src/
├── kafka/
│   ├── kafka.module.ts    # Kafka module configuration
│   ├── kafka.service.ts   # Kafka service implementation
│   └── kafka.controller.ts # REST API endpoints
├── app.module.ts          # Main application module
└── main.ts               # Application entry point
```

## Technologies Used

- NestJS
- KafkaJS
- @nestjs/microservices
- @nestjs/cache-manager
- @nestjs/config

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
