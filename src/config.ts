export interface NodeConfig {
  name: string;
  url: string;
  agent: string;
  anotherAgent: string;
}
export const nodesConfig: NodeConfig[] = [
  {
    name: 'vlc23333',
    // url: 'ws://31.220.78.83:23333/vlc23333',
    url: 'ws://127.0.0.1:23333/vlc23333',
    agent: '406b4c9bb2117df0505a58c6c44a99c8817b7639d9c877bdbea5a8e4e0412740',
    anotherAgent:
      'f78e5a39e3d433986c4b8026d0baeb62b7eb845c29bb83a04b79d645ef7efbba',
  },
  {
    name: 'vlc23334',
    // url: 'ws://31.220.78.83:23335/vlc23335',
    url: 'ws://127.0.0.1:23334/vlc23334',
    agent: 'f78e5a39e3d433986c4b8026d0baeb62b7eb845c29bb83a04b79d645ef7efbba',
    anotherAgent:
      '406b4c9bb2117df0505a58c6c44a99c8817b7639d9c877bdbea5a8e4e0412740',
  },
];

export const NODE_LENGTH = 10;

export const MESSAGE_SEND_RATE = 10;
