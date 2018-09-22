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

* `hakka.search(query, [options])`: search entries
* `hakka.entry(index, [options])`: access to the entry 
* `hakka.appendix(indicator, type, [options])`: access to the appendix

### hakka.search(query, [options])

Search entries with a query and returns a promise with list of [Entry.Item](#entryitem).

### hakka.entry(index, [options])

Provide access to the appendix of MOE Hakka Dictionary by index and returns a promise with either a format of word or character's.

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
* `sounds`: pronounciations in 6 mainly Hakka dialects in Taiwan. See [Entry.MainSound](#entrymainsound).
* `another`: other pronounciations, including Vun-pag accents (文白讀). See [Entry.ItemSound](#entryitemsound).
* `meaning`: definition of the entry
* `mandarin`: gloss in Mandarin
* `pos`: part of speeches
* `variant`: a link to a table containing variant written forms form other references
* `synonym`: list of synonyms. See [Entry.Item](#entryitem).
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

### hakka.appendix(indicator, type, [options])

Provide access to the entry of MOE Hakka Dictionary by indicator and dialect type, and returns a promise with list of [Entry.AppSound](#entryappsound). Dialect type is the following:

* `1`: Xi-Ien dialect (四縣腔)
* `2`: Hoi-Liug dialect (海陸腔)
* `3`: Tai-Bu dialect (大埔腔)
* `4`: Ngiau-Pin dialect (饒平腔)
* `5`: Zhio-On dialect (詔安腔)
* `6`: Nam-Xi-Ian dialect (南四縣)

Options
---

### verbose

Default value is `true`. If the flag is set to be `false`, the return values will turn to be:

* `hakka.search`: list of [Proto.Item](#protoitem)
* `hakka.entry`: [Proto.Char](#protochar) or [Proto.Word](#protoword)
* `hakka.appendix`: list of [Proto.AppSound](#protoappsound)

Other Formats
---

### Entry.MainSound

``` ts
{
  type     : string,
  phonetic : string,
  vunpag?  : string,
  media    : string
}
```

* `type`: type of dialect
* `phonetic`: spelled in Hakka-ngi Phin-Yim Fong-On (客家語拼音方案) published in Taiwan in 2012
* `vunpag`: either '文讀' (vun-tug, literary reading) or '白讀' (pag-tug, colloquial reading)
* `media`: an uri to the sound of pronounciation

### Entry.ItemSound

``` ts
{
  type     : string,
  phonetic : string,
  vunpag?  : string,
  link?    : string
}
```
* `type`, `phonetic`, `vunpag`: see [Entry.MainSound](#entrymainsound)
* `link`: an uri to another entry

### Entry.AppSound

``` ts
{
  type     : string,
  phonetic : string,
  vunpag?  : string,
  text?    : string,
  media?   : string
}
```

* `type`, `phonetic`, `vunpag`, `media`: see [Entry.MainSound](#entrymainsound)
* `text`: title of the appendix

### Entry.Item

``` ts
{
  text  : string;
  link? : string;
}
```

* `link`: an uri to entry

### Proto.Word

``` ts
{
  title    : string,
  type     : string,
  index    : number,
  index_ap : string,
  sounds   : Proto.MainSound[],
  another  : Proto.ItemSound[],
  related  : { type : number }[],
  meaning  : string,
  mandarin : string,
  pos      : string[],
  variant  : boolean,
  synonym  : Item[],
  antonym  : Item[]
}
```

### Proto.Char

``` ts
{
  title    : string,
  type     : string,
  index    : number,
  index_ap : string,
  sounds   : Proto.MainSound[],
  another  : Proto.ItemSound[],
  related  : { type : number }[],
  meaning  : string,
  mandarin : string,
  radical  : string,
  stroke   : number[]
}
```

### Proto.MainSound

``` ts
{
  phonetic  : string,
  vunbag?   : string,
  type?     : number,
  hasmedia? : boolean
}
```

* `hasmedia`: indicate whether it has media or not

### Proto.ItemSound

``` ts
{
  phonetic : string,
  vunbag?  : string,
  type?    : number,
  index?   : number
}
```

* `phonetic`, `vunbag`, `type`: see [Proto.MainSound](#protomainsound)
* `index`: index to the entry

### Proto.AppSound

``` ts
{
  phonetic : string,
  vunbag?  : string,
  type?    : number,
  text?    : string,
  index?   : number
}
```

* `phonetic`, `vunbag`, `type`: see [Proto.MainSound](#protomainsound)
* `text`: title of the appendix
* `index`: index about media

License
---

MIT

[site]: https://hakka.dict.edu.tw/hakkadict/
[repo]: https://github.com/m80126colin/hakka-dict-toolkit/
[npm]: https://www.npmjs.com/package/hakka-dict-toolkit
