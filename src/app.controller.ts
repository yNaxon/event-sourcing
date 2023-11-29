import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { QualificationService } from './qualification/qualification.service';
import { EventStoreService } from './event-sourcing/event-store.service';

@Controller()
export class AppController {
  constructor(
    private readonly qualificationService: QualificationService,
    private readonly eventStoreService: EventStoreService,
  ) {}

  @Get()
  getHello(): Promise<any[]> {
    return this.eventStoreService.getEvents();
  }

  @Post()
  createQualification(@Body() body: { buyerId: string; merchantId: string }) {
    return this.qualificationService.createQualification(
      body.buyerId,
      body.merchantId,
    );
  }
}
