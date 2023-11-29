import { Injectable } from '@nestjs/common';
import { EventBus, IEvent, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Subject, takeUntil } from 'rxjs';
import { PrismaClient } from '../prisma/prisma.client';

@Injectable()
export class EventStoreService {
  private destroy$ = new Subject<void>();

  constructor(
    private readonly eventBus: EventBus,
    private readonly unhandledExceptionsBus: UnhandledExceptionBus,
    private readonly prismaClient: PrismaClient,
  ) {
    this.eventBus.pipe(takeUntil(this.destroy$)).subscribe(async (event) => {
      await this.store(event as IEvent & { id: string; aggregateId: string });
    });

    this.unhandledExceptionsBus
      .pipe(takeUntil(this.destroy$))
      .subscribe((exceptionInfo) => {
        console.info('unhandled exception');
        console.error(exceptionInfo);
        return;
      });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async store(event: IEvent & { id: string; aggregateId: string }) {
    console.log({ event });
    const { aggregateId, id, ...data } = event;
    await this.prismaClient.event.create({
      data: {
        id,
        data,
        aggregateId,
        name: event.constructor.name,
      },
    });
  }

  public async getEvents() {
    const records = await this.prismaClient.event.findMany();
    const attempts = (
      await this.prismaClient.eventProcessingAttempt.findMany({
        where: {
          eventId: {
            in: Array.from(new Set(records.map((record) => record.id))),
          },
        },
      })
    ).reduce((acc, attempt) => {
      return {
        ...acc,
        [attempt.eventId]: [...(acc[attempt.eventId] || []), attempt],
      };
    }, {});

    return records.map((record) => ({
      ...record,
      processingAttempts: attempts[record.id],
    }));
  }
}
