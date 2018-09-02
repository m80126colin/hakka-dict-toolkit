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