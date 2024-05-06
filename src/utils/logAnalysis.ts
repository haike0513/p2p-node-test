import fs from 'node:fs/promises';
import {
  BASE_LOG_DIR,
  ChatMessageLog,
  NODE_LOG_NAMESPACE,
  SPLIT_TIME_FORMAT,
} from '../logger/P2PChatLogger';
import Para from 'papaparse';
import { createReadStream } from 'node:fs';
import dayjs from 'dayjs';
import { exists } from 'fs-extra';

export const getSingleSliceMessage = async (dir: string) => {
  // console.log('getSingleSliceMessage', dir);
  const isExist = await exists(dir);
  if (!isExist) {
    return {
      csvInfo: [],
    };
  }
  const infoCsv = createReadStream(`${dir}`);
  const parseResult = await new Promise<Para.ParseResult<unknown>>(
    (resolve, reject) => {
      Para.parse(infoCsv, {
        error: function (error) {
          reject(error);
        },
        complete: function (results) {
          resolve(results);
        },
      });
    },
  );
  const parseData = parseResult.data;
  const csvInfo: ChatMessageLog[] = parseData.map((item) => {
    return {
      id: item[0],
      from: item[1],
      to: item[2],
      timestamp: item[3],
      message: item[4],
      actionType: item[5],
      status: item[6],
      reason: item[7],
    };
  });
  // console.log('getSingleSliceMessage', csvInfo);

  return {
    csvInfo,
  };
};

const fileNames = (start: string, end: string, extra = 0) => {
  const names = [];
  let timeCurrent = dayjs(start);
  const timeEnd = dayjs(end).add(1 + extra, 'hour');
  while (timeCurrent.isBefore(timeEnd)) {
    names.push(timeCurrent.format(SPLIT_TIME_FORMAT));
    timeCurrent = timeCurrent.add(1, 'hour');
  }
  return names;
};

export const getSingleNodeMessage = async (
  dir: string,
  start: string,
  end: string,
) => {
  const sendNames = fileNames(start, end);
  const receiveNames = fileNames(start, end, 1);
  const sendMessages = await Promise.all(
    sendNames.map(async (n) => {
      return await getSingleSliceMessage(`${dir}/message/${n}.csv`);
    }),
  );

  const receiveMessages = await Promise.all(
    receiveNames.map(async (n) => {
      return await getSingleSliceMessage(`${dir}/message/${n}.csv`);
    }),
  );
  return {
    sendMessages: sendMessages
      .map((item) => item.csvInfo)
      .flat()
      .filter((item) => item.actionType === 'send'),
    receiveMessages: receiveMessages
      .map((item) => item.csvInfo)
      .flat()
      .filter((item) => item.actionType === 'receive'),
  };
};
export const getNodeMessageInfoAtTime = async (
  dir: string,
  start: string,
  end: string,
) => {
  const nodesDirs = await fs.readdir(`${dir}/${NODE_LOG_NAMESPACE}`);
  const nodesInfo = await Promise.all(
    nodesDirs.map(async (nodeDir) => {
      const info = await getSingleNodeMessage(
        `${dir}/${NODE_LOG_NAMESPACE}/${nodeDir}`,
        start,
        end,
      );
      return info;
    }),
  );
  return nodesInfo;
};
export const getMessagesLogInfoAtTime = async (
  testCase: string,
  start: string,
  end: string,
) => {
  const nodesMessage = await getNodeMessageInfoAtTime(
    `${BASE_LOG_DIR}/${testCase}`,
    start,
    end,
  );
  const totalSendMessage = nodesMessage.map((m) => m.sendMessages).flat();
  const totalReceiveMessage = nodesMessage.map((m) => m.receiveMessages).flat();
  const totalReceiveMessageMap = totalReceiveMessage.reduce((total, c) => {
    total[c.message] = c;
    return total;
  }, {});

  const analysisArray = totalSendMessage.map((s) => {
    const receive = totalReceiveMessageMap[s.message];
    const delay = receive ? Number(receive.timestamp) - Number(s.timestamp) : 0;
    return {
      send: s,
      receive: receive,
      delay,
    };
  });

  const totalSend = analysisArray.length;
  const totalReceiveArray = analysisArray.filter((item) => {
    return item.send && item.receive;
  });
  const totalReceive = totalReceiveArray.length;
  const avgDelay =
    totalReceiveArray.length > 0
      ? totalReceiveArray.reduce((total, item) => {
          return total + item.delay;
        }, 0) / totalReceiveArray.length
      : 0;

  return {
    totalSend: totalSend,
    totalReceive: totalReceive,
    avgDelay,
    cases: analysisArray,
  };
};
