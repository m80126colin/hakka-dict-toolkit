export namespace HakkaDictProtoType {
  export type Item = {
    text   : string;
    index? : number;
  }
  export type Sound = {
    phonetic : string;
    vunpag?  : string;
    type?    : number;
    id?      : string;
  }
  export interface BasicForm {
    title     : string,
    type      : string,
    sounds    : Sound[],
    meaning   : string,
    mandarin? : string,
    another?  : Sound[]
  }
  export interface Char extends BasicForm {
    radical? : string,
    stroke?  : number[]
  }
  export interface Word extends BasicForm {
    pos?     : string[],
    variant? : string,
    synonym? : Item[],
    antonym? : Item[]
  }
}