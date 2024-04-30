export interface NodeConfig {
  name: string;
  url: string;
  agent: string;
  anotherAgent: string;
}
export const nodesConfig: NodeConfig[] = [
  {
    name: 'vlc23333',
    url: 'ws://31.220.78.83:23333/vlc23333',
    // url: 'ws://127.0.0.1:23333/vlc23333',
    agent: '406b4c9bb2117df0505a58c6c44a99c8817b7639d9c877bdbea5a8e4e0412740',
    anotherAgent:
      '3724b4e85737f7a77b18737535cecd676db38e88514bf0387c2d8fa62905f8eb',
  },
  {
    name: 'vlc23335',
    url: 'ws://31.220.78.83:23335/vlc23335',
    // url: 'ws://127.0.0.1:23335/vlc23335',
    agent: '3724b4e85737f7a77b18737535cecd676db38e88514bf0387c2d8fa62905f8eb',
    anotherAgent:
      '406b4c9bb2117df0505a58c6c44a99c8817b7639d9c877bdbea5a8e4e0412740',
  },
];

export const NODE_LENGTH = 10;

export const MESSAGE_SEND_RATE = 10;
