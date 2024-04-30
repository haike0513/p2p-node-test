import fs from 'node:fs/promises';
import {
  BASE_LOG_DIR,
  ChatMessageLog,
  NODE_LOG_NAMESPACE,
} from '../logger/P2PChatLogger';
import Para from 'papaparse';
import { createReadStream } from 'node:fs';

export const cornSingleSliceMessage = async (dir: string) => {
  const infoCsv = createReadStream(`${dir}`);
  const parseResult = await new Promise<Para.ParseResult<unknown>>(
    (resolve) => {
      Para.parse(infoCsv, {
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
  return {
    csvInfo,
  };
};

export const cornSingleNodeMessage = async (dir: string) => {
  const messageDirs = await fs.readdir(`${dir}/message`);

  await Promise.all(
    messageDirs.map(async (messageFile) => {
      const info = await cornSingleSliceMessage(
        `${dir}/message/${messageFile}`,
      );
      return info;
    }),
  );
};

export const cornNodeMessageInfo = async (dir: string) => {
  const nodesDirs = await fs.readdir(`${dir}/${NODE_LOG_NAMESPACE}`);
  const nodesInfo = await Promise.all(
    nodesDirs.map(async (nodeDir) => {
      const info = await cornSingleNodeMessage(
        `${dir}/${NODE_LOG_NAMESPACE}/${nodeDir}`,
      );
      return info;
    }),
  );
  return nodesInfo;
};

export const cronMessagesLogInfo = async () => {
  const dirs = await fs.readdir(BASE_LOG_DIR);
  const cases = await Promise.all(
    dirs.map(async (dir) => {
      const info = await cornNodeMessageInfo(`${BASE_LOG_DIR}/${dir}`);
      return {
        timestampStart: dir,
        info,
      };
    }),
  );
  return {
    cases,
  };
};
