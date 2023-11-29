export class CreateQualificationCommand {
  constructor(readonly input: CreateQualificationCommandInput) {}
}

export interface CreateQualificationCommandInput {
  readonly buyerId: string;
  readonly merchantId: string;
  readonly status: string;
  readonly sendInviteEmail: boolean;
  readonly requestedAmountInCents: number | null;
}
