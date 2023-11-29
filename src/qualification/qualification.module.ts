import { Module } from '@nestjs/common';
import { QualificationService } from './qualification.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateQualificationHandler } from './create-qualification.handler';
import { CreateInitialRequirements } from './event-handlers/create-initial-requirements';
import { EventSourcingModule } from '../event-sourcing/event-sourcing.module';
import { UpdateQualificationProjection } from './event-handlers/update-qualification-projection';
import { SendQualificationInvite } from './event-handlers/send-qualification-invite';

@Module({
  imports: [CqrsModule, EventSourcingModule],
  providers: [
    QualificationService,
    CreateQualificationHandler,
    UpdateQualificationProjection,
    CreateInitialRequirements,
    SendQualificationInvite,
  ],
  exports: [QualificationService],
})
export class QualificationModule {}
