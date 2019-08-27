export namespace HakkaDictionayRaw {
  export type Item = {
    text   : string,
    index? : number
  }
  export interface Sound {
    phonetic : string,
    vunbag?  : string,
    type?    : number
  }
  export interface MainSound extends Sound {
    hasmedia? : boolean
  }
  export interface ItemSound extends Sound {
    index? : number
  }
  export interface AppSound  extends Sound {
    text?  : string,
    index? : number
  }
  export interface Entry {
    title    : string,
    type     : string,
    index    : number,
    index_ap : string,
    sounds   : MainSound[],
    another  : ItemSound[],
    related  : { type : number }[],
    meaning  : string,
    mandarin : string
  }
  export interface CharData extends Entry {
    radical : string,
    stroke  : number[]
  }
  export interface WordData extends Entry {
    pos     : string[],
    variant : boolean,
    synonym : Item[],
    antonym : Item[]
  }
}