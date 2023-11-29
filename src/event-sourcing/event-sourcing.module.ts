import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreService } from './event-store.service';
import { EventProcessingService } from './event-processing.service';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [EventProcessingService, EventStoreService],
  exports: [EventProcessingService, EventStoreService],
})
export class EventSourcingModule {}
