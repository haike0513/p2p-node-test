import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import dayjs from 'dayjs';
import { SPLIT_TIME_FORMAT } from './logger/P2PChatLogger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/nodes')
  async getNodesInfo() {
    return await this.appService.getNodesInfo();
  }
  @Get('/getLogAnalysis')
  async getLogAnalysis(
    @Query('testCase') testCase: string,
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('showCase') showCase: boolean,
  ) {
    try {
      const result = await this.appService.handleAnalysisLogs(
        testCase,
        dayjs.unix(Number(start)).format(SPLIT_TIME_FORMAT),
        dayjs.unix(Number(end)).format(SPLIT_TIME_FORMAT),
      );
      const r = {
        totalSend: result.totalSend,
        totalReceive: result.totalReceive,
        avg: result.avgDelay,
        case: showCase ? result.cases : [],
      };
      return r;
    } catch (error) {
      return {
        code: -1,
        error,
      };
    }
  }
}
