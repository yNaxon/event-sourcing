import * as crypto from 'crypto';

export class QualificationCreatedEvent {
  public readonly id: string;
  constructor(
    public readonly aggregateId: string,
    public readonly buyerId: string,
    public readonly merchantId: string,
    public readonly status: string,
  ) {
    this.id = crypto.randomUUID();
  }
}
