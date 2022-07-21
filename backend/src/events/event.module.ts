import { Module } from '@nestjs/common';
import { EventsGateway } from './event.gateway';
@Module({
  exports: [EventsGateway],
})
export class EventsModule {}