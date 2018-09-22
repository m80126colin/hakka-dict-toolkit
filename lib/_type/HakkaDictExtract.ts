export namespace HakkaDictExtract {
  export enum DataType {
    Media = 'media',
    Link  = 'link',
    Text  = 'text'
  }
  export type Data = {
    type  : DataType,
    text? : string,
    link? : string
  }
  export class Extracter {
    tag     : string;
    mark    : string;
    type    : DataType;
    handler : (jQuery : CheerioStatic, context : CheerioElement) => Data[];
    constructor(tag : string, mark : string, type : DataType, handler : (jQuery : CheerioStatic, context : CheerioElement) => Data[]) {
      this.tag     = tag;
      this.mark    = mark;
      this.type    = type;
      this.handler = handler;
    }
  }
}