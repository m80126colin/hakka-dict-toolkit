import another from "./partial/another";

export type EntryItem = {
  text  : string;
  link? : string;
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
  use?     : string,
  synonym? : EntryItem[],
  antonym? : EntryItem[]
}