/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';

export const protobufPackage = 'protos';

export enum ZIdentity {
  /** U_TYPE_CLI - client */
  U_TYPE_CLI = 0,
  /** U_TYPE_SER - server */
  U_TYPE_SER = 1,
  UNRECOGNIZED = -1,
}

export function zIdentityFromJSON(object: any): ZIdentity {
  switch (object) {
    case 0:
    case 'U_TYPE_CLI':
      return ZIdentity.U_TYPE_CLI;
    case 1:
    case 'U_TYPE_SER':
      return ZIdentity.U_TYPE_SER;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ZIdentity.UNRECOGNIZED;
  }
}

export function zIdentityToJSON(object: ZIdentity): string {
  switch (object) {
    case ZIdentity.U_TYPE_CLI:
      return 'U_TYPE_CLI';
    case ZIdentity.U_TYPE_SER:
      return 'U_TYPE_SER';
    case ZIdentity.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export enum ZAction {
  /** Z_TYPE_READ - read */
  Z_TYPE_READ = 0,
  /** Z_TYPE_WRITE - write */
  Z_TYPE_WRITE = 1,
  UNRECOGNIZED = -1,
}

export function zActionFromJSON(object: any): ZAction {
  switch (object) {
    case 0:
    case 'Z_TYPE_READ':
      return ZAction.Z_TYPE_READ;
    case 1:
    case 'Z_TYPE_WRITE':
      return ZAction.Z_TYPE_WRITE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ZAction.UNRECOGNIZED;
  }
}

export function zActionToJSON(object: ZAction): string {
  switch (object) {
    case ZAction.Z_TYPE_READ:
      return 'Z_TYPE_READ';
    case ZAction.Z_TYPE_WRITE:
      return 'Z_TYPE_WRITE';
    case ZAction.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export enum ZPushType {
  /** Z_TYPE_DM - direct msg */
  Z_TYPE_DM = 0,
  /** Z_TYPE_BC - broadcast */
  Z_TYPE_BC = 1,
  UNRECOGNIZED = -1,
}

export function zPushTypeFromJSON(object: any): ZPushType {
  switch (object) {
    case 0:
    case 'Z_TYPE_DM':
      return ZPushType.Z_TYPE_DM;
    case 1:
    case 'Z_TYPE_BC':
      return ZPushType.Z_TYPE_BC;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ZPushType.UNRECOGNIZED;
  }
}

export function zPushTypeToJSON(object: ZPushType): string {
  switch (object) {
    case ZPushType.Z_TYPE_DM:
      return 'Z_TYPE_DM';
    case ZPushType.Z_TYPE_BC:
      return 'Z_TYPE_BC';
    case ZPushType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export enum ZType {
  Z_TYPE_RNG = 0,
  Z_TYPE_EVENT = 1,
  Z_TYPE_CLOCK = 2,
  Z_TYPE_GATEWAY = 3,
  Z_TYPE_ZCHAT = 4,
  UNRECOGNIZED = -1,
}

export function zTypeFromJSON(object: any): ZType {
  switch (object) {
    case 0:
    case 'Z_TYPE_RNG':
      return ZType.Z_TYPE_RNG;
    case 1:
    case 'Z_TYPE_EVENT':
      return ZType.Z_TYPE_EVENT;
    case 2:
    case 'Z_TYPE_CLOCK':
      return ZType.Z_TYPE_CLOCK;
    case 3:
    case 'Z_TYPE_GATEWAY':
      return ZType.Z_TYPE_GATEWAY;
    case 4:
    case 'Z_TYPE_ZCHAT':
      return ZType.Z_TYPE_ZCHAT;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ZType.UNRECOGNIZED;
  }
}

export function zTypeToJSON(object: ZType): string {
  switch (object) {
    case ZType.Z_TYPE_RNG:
      return 'Z_TYPE_RNG';
    case ZType.Z_TYPE_EVENT:
      return 'Z_TYPE_EVENT';
    case ZType.Z_TYPE_CLOCK:
      return 'Z_TYPE_CLOCK';
    case ZType.Z_TYPE_GATEWAY:
      return 'Z_TYPE_GATEWAY';
    case ZType.Z_TYPE_ZCHAT:
      return 'Z_TYPE_ZCHAT';
    case ZType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface Zp2p {
  version: number;
  /** for p2p */
  type: ZIdentity;
  /** for p2p */
  action: ZAction;
  /** for vlc */
  pushType: ZPushType;
  message: ZMessage | undefined;
  publicKey: Uint8Array;
  /** for verifying */
  signature: Uint8Array;
}

/** ZMessage */
export interface ZMessage {
  id: Uint8Array;
  version: number;
  type: ZType;
  action: ZAction;
  identity: ZIdentity;
  publicKey: Uint8Array;
  data: Uint8Array;
  signature: Uint8Array;
  from: Uint8Array;
  to: Uint8Array;
}

export interface ZChat {
  messageData: string;
  clock: ClockInfo | undefined;
}

export interface MergeLog {
  fromId: Uint8Array;
  toId: Uint8Array;
  startCount: string;
  endCount: string;
  sClock: Clock | undefined;
  eClock: Clock | undefined;
  mergeAt: string;
}

export interface Clock {
  values: { [key: string]: string };
}

export interface Clock_ValuesEntry {
  key: string;
  value: string;
}

export interface ClockInfo {
  clock: Clock | undefined;
  /** id 为node id */
  id: Uint8Array;
  messageId: Uint8Array;
  count: string;
  createAt: string;
}

/** type = TYPE_CLOCK_NODE */
export interface ClockNode {
  clock: Clock | undefined;
  id: Uint8Array;
  messageId: Uint8Array;
  count: string;
  createAt: string;
  rawMessage: Uint8Array;
}

export interface NodeInfo {
  nodeIds: string[];
}

function createBaseZp2p(): Zp2p {
  return {
    version: 0,
    type: 0,
    action: 0,
    pushType: 0,
    message: undefined,
    publicKey: new Uint8Array(0),
    signature: new Uint8Array(0),
  };
}

export const Zp2p = {
  encode(message: Zp2p, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== 0) {
      writer.uint32(8).uint32(message.version);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.action !== 0) {
      writer.uint32(24).int32(message.action);
    }
    if (message.pushType !== 0) {
      writer.uint32(32).int32(message.pushType);
    }
    if (message.message !== undefined) {
      ZMessage.encode(message.message, writer.uint32(42).fork()).ldelim();
    }
    if (message.publicKey.length !== 0) {
      writer.uint32(50).bytes(message.publicKey);
    }
    if (message.signature.length !== 0) {
      writer.uint32(58).bytes(message.signature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Zp2p {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseZp2p();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.version = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.action = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.pushType = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.message = ZMessage.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.publicKey = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.signature = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Zp2p {
    return {
      version: isSet(object.version) ? globalThis.Number(object.version) : 0,
      type: isSet(object.type) ? zIdentityFromJSON(object.type) : 0,
      action: isSet(object.action) ? zActionFromJSON(object.action) : 0,
      pushType: isSet(object.pushType) ? zPushTypeFromJSON(object.pushType) : 0,
      message: isSet(object.message) ? ZMessage.fromJSON(object.message) : undefined,
      publicKey: isSet(object.publicKey) ? bytesFromBase64(object.publicKey) : new Uint8Array(0),
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
    };
  },

  toJSON(message: Zp2p): unknown {
    const obj: any = {};
    if (message.version !== 0) {
      obj.version = Math.round(message.version);
    }
    if (message.type !== 0) {
      obj.type = zIdentityToJSON(message.type);
    }
    if (message.action !== 0) {
      obj.action = zActionToJSON(message.action);
    }
    if (message.pushType !== 0) {
      obj.pushType = zPushTypeToJSON(message.pushType);
    }
    if (message.message !== undefined) {
      obj.message = ZMessage.toJSON(message.message);
    }
    if (message.publicKey.length !== 0) {
      obj.publicKey = base64FromBytes(message.publicKey);
    }
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Zp2p>, I>>(base?: I): Zp2p {
    return Zp2p.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Zp2p>, I>>(object: I): Zp2p {
    const message = createBaseZp2p();
    message.version = object.version ?? 0;
    message.type = object.type ?? 0;
    message.action = object.action ?? 0;
    message.pushType = object.pushType ?? 0;
    message.message =
      object.message !== undefined && object.message !== null ? ZMessage.fromPartial(object.message) : undefined;
    message.publicKey = object.publicKey ?? new Uint8Array(0);
    message.signature = object.signature ?? new Uint8Array(0);
    return message;
  },
};

function createBaseZMessage(): ZMessage {
  return {
    id: new Uint8Array(0),
    version: 0,
    type: 0,
    action: 0,
    identity: 0,
    publicKey: new Uint8Array(0),
    data: new Uint8Array(0),
    signature: new Uint8Array(0),
    from: new Uint8Array(0),
    to: new Uint8Array(0),
  };
}

export const ZMessage = {
  encode(message: ZMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id.length !== 0) {
      writer.uint32(10).bytes(message.id);
    }
    if (message.version !== 0) {
      writer.uint32(16).uint32(message.version);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.action !== 0) {
      writer.uint32(32).int32(message.action);
    }
    if (message.identity !== 0) {
      writer.uint32(40).int32(message.identity);
    }
    if (message.publicKey.length !== 0) {
      writer.uint32(50).bytes(message.publicKey);
    }
    if (message.data.length !== 0) {
      writer.uint32(58).bytes(message.data);
    }
    if (message.signature.length !== 0) {
      writer.uint32(66).bytes(message.signature);
    }
    if (message.from.length !== 0) {
      writer.uint32(74).bytes(message.from);
    }
    if (message.to.length !== 0) {
      writer.uint32(82).bytes(message.to);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ZMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseZMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.version = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.action = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.identity = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.publicKey = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.signature = reader.bytes();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.from = reader.bytes();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.to = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ZMessage {
    return {
      id: isSet(object.id) ? bytesFromBase64(object.id) : new Uint8Array(0),
      version: isSet(object.version) ? globalThis.Number(object.version) : 0,
      type: isSet(object.type) ? zTypeFromJSON(object.type) : 0,
      action: isSet(object.action) ? zActionFromJSON(object.action) : 0,
      identity: isSet(object.identity) ? zIdentityFromJSON(object.identity) : 0,
      publicKey: isSet(object.publicKey) ? bytesFromBase64(object.publicKey) : new Uint8Array(0),
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
      from: isSet(object.from) ? bytesFromBase64(object.from) : new Uint8Array(0),
      to: isSet(object.to) ? bytesFromBase64(object.to) : new Uint8Array(0),
    };
  },

  toJSON(message: ZMessage): unknown {
    const obj: any = {};
    if (message.id.length !== 0) {
      obj.id = base64FromBytes(message.id);
    }
    if (message.version !== 0) {
      obj.version = Math.round(message.version);
    }
    if (message.type !== 0) {
      obj.type = zTypeToJSON(message.type);
    }
    if (message.action !== 0) {
      obj.action = zActionToJSON(message.action);
    }
    if (message.identity !== 0) {
      obj.identity = zIdentityToJSON(message.identity);
    }
    if (message.publicKey.length !== 0) {
      obj.publicKey = base64FromBytes(message.publicKey);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    if (message.from.length !== 0) {
      obj.from = base64FromBytes(message.from);
    }
    if (message.to.length !== 0) {
      obj.to = base64FromBytes(message.to);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ZMessage>, I>>(base?: I): ZMessage {
    return ZMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ZMessage>, I>>(object: I): ZMessage {
    const message = createBaseZMessage();
    message.id = object.id ?? new Uint8Array(0);
    message.version = object.version ?? 0;
    message.type = object.type ?? 0;
    message.action = object.action ?? 0;
    message.identity = object.identity ?? 0;
    message.publicKey = object.publicKey ?? new Uint8Array(0);
    message.data = object.data ?? new Uint8Array(0);
    message.signature = object.signature ?? new Uint8Array(0);
    message.from = object.from ?? new Uint8Array(0);
    message.to = object.to ?? new Uint8Array(0);
    return message;
  },
};

function createBaseZChat(): ZChat {
  return { messageData: '', clock: undefined };
}

export const ZChat = {
  encode(message: ZChat, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.messageData !== '') {
      writer.uint32(10).string(message.messageData);
    }
    if (message.clock !== undefined) {
      ClockInfo.encode(message.clock, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ZChat {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseZChat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.messageData = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.clock = ClockInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ZChat {
    return {
      messageData: isSet(object.messageData) ? globalThis.String(object.messageData) : '',
      clock: isSet(object.clock) ? ClockInfo.fromJSON(object.clock) : undefined,
    };
  },

  toJSON(message: ZChat): unknown {
    const obj: any = {};
    if (message.messageData !== '') {
      obj.messageData = message.messageData;
    }
    if (message.clock !== undefined) {
      obj.clock = ClockInfo.toJSON(message.clock);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ZChat>, I>>(base?: I): ZChat {
    return ZChat.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ZChat>, I>>(object: I): ZChat {
    const message = createBaseZChat();
    message.messageData = object.messageData ?? '';
    message.clock =
      object.clock !== undefined && object.clock !== null ? ClockInfo.fromPartial(object.clock) : undefined;
    return message;
  },
};

function createBaseMergeLog(): MergeLog {
  return {
    fromId: new Uint8Array(0),
    toId: new Uint8Array(0),
    startCount: '0',
    endCount: '0',
    sClock: undefined,
    eClock: undefined,
    mergeAt: '0',
  };
}

export const MergeLog = {
  encode(message: MergeLog, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fromId.length !== 0) {
      writer.uint32(10).bytes(message.fromId);
    }
    if (message.toId.length !== 0) {
      writer.uint32(18).bytes(message.toId);
    }
    if (message.startCount !== '0') {
      writer.uint32(24).uint64(message.startCount);
    }
    if (message.endCount !== '0') {
      writer.uint32(32).uint64(message.endCount);
    }
    if (message.sClock !== undefined) {
      Clock.encode(message.sClock, writer.uint32(42).fork()).ldelim();
    }
    if (message.eClock !== undefined) {
      Clock.encode(message.eClock, writer.uint32(50).fork()).ldelim();
    }
    if (message.mergeAt !== '0') {
      writer.uint32(56).uint64(message.mergeAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MergeLog {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMergeLog();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fromId = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.toId = reader.bytes();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.startCount = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.endCount = longToString(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sClock = Clock.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.eClock = Clock.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.mergeAt = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MergeLog {
    return {
      fromId: isSet(object.fromId) ? bytesFromBase64(object.fromId) : new Uint8Array(0),
      toId: isSet(object.toId) ? bytesFromBase64(object.toId) : new Uint8Array(0),
      startCount: isSet(object.startCount) ? globalThis.String(object.startCount) : '0',
      endCount: isSet(object.endCount) ? globalThis.String(object.endCount) : '0',
      sClock: isSet(object.sClock) ? Clock.fromJSON(object.sClock) : undefined,
      eClock: isSet(object.eClock) ? Clock.fromJSON(object.eClock) : undefined,
      mergeAt: isSet(object.mergeAt) ? globalThis.String(object.mergeAt) : '0',
    };
  },

  toJSON(message: MergeLog): unknown {
    const obj: any = {};
    if (message.fromId.length !== 0) {
      obj.fromId = base64FromBytes(message.fromId);
    }
    if (message.toId.length !== 0) {
      obj.toId = base64FromBytes(message.toId);
    }
    if (message.startCount !== '0') {
      obj.startCount = message.startCount;
    }
    if (message.endCount !== '0') {
      obj.endCount = message.endCount;
    }
    if (message.sClock !== undefined) {
      obj.sClock = Clock.toJSON(message.sClock);
    }
    if (message.eClock !== undefined) {
      obj.eClock = Clock.toJSON(message.eClock);
    }
    if (message.mergeAt !== '0') {
      obj.mergeAt = message.mergeAt;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MergeLog>, I>>(base?: I): MergeLog {
    return MergeLog.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MergeLog>, I>>(object: I): MergeLog {
    const message = createBaseMergeLog();
    message.fromId = object.fromId ?? new Uint8Array(0);
    message.toId = object.toId ?? new Uint8Array(0);
    message.startCount = object.startCount ?? '0';
    message.endCount = object.endCount ?? '0';
    message.sClock =
      object.sClock !== undefined && object.sClock !== null ? Clock.fromPartial(object.sClock) : undefined;
    message.eClock =
      object.eClock !== undefined && object.eClock !== null ? Clock.fromPartial(object.eClock) : undefined;
    message.mergeAt = object.mergeAt ?? '0';
    return message;
  },
};

function createBaseClock(): Clock {
  return { values: {} };
}

export const Clock = {
  encode(message: Clock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.values).forEach(([key, value]) => {
      Clock_ValuesEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Clock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = Clock_ValuesEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.values[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Clock {
    return {
      values: isObject(object.values)
        ? Object.entries(object.values).reduce<{ [key: string]: string }>((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: Clock): unknown {
    const obj: any = {};
    if (message.values) {
      const entries = Object.entries(message.values);
      if (entries.length > 0) {
        obj.values = {};
        entries.forEach(([k, v]) => {
          obj.values[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Clock>, I>>(base?: I): Clock {
    return Clock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Clock>, I>>(object: I): Clock {
    const message = createBaseClock();
    message.values = Object.entries(object.values ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseClock_ValuesEntry(): Clock_ValuesEntry {
  return { key: '', value: '0' };
}

export const Clock_ValuesEntry = {
  encode(message: Clock_ValuesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== '0') {
      writer.uint32(16).uint64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Clock_ValuesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClock_ValuesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Clock_ValuesEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : '',
      value: isSet(object.value) ? globalThis.String(object.value) : '0',
    };
  },

  toJSON(message: Clock_ValuesEntry): unknown {
    const obj: any = {};
    if (message.key !== '') {
      obj.key = message.key;
    }
    if (message.value !== '0') {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Clock_ValuesEntry>, I>>(base?: I): Clock_ValuesEntry {
    return Clock_ValuesEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Clock_ValuesEntry>, I>>(object: I): Clock_ValuesEntry {
    const message = createBaseClock_ValuesEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? '0';
    return message;
  },
};

function createBaseClockInfo(): ClockInfo {
  return { clock: undefined, id: new Uint8Array(0), messageId: new Uint8Array(0), count: '0', createAt: '0' };
}

export const ClockInfo = {
  encode(message: ClockInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clock !== undefined) {
      Clock.encode(message.clock, writer.uint32(10).fork()).ldelim();
    }
    if (message.id.length !== 0) {
      writer.uint32(18).bytes(message.id);
    }
    if (message.messageId.length !== 0) {
      writer.uint32(26).bytes(message.messageId);
    }
    if (message.count !== '0') {
      writer.uint32(32).uint64(message.count);
    }
    if (message.createAt !== '0') {
      writer.uint32(40).uint64(message.createAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClockInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClockInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clock = Clock.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.messageId = reader.bytes();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.count = longToString(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.createAt = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClockInfo {
    return {
      clock: isSet(object.clock) ? Clock.fromJSON(object.clock) : undefined,
      id: isSet(object.id) ? bytesFromBase64(object.id) : new Uint8Array(0),
      messageId: isSet(object.messageId) ? bytesFromBase64(object.messageId) : new Uint8Array(0),
      count: isSet(object.count) ? globalThis.String(object.count) : '0',
      createAt: isSet(object.createAt) ? globalThis.String(object.createAt) : '0',
    };
  },

  toJSON(message: ClockInfo): unknown {
    const obj: any = {};
    if (message.clock !== undefined) {
      obj.clock = Clock.toJSON(message.clock);
    }
    if (message.id.length !== 0) {
      obj.id = base64FromBytes(message.id);
    }
    if (message.messageId.length !== 0) {
      obj.messageId = base64FromBytes(message.messageId);
    }
    if (message.count !== '0') {
      obj.count = message.count;
    }
    if (message.createAt !== '0') {
      obj.createAt = message.createAt;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClockInfo>, I>>(base?: I): ClockInfo {
    return ClockInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClockInfo>, I>>(object: I): ClockInfo {
    const message = createBaseClockInfo();
    message.clock = object.clock !== undefined && object.clock !== null ? Clock.fromPartial(object.clock) : undefined;
    message.id = object.id ?? new Uint8Array(0);
    message.messageId = object.messageId ?? new Uint8Array(0);
    message.count = object.count ?? '0';
    message.createAt = object.createAt ?? '0';
    return message;
  },
};

function createBaseClockNode(): ClockNode {
  return {
    clock: undefined,
    id: new Uint8Array(0),
    messageId: new Uint8Array(0),
    count: '0',
    createAt: '0',
    rawMessage: new Uint8Array(0),
  };
}

export const ClockNode = {
  encode(message: ClockNode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clock !== undefined) {
      Clock.encode(message.clock, writer.uint32(10).fork()).ldelim();
    }
    if (message.id.length !== 0) {
      writer.uint32(18).bytes(message.id);
    }
    if (message.messageId.length !== 0) {
      writer.uint32(26).bytes(message.messageId);
    }
    if (message.count !== '0') {
      writer.uint32(32).uint64(message.count);
    }
    if (message.createAt !== '0') {
      writer.uint32(40).uint64(message.createAt);
    }
    if (message.rawMessage.length !== 0) {
      writer.uint32(50).bytes(message.rawMessage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClockNode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClockNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clock = Clock.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.messageId = reader.bytes();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.count = longToString(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.createAt = longToString(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.rawMessage = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClockNode {
    return {
      clock: isSet(object.clock) ? Clock.fromJSON(object.clock) : undefined,
      id: isSet(object.id) ? bytesFromBase64(object.id) : new Uint8Array(0),
      messageId: isSet(object.messageId) ? bytesFromBase64(object.messageId) : new Uint8Array(0),
      count: isSet(object.count) ? globalThis.String(object.count) : '0',
      createAt: isSet(object.createAt) ? globalThis.String(object.createAt) : '0',
      rawMessage: isSet(object.rawMessage) ? bytesFromBase64(object.rawMessage) : new Uint8Array(0),
    };
  },

  toJSON(message: ClockNode): unknown {
    const obj: any = {};
    if (message.clock !== undefined) {
      obj.clock = Clock.toJSON(message.clock);
    }
    if (message.id.length !== 0) {
      obj.id = base64FromBytes(message.id);
    }
    if (message.messageId.length !== 0) {
      obj.messageId = base64FromBytes(message.messageId);
    }
    if (message.count !== '0') {
      obj.count = message.count;
    }
    if (message.createAt !== '0') {
      obj.createAt = message.createAt;
    }
    if (message.rawMessage.length !== 0) {
      obj.rawMessage = base64FromBytes(message.rawMessage);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClockNode>, I>>(base?: I): ClockNode {
    return ClockNode.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClockNode>, I>>(object: I): ClockNode {
    const message = createBaseClockNode();
    message.clock = object.clock !== undefined && object.clock !== null ? Clock.fromPartial(object.clock) : undefined;
    message.id = object.id ?? new Uint8Array(0);
    message.messageId = object.messageId ?? new Uint8Array(0);
    message.count = object.count ?? '0';
    message.createAt = object.createAt ?? '0';
    message.rawMessage = object.rawMessage ?? new Uint8Array(0);
    return message;
  },
};

function createBaseNodeInfo(): NodeInfo {
  return { nodeIds: [] };
}

export const NodeInfo = {
  encode(message: NodeInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.nodeIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeIds.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NodeInfo {
    return {
      nodeIds: globalThis.Array.isArray(object?.nodeIds) ? object.nodeIds.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: NodeInfo): unknown {
    const obj: any = {};
    if (message.nodeIds?.length) {
      obj.nodeIds = message.nodeIds;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeInfo>, I>>(base?: I): NodeInfo {
    return NodeInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NodeInfo>, I>>(object: I): NodeInfo {
    const message = createBaseNodeInfo();
    message.nodeIds = object.nodeIds?.map(e => e) || [];
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, 'base64'));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString('base64');
  } else {
    const bin: string[] = [];
    arr.forEach(byte => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(''));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
    ? globalThis.Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : T extends {}
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
