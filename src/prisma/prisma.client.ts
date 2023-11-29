import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as ConcretePrismaClient } from '@prisma/client';

@Injectable()
export class PrismaClient extends ConcretePrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
