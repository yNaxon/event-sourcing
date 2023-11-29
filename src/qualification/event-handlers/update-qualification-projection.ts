import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QualificationCreatedEvent } from '../qualification-created.event';
import { EventProcessingService } from '../../event-sourcing/event-processing.service';

@EventsHandler(QualificationCreatedEvent)
export class UpdateQualificationProjection
  implements IEventHandler<QualificationCreatedEvent>
{
  constructor(
    private readonly eventProcessingService: EventProcessingService,
  ) {}

  async handle(event: QualificationCreatedEvent) {
    return this.eventProcessingService.processEvent(
      event.id,
      this.constructor.name,
      async () => {
        console.log(event);
        console.log('do something');
      },
    );
  }
}
