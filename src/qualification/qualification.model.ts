import * as crypto from 'crypto';
import { AggregateRoot } from '@nestjs/cqrs';
import { QualificationCreatedEvent } from './qualification-created.event';

export class Qualification extends AggregateRoot {
  public readonly id: string;
  public readonly buyerId: string;
  public readonly merchantId: string;
  public readonly token: string;

  constructor(attributes: QualificationAttributes) {
    super();
    this.id = attributes.id || crypto.randomUUID();
    this.token = attributes.token || crypto.randomUUID();
    this.buyerId = attributes.buyerId;
    this.merchantId = attributes.merchantId;
  }

  create({ status }: QualificationCreateInput) {
    this.apply(
      new QualificationCreatedEvent(
        this.id,
        this.buyerId,
        this.merchantId,
        status,
      ),
    );
  }
}

export interface QualificationAttributes {
  buyerId: string;
  id?: string;
  merchantId: string;
  token?: string;
}

export interface QualificationCreateInput {
  status: string;
}
