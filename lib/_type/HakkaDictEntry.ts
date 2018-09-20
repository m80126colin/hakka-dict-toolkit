export namespace HakkaDictEntry {
  export type Item = {
    text  : string;
    link? : string;
  }
  export type Appendix = {
    type : string,
    link : string
  }
  interface Sound {
    type     : string,
    phonetic : string,
    vunpag?  : string
  }
  export interface MainSound extends Sound {
    media : string
  }
  export interface ItemSound extends Sound {
    link? : string
  }
  export interface AppSound  extends Sound {
    text?  : string,
    media? : string
  }
  export interface BasicForm {
    title    : string,
    sounds   : MainSound[],
    another  : ItemSound[],
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