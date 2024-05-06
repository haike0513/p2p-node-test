import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { nodesConfig } from './config';
import { ChatApi } from './client/ChatApi';
import { getRandomInt } from './utils';
// import fs from 'node:fs/promises';
// import { BASE_LOG_DIR } from './logger/P2PChatLogger';
import { getNodesLogInfo } from './utils/nodes';
import { cronMessagesLogInfo } from './utils/messages';
import { getMessagesLogInfoAtTime } from './utils/logAnalysis';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private nodes: ChatApi[] = [];
  constructor() {
    nodesConfig.forEach((node) => {
      const chatApi = new ChatApi(node);
      this.nodes.push(chatApi);
      this.logger.log(
        `connect to name: ${node.name} url:${node.url} node Logger Id: ${chatApi.p2pChatLogger.loggerId}`,
      );
    });
    this.logger.debug('connect nodes length', this.nodes.length);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async getNodesInfo() {
    const nodesInfo = await getNodesLogInfo();
    return nodesInfo;
  }

  @Cron('0 * * * * *')
  handleNodeHealth() {
    const errorNodes = this.nodes
      .map((n, i) => {
        if (n.error) {
          return { index: i, option: n.chatApiOptions };
        }
        return null;
      })
      .filter((item) => item);
    errorNodes.forEach((item) => {
      const chatApi = new ChatApi(item.option);
      this.nodes[item.index] = chatApi;
      this.logger.log(
        `connect to name: ${item.option.name} url:${item.option.url} node Logger Id: ${chatApi.p2pChatLogger.loggerId}`,
      );
    });
  }

  @Cron('* * * * * *')
  handleSendMessage() {
    const nodeIndex = getRandomInt(this.nodes.length);
    const api = this.nodes[nodeIndex];
    if (!api) {
      this.logger.debug('api is not init, nodes length', this.nodes.length);
      return;
    }
    this.logger.debug(`node: ${api.p2pChatLogger.loggerId} send message`);
    api.sendMessage();
  }

  // @Cron('* * * * * *')
  handleCronMessageLog() {
    cronMessagesLogInfo();
  }

  async handleAnalysisLogs(testCase: string, start: string, end: string) {
    return await getMessagesLogInfoAtTime(testCase, start, end);
  }
}
