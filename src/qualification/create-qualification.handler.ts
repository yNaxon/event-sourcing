import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateQualificationCommand } from './create-qualification.command';
import { Qualification } from './qualification.model';

@CommandHandler(CreateQualificationCommand)
export class CreateQualificationHandler
  implements ICommandHandler<CreateQualificationCommand>
{
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateQualificationCommand) {
    const { buyerId, merchantId, status } = command.input;
    const qualification = this.publisher.mergeObjectContext(
      new Qualification({ buyerId, merchantId }),
    );
    qualification.create({ status });
    qualification.commit();

    return {
      id: qualification.id,
      buyerId: qualification.buyerId,
      merchantId: qualification.merchantId,
      token: qualification.token,
    };
  }
}
