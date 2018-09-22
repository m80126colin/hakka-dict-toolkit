hakka-dict-toolkit
===

[![NPM version](https://badge.fury.io/js/hakka-dict-toolkit.svg)][npm]
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)][repo]

A toolkit for [Taiwan Hakka Dictionary][site].

Installation
---

```
yarn add hakka-dict-toolkit
```

or

```
npm install hakka-dict-toolkit --save
```

Usage
---

### Overview

``` js
var hakka = require('hakka-dict-toolkit')
// search query
hakka.search('客')
// access entry via index
hakka.entry(10377)
// appendix in the entry 10377
hakka.appendix('03002-001', 3)
```

* `hakka.search(string, [options])`
* `hakka.entry(index, [options])`
* `hakka.appendix(string, type, [options])`

### hakka.entry(index)

Provide access to the entry of MOE Hakka Dictionary by index and returns a promise with either a format of word or character's.

#### Return Format (word)

``` ts
{
  title     : string,
  type      : string,
  sounds    : Sound[],
  meaning   : string,
  mandarin? : string,
  another?  : Sound[],
  pos?      : string[],
  variant?  : string,
  synonym?  : EntryItem[],
  antonym?  : EntryItem[]
}
```

* `title`: title of the entry
* `type`: `'word'`, indicate the type of return format
* `sounds`: pronounciations in 6 mainly Hakka dialects in Taiwan. See [Sound](#sound).
* `meaning`: definition of the entry
* `mandarin`: gloss in Mandarin
* `another`: other pronounciations, including Vun-pag accents (文白讀)
* `pos`: part of speeches
* `variant`: a link to a table containing variant written forms form other references
* `synonym`: list of synonyms. See [EntryItem](#entryitem).
* `antonym`: similar as above

#### Return Format (character)

``` ts
{
  title     : string,
  type      : string,
  sounds    : Sound[],
  meaning   : string,
  mandarin? : string,
  another?  : Sound[],
  radical?  : string,
  stroke?   : number[]
}
```

* `type`: `'character'`, indicate the type of return format
* `radical`: an important component of Sinitic character to look up (部首)
* `stroke`: two numbers indicating stroke count of Sinitic character excluding radical and including radical, respectively

#### Sound

``` ts
{
  type?    : string;
  phonetic : string;
  media?   : string;
  related? : string;
  vunpag?  : string;
}
```

* `type`: type of dialect
* `phonetic`: spelled in Hakka-ngi Phin-Yim Fong-On (客家語拼音方案) published in Taiwan in 2012
* `media`: sound of pronounciation
* `related`: a link to a table including similar synonyms
* `vunpag`: either '文讀' (vun-tug, literary reading) or '白讀' (pag-tug, colloquial reading)

#### EntryItem

``` ts
{
  text  : string;
  link? : string;
}
```

License
---

MIT

[site]: https://hakka.dict.edu.tw/hakkadict/
[repo]: https://github.com/m80126colin/hakka-dict-toolkit/
[npm]: https://www.npmjs.com/package/hakka-dict-toolkit
