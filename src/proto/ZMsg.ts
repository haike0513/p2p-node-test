/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "protos";

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
    case "U_TYPE_CLI":
      return ZIdentity.U_TYPE_CLI;
    case 1:
    case "U_TYPE_SER":
      return ZIdentity.U_TYPE_SER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ZIdentity.UNRECOGNIZED;
  }
}

export function zIdentityToJSON(object: ZIdentity): string {
  switch (object) {
    case ZIdentity.U_TYPE_CLI:
      return "U_TYPE_CLI";
    case ZIdentity.U_TYPE_SER:
      return "U_TYPE_SER";
    case ZIdentity.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
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
    case "Z_TYPE_READ":
      return ZAction.Z_TYPE_READ;
    case 1:
    case "Z_TYPE_WRITE":
      return ZAction.Z_TYPE_WRITE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ZAction.UNRECOGNIZED;
  }
}

export function zActionToJSON(object: ZAction): string {
  switch (object) {
    case ZAction.Z_TYPE_READ:
      return "Z_TYPE_READ";
    case ZAction.Z_TYPE_WRITE:
      return "Z_TYPE_WRITE";
    case ZAction.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
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
    case "Z_TYPE_DM":
      return ZPushType.Z_TYPE_DM;
    case 1:
    case "Z_TYPE_BC":
      return ZPushType.Z_TYPE_BC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ZPushType.UNRECOGNIZED;
  }
}

export function zPushTypeToJSON(object: ZPushType): string {
  switch (object) {
    case ZPushType.Z_TYPE_DM:
      return "Z_TYPE_DM";
    case ZPushType.Z_TYPE_BC:
      return "Z_TYPE_BC";
    case ZPushType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ZType {
  Z_TYPE_RNG = 0,
  Z_TYPE_EVENT = 1,
  Z_TYPE_CLOCK = 2,
  Z_TYPE_GATEWAY = 3,
  UNRECOGNIZED = -1,
}

export function zTypeFromJSON(object: any): ZType {
  switch (object) {
    case 0:
    case "Z_TYPE_RNG":
      return ZType.Z_TYPE_RNG;
    case 1:
    case "Z_TYPE_EVENT":
      return ZType.Z_TYPE_EVENT;
    case 2:
    case "Z_TYPE_CLOCK":
      return ZType.Z_TYPE_CLOCK;
    case 3:
    case "Z_TYPE_GATEWAY":
      return ZType.Z_TYPE_GATEWAY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ZType.UNRECOGNIZED;
  }
}

export function zTypeToJSON(object: ZType): string {
  switch (object) {
    case ZType.Z_TYPE_RNG:
      return "Z_TYPE_RNG";
    case ZType.Z_TYPE_EVENT:
      return "Z_TYPE_EVENT";
    case ZType.Z_TYPE_CLOCK:
      return "Z_TYPE_CLOCK";
    case ZType.Z_TYPE_GATEWAY:
      return "Z_TYPE_GATEWAY";
    case ZType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
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
    message.message = (object.message !== undefined && object.message !== null)
      ? ZMessage.fromPartial(object.message)
      : undefined;
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

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
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
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
