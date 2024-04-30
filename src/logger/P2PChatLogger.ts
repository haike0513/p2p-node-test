import dayjs from 'dayjs';
import Papa from 'papaparse';
import fs from 'node:fs';
import fsExtra from 'fs-extra';
import { ChatApiOptions } from 'src/client/ChatApi';

export enum ActionType {
  Send = 'Send',
  Receive = 'Receive',
}

export interface ChatMessageLog {
  id: string;
  from: string;
  to: string;
  timestamp: string;
  message: string;
  actionType: ActionType | string;
  status: string;
  reason: string;
}

export const BASE_LOG_DIR = 'P2P_LOG';
export const LOG_TIME = dayjs().unix();
export const NODE_LOG_NAMESPACE = 'NODE';

export const SPLIT_TIME_FORMAT = 'YYYY-MM-DD HH';
export const CACHE_MESSAGE_LENGTH = 1;
export let loggerCount = 0;
export class P2PChatLogger {
  initTime: number = 0;
  startTime: number = 0;
  endTime: number = 0;
  loggerId: number = 0;
  latestSplitTIme: string;
  cacheMessageLog: ChatMessageLog[] = [];
  chatApiOptions: ChatApiOptions;
  constructor(options: ChatApiOptions) {
    this.chatApiOptions = options;
    this.loggerId = loggerCount++;
    this.initTime = dayjs().valueOf();
    this.latestSplitTIme = dayjs().format(SPLIT_TIME_FORMAT);
    this.initLogFile();
  }
  logStart() {
    this.startTime = dayjs().valueOf();
    this.upgradeNodeLog();
  }
  logEnd() {
    this.endTime = dayjs().valueOf();
    this.upgradeNodeLog();
  }
  logMessage(message: ChatMessageLog) {
    const currentTime = dayjs().format(SPLIT_TIME_FORMAT);
    if (this.latestSplitTIme === currentTime) {
    } else {
      this.flushMessageLog();
      this.latestSplitTIme = currentTime;
    }
    this.upgradeMessageLog(message);
  }
  initLogFile() {
    const dirBase = `${BASE_LOG_DIR}/${LOG_TIME}/${NODE_LOG_NAMESPACE}/${this.loggerId}/`;
    fsExtra.ensureDirSync(dirBase);
    const nodeFileName = `${dirBase}/node.csv`;
    const nodeCsv = Papa.unparse([
      {
        initTime: this.initTime,
        startTime: this.startTime,
        endTime: this.endTime,
      },
    ]);
    fs.writeFileSync(nodeFileName, nodeCsv);

    const messageFileName = `${dirBase}/message.csv`;
    const messageFileCsv = Papa.unparse([
      [
        'id',
        'from',
        'to',
        'timestamp',
        'message',
        'actionType',
        'status',
        'reason',
      ],
    ]);
    fs.writeFileSync(messageFileName, messageFileCsv);
  }
  upgradeNodeLog() {
    const csv = Papa.unparse([
      {
        initTime: this.initTime,
        startTime: this.startTime,
        endTime: this.endTime,
        name: this.chatApiOptions.name,
        url: this.chatApiOptions.url,
      },
    ]);
    const dirBase = `${BASE_LOG_DIR}/${LOG_TIME}/${NODE_LOG_NAMESPACE}/${this.loggerId}/`;
    fsExtra.ensureDirSync(dirBase);
    const fileName = `${dirBase}/node.csv`;
    fs.writeFileSync(fileName, csv);
  }

  upgradeMessageLog(message: ChatMessageLog) {
    this.cacheMessageLog.push(message);
    if (this.cacheMessageLog.length >= CACHE_MESSAGE_LENGTH) {
      this.flushMessageLog();
    }
  }
  flushMessageLog() {
    const messages = this.cacheMessageLog;
    const csv = Papa.unparse(
      messages.map((item) => {
        return [
          item.id, //'id',
          item.from, //'from',
          item.to, //'to',
          item.timestamp, //'timestamp',
          item.message, //'message',
          item.actionType, //'actionType',
          item.status, //'status',
          item.reason, //'reason',
        ];
      }),
    );
    const dirBase = `${BASE_LOG_DIR}/${LOG_TIME}/${NODE_LOG_NAMESPACE}/${this.loggerId}/message/`;
    fsExtra.ensureDirSync(dirBase);
    const fileName = `${dirBase}/${this.latestSplitTIme}.csv`;
    fs.appendFileSync(fileName, `\n${csv}`);
    this.cacheMessageLog = [];
  }
}
