import fs from 'node:fs/promises';
import { BASE_LOG_DIR, NODE_LOG_NAMESPACE } from '../logger/P2PChatLogger';
import Para from 'papaparse';
import { createReadStream } from 'node:fs';

export const readSingleNodeInfo = async (dir: string) => {
  const nodeInfoCsv = createReadStream(`${dir}/node.csv`);
  const parseResult = await new Promise<Para.ParseResult<unknown>>(
    (resolve) => {
      Para.parse(nodeInfoCsv, {
        complete: function (results) {
          resolve(results);
        },
      });
    },
  );
  const parseData = parseResult.data;
  const csvInfo = {
    initTime: parseData?.[1]?.[0] as number,
    startTime: parseData?.[1]?.[1] as number,
    endTime: parseData?.[1]?.[2] as number,
    name: parseData?.[1]?.[3],
    url: parseData?.[1]?.[4],
  };
  const wsConnectTime: number =
    Number(csvInfo.startTime) - Number(csvInfo.initTime);
  const nodeInfo = {
    wsConnectTime: `${wsConnectTime} ms`,
    name: csvInfo.name,
    url: csvInfo.url,
  };
  return {
    nodeInfo,
  };
};

export const readTestNodeInfo = async (dir: string) => {
  const nodesDirs = await fs.readdir(`${dir}/${NODE_LOG_NAMESPACE}`);
  const nodesInfo = await Promise.all(
    nodesDirs.map(async (nodeDir) => {
      const info = await readSingleNodeInfo(
        `${dir}/${NODE_LOG_NAMESPACE}/${nodeDir}`,
      );
      return info;
    }),
  );
  return nodesInfo;
};

export const getNodesLogInfo = async () => {
  const dirs = await fs.readdir(BASE_LOG_DIR);
  const cases = await Promise.all(
    dirs.map(async (dir) => {
      const info = await readTestNodeInfo(`${BASE_LOG_DIR}/${dir}`);
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
