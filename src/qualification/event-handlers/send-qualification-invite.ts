import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QualificationCreatedEvent } from '../qualification-created.event';
import { EventProcessingService } from '../../event-sourcing/event-processing.service';

@EventsHandler(QualificationCreatedEvent)
export class SendQualificationInvite
  implements IEventHandler<QualificationCreatedEvent>
{
  constructor(
    private readonly eventProcessingService: EventProcessingService,
  ) {}

  async handle(event: QualificationCreatedEvent) {
    this.eventProcessingService.processEvent(
      event.id,
      this.constructor.name,
      async () => {
        console.log(event);
        throw new Error("I'm an error");
      },
    );
  }
}
