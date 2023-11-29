import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QualificationModule } from './qualification/qualification.module';
import { PrismaModule } from './prisma/prisma.module';
import { EventSourcingModule } from './event-sourcing/event-sourcing.module';

@Module({
  imports: [PrismaModule, QualificationModule, EventSourcingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
