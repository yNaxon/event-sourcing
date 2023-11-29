import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../prisma/prisma.client';
import { EventProcessingStatus, Prisma } from '@prisma/client';

@Injectable()
export class EventProcessingService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async processEvent<T>(
    eventId: string,
    processorName: string,
    callback: () => Promise<T>,
  ): Promise<T> {
    const { attemptId } = await this.startEventProcessingAttempt({
      eventId,
      processorName,
    });

    try {
      const result = await callback();
      await this.reportSuccessfulEventProcessingAttempt({
        attemptId,
      });

      return result;
    } catch (error) {
      await this.reportFailedEventProcessingAttempt({
        attemptId,
        error: error.toString(),
      });

      throw error;
    }
  }

  private async startEventProcessingAttempt({
    eventId,
    processorName,
  }: StartEventProcessingAttemptInput): Promise<StartEventProcessingAttemptOutput> {
    const record = await this.prismaClient.eventProcessingAttempt.create({
      data: {
        eventId,
        processorName,
        error: null,
        finishedAt: null,
        status: EventProcessingStatus.IN_PROGRESS,
      },
    });

    return { attemptId: record.id };
  }

  private async reportSuccessfulEventProcessingAttempt({
    attemptId,
  }: ReportSuccessfulEventProcessingAttemptInput): Promise<void> {
    await this.prismaClient.eventProcessingAttempt.update({
      where: {
        id: attemptId,
      },
      data: {
        status: EventProcessingStatus.SUCCESS,
        finishedAt: new Date(),
      },
    });
  }

  private async reportFailedEventProcessingAttempt<T = unknown>({
    attemptId,
    error,
  }: ReportFailedEventProcessingAttempt<T>): Promise<void> {
    await this.prismaClient.eventProcessingAttempt.update({
      where: {
        id: attemptId,
      },
      data: {
        status: EventProcessingStatus.FAILED,
        finishedAt: new Date(),
        error: error as Prisma.JsonObject,
      },
    });
  }
}

interface StartEventProcessingAttemptInput {
  eventId: string;
  processorName: string;
}

interface StartEventProcessingAttemptOutput {
  attemptId: string;
}

interface ReportSuccessfulEventProcessingAttemptInput {
  attemptId: string;
}

interface ReportFailedEventProcessingAttempt<T> {
  attemptId: string;
  error: T;
}
