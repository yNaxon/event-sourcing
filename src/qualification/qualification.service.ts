import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateQualificationCommand } from './create-qualification.command';

@Injectable()
export class QualificationService {
  constructor(private readonly commandBus: CommandBus) {}

  async createQualification(buyerId: string, merchantId: string) {
    return this.commandBus.execute(
      new CreateQualificationCommand({
        buyerId,
        merchantId,
        sendInviteEmail: false,
        status: 'pending',
        requestedAmountInCents: 1000_00,
      }),
    );
  }
}
