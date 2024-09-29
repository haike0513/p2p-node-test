import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ChatApi } from './client/ChatApi';
// import fs from 'node:fs/promises';
// import { BASE_LOG_DIR } from './logger/P2PChatLogger';
import { getNodesLogInfo } from './utils/nodes';
import { getMessagesLogInfoAtTime } from './utils/logAnalysis';
import { postJob } from './dispatcher/job';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private nodes: ChatApi[] = [];
  constructor() {
    this.logger.debug('connect nodes length', this.nodes.length);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async getNodesInfo() {
    const nodesInfo = await getNodesLogInfo();
    return nodesInfo;
  }
  @Cron('*/20 * * * * *')
  async handleSubmitJob() {
    try {
      const rs = await postJob();
      let jobId = rs.data.result;
      if(jobId) {
        this.logger.log(`submit a job: ${jobId}`);
      }else{
        this.logger.error(`submit a job error with code: ${rs.data.code}`);
      }
      console.log(rs?.data);
    } catch (error) {
      this.logger.error("submit a job failed", error);
      
    }

  }

  async handleAnalysisLogs(testCase: string, start: string, end: string) {
    return await getMessagesLogInfoAtTime(testCase, start, end);
  }
}
