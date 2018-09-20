export namespace HakkaDictEntry {
  export type Item = {
    text  : string;
    link? : string;
  }
  export type Appendix = {
    type : string,
    link : string
  }
  interface BasicSound {
    type     : string,
    phonetic : string,
    vunpag?  : string
  }
  export interface MainSound extends BasicSound {
    media : string
  }
  export interface ItemSound extends BasicSound {
    link : string
  }
  interface BasicForm {
    title    : string,
    another  : ItemSound[],
    sounds   : MainSound[],
    meaning  : string,
    mandarin : string
  }
  export interface Char extends BasicForm {
    radical : string,
    stroke  : number[]
  }
  export interface Word extends BasicForm {
    pos     : string[],
    variant : string,
    synonym : Item[],
    antonym : Item[]
  }
}