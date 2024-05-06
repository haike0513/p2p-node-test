import Websocket from 'ws';
import { Logger } from '@nestjs/common';
import { ChatMessageLog, P2PChatLogger } from '../logger/P2PChatLogger';
import dayjs from 'dayjs';
import { ZAction, ZIdentity, ZMessage } from 'src/proto/ZMsg';
import { hexToU8a, u8aToU8a } from '@polkadot/util';
import { Keyring } from '@polkadot/keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { KeyringPair } from '@polkadot/keyring/types';

const keyring = new Keyring({
  type: 'ed25519',
});
export interface ChatApiOptions {
  url: string;
  name: string;
  agent: string;
  anotherAgent: string;
}
export class ChatApi {
  chatApiOptions: ChatApiOptions;
  websocket: WebSocket;
  start = 0;
  private readonly logger: Logger;
  p2pChatLogger: P2PChatLogger;
  keyPair: KeyringPair;
  error: boolean;
  constructor(options: ChatApiOptions) {
    this.chatApiOptions = options;
    this.p2pChatLogger = new P2PChatLogger(options);
    this.logger = new Logger(ChatApi.name);
    const mnemonic = mnemonicGenerate();
    this.keyPair = keyring.addFromUri(
      mnemonic,
      { name: `${options.name}` },
      'ed25519',
    );
    this.websocket = new Websocket(options.url);
    // this.websocket.binaryType = 'arraybuffer';
    this.websocket.onopen = this.onSocketOpen;
    this.websocket.onmessage = this.onSocketMessage;
    this.websocket.onerror = this.onSocketError;
    this.websocket.onclose = this.onSocketError;
  }
  sendMessage() {
    // return;
    const readyState = this.websocket.readyState;
    if (readyState !== this.websocket.OPEN || this.error) {
      return;
    }
    const id = dayjs();

    const chatMessageLog: ChatMessageLog = {
      id: id.valueOf().toString(),
      from: this.chatApiOptions.agent,
      // from: this.keyPair.publicKey,
      to: this.chatApiOptions.anotherAgent,
      timestamp: dayjs().valueOf().toString(),
      message: `${id.valueOf().toString()}-${this.chatApiOptions.agent}-${this.chatApiOptions.anotherAgent}-Hello ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
      // message: `HelloServer!Test`,
      actionType: 'send',
      status: 'success',
      reason: '',
    };

    try {
      const message = ZMessage.create({
        action: ZAction.Z_TYPE_READ,
        identity: ZIdentity.U_TYPE_CLI,
        // id: u8aToU8a(chatMessageLog.id),
        from: hexToU8a(this.chatApiOptions.agent),
        // from: this.keyPair.publicKey,
        to: hexToU8a(this.chatApiOptions.anotherAgent),
        data: u8aToU8a(chatMessageLog.message),
      });
      // const defaultU = [
      //   58, 14, 72, 101, 108, 108, 111, 44, 32, 83, 101, 114, 118, 101, 114, 33,
      //   82, 32, 55, 36, 180, 232, 87, 55, 247, 167, 123, 24, 115, 117, 53, 206,
      //   205, 103, 109, 179, 142, 136, 81, 75, 240, 56, 124, 45, 143, 166, 41, 5,
      //   248, 235,
      // ];
      // const defaultB = new Uint8Array(defaultU);

      // this.logger.error('message', message);
      // this.logger.error('defaultB', ZMessage.decode(defaultB));

      const buffer = new Uint8Array(ZMessage.encode(message).finish());

      // this.logger.error(defaultB instanceof Uint8Array);
      // this.logger.error(buffer instanceof Uint8Array);
      // this.logger.error(defaultB);

      // this.logger.error(buffer);

      // return;
      // this.websocket.send(new Blob([buffer]));
      this.websocket.send(buffer);
      this.p2pChatLogger.logMessage(chatMessageLog);
    } catch (error) {
      chatMessageLog.status = 'error';
      chatMessageLog.reason = error;
      this.p2pChatLogger.logMessage(chatMessageLog);
    }
  }
  onSocketMessage = (message: MessageEvent<string>) => {
    // this.logger.error('onSocketMessage', message.data);
    try {
      const chatMessageLog: ChatMessageLog = {
        id: dayjs().unix().toString(),
        from: '',
        to: '',
        timestamp: dayjs().valueOf().toString(),
        message: message.data,
        actionType: 'receive',
        status: 'success',
        reason: '',
      };
      this.p2pChatLogger.logMessage(chatMessageLog);
      // message.data
      //   .arrayBuffer()
      //   .then((buffer) => {
      //     const decoded = ZMessage.decode(new Uint8Array(buffer));
      //     this.logger.debug(decoded);
      //     const chatMessageLog: ChatMessageLog = {
      //       id: u8aToString(decoded.id),
      //       from: u8aToString(decoded.from),
      //       to: u8aToString(decoded.to),
      //       timestamp: u8aToString(decoded.signature),
      //       message: u8aToString(decoded.data),
      //       actionType: 'receive',
      //       status: 'success',
      //       reason: '',
      //     };
      //     this.p2pChatLogger.logMessage(chatMessageLog);
      //   })
      //   .catch((error) => {
      //     const chatMessageLog: ChatMessageLog = {
      //       id: dayjs().unix().toString(),
      //       from: '',
      //       to: '',
      //       timestamp: '',
      //       message: '',
      //       actionType: '',
      //       status: 'error',
      //       reason: error,
      //     };
      //     this.p2pChatLogger.logMessage(chatMessageLog);
      //   });
    } catch (error) {
      const chatMessageLog: ChatMessageLog = {
        id: dayjs().unix().toString(),
        from: '',
        to: '',
        timestamp: '',
        message: '',
        actionType: '',
        status: 'error',
        reason: error,
      };
      this.p2pChatLogger.logMessage(chatMessageLog);
    }
  };
  onSocketError = (error: Event) => {
    this.p2pChatLogger.logEnd();
    this.logger.error(JSON.stringify(error));
    this.logger.error(JSON.stringify(error));
    this.error = true;
    // message.data.arrayBuffer().then((data) => {
    //   this.logger.debug(data);
    // });
  };
  onSocketOpen = (error: Event) => {
    this.p2pChatLogger.logStart();
    this.start = new Date().getTime();
    // this.websocket.send('ping');
    this.logger.debug(`ping start: ${this.start}`, error);

    this.logger.debug(`ping start: ${this.start}`);
    // message.data.arrayBuffer().then((data) => {
    //   this.logger.debug(data);
    // });
  };
}
