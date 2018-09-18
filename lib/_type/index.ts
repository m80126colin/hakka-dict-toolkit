export namespace HakkaDict {
  export interface Filter {
    (context : string) : string
  }

  export enum ExtractDataType {
    Media = 'media',
    Link  = 'link',
    Text  = 'text'
  }

  export type ExtractData = {
    type  : ExtractDataType,
    text? : string,
    link? : string
  }

  export class Extracter {
    tag     : string;
    mark    : string;
    type    : ExtractDataType;
    handler : (jQuery : CheerioStatic, context : CheerioElement) => ExtractData[];
    constructor(tag : string, mark : string, type : ExtractDataType, handler : (jQuery : CheerioStatic, context : CheerioElement) => ExtractData[]) {
      this.tag     = tag;
      this.mark    = mark;
      this.type    = type;
      this.handler = handler;
    }
  }

  export type EntryItem = {
    text   : string;
    link?  : string;
    index? : number;
  }
  
  export type Sound = {
    type?    : string;
    phonetic : string;
    media?   : string;
    related? : string;
    vunpag?  : string;
  }
  
  export interface BasicEntry {
    title     : string,
    type      : string,
    sounds    : Sound[],
    meaning   : string,
    mandarin? : string,
    another?  : Sound[]
  }
  
  export interface CharacterEntry extends BasicEntry {
    radical? : string,
    stroke?  : number[]
  }
  
  export interface WordEntry extends BasicEntry {
    pos?     : string[],
    variant? : string,
    synonym? : EntryItem[],
    antonym? : EntryItem[]
  }
}