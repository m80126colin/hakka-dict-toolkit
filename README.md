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

* `hakka.search(string, [options])`: search entries
* `hakka.entry(index, [options])`: access to the entry 
* `hakka.appendix(indicator, type, [options])`: access to the appendix

### hakka.entry(index, [options])

Provide access to the entry of MOE Hakka Dictionary by index and returns a promise with either a format of word or character's.

#### Return Format (word)

``` ts
{
  title    : string,
  sounds   : MainSound[],
  another  : ItemSound[],
  meaning  : string,
  mandarin : string,
  pos      : string[],
  variant  : string,
  synonym  : Item[],
  antonym  : Item[]
}
```

* `title`: title of the entry
* `sounds`: pronounciations in 6 mainly Hakka dialects in Taiwan. See [MainSound](#mainsound).
* `another`: other pronounciations, including Vun-pag accents (文白讀). See [ItemSound](#itemsound).
* `meaning`: definition of the entry
* `mandarin`: gloss in Mandarin
* `pos`: part of speeches
* `variant`: a link to a table containing variant written forms form other references
* `synonym`: list of synonyms. See [Item](#entryitem).
* `antonym`: similar as above

#### Return Format (character)

``` ts
{
  title    : string,
  sounds   : MainSound[],
  another  : ItemSound[],
  meaning  : string,
  mandarin : string
  radical  : string,
  stroke   : number[]
}
```

* `radical`: an important component of Sinitic character to look up (部首)
* `stroke`: two numbers indicating stroke count of Sinitic character excluding radical and including radical, respectively

### Formats

#### MainSound

``` ts
{
  type     : string,
  phonetic : string,
  vunpag?  : string
  media    : string
}
```

* `type`: type of dialect
* `phonetic`: spelled in Hakka-ngi Phin-Yim Fong-On (客家語拼音方案) published in Taiwan in 2012
* `vunpag`: either '文讀' (vun-tug, literary reading) or '白讀' (pag-tug, colloquial reading)
* `media`: an uri to the sound of pronounciation

#### ItemSound

``` ts
{
  type     : string,
  phonetic : string,
  vunpag?  : string
  link? : string
}
```

* `link`: an uri to another entry

#### Item

``` ts
{
  text  : string;
  link? : string;
}
```

* `link`: an uri to entry

License
---

MIT

[site]: https://hakka.dict.edu.tw/hakkadict/
[repo]: https://github.com/m80126colin/hakka-dict-toolkit/
[npm]: https://www.npmjs.com/package/hakka-dict-toolkit
