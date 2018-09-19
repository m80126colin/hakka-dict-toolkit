export namespace HakkaDictEntry {
  export interface Item {
    text   : string;
    link?  : string;
    index? : number;
  }
  export interface Sound {
    phonetic : string;
    type?    : string;
    media?   : string;
    vunpag?  : string;
    related? : string;
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