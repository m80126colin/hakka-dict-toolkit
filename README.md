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
  sounds   : Entry.MainSound[],
  another  : Entry.ItemSound[],
  meaning  : string,
  mandarin : string,
  pos      : string[],
  variant  : string,
  synonym  : Entry.Item[],
  antonym  : Entry.Item[]
}
```

* `title`: title of the entry
* `sounds`: pronounciations in 6 main Hakka dialects in Taiwan. See [Entry.MainSound](#entrymainsound).
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
  sounds   : Entry.MainSound[],
  another  : Entry.ItemSound[],
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

See [Hakka Dialects](#hakka-dialects).

Options
---

### verbose (boolean)

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

* `type`: type of dialect, see [Hakka Dialects](#hakka-dialects)
* `phonetic`: spelled by Hakka-ngi Phin-Yim Fong-On, see [Romanisation](#romanisation)
* `vunpag`: either `'文讀'` or `'白讀'`, see [Literary Readings and Colloquial Readings](literary-readings-and-colloquial-readings-文白異讀)
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
  synonym  : Proto.Item[],
  antonym  : Proto.Item[]
}
```

* `title`: title of the entry
* `type`: `word`, indicating the type of return value
* `sounds`: pronounciations in 6 main Hakka dialects in Taiwan. See [Proto.MainSound](#protomainsound).
* `another`: other pronounciations, including Vun-pag accents (文白讀). See [Proto.ItemSound](#protoitemsound).
* `meaning`: definition of the entry
* `mandarin`: gloss in Mandarin
* `pos`: part of speeches
* `variant`: indicate whether the entry exists the link about variant written form
* `synonym`: list of synonyms. See [Proto.Item](#protoitem).
* `antonym`: similar as above

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

* `type`: `character`, indicating the type of return value
* `radical`: an important component of Sinitic character to look up (部首)
* `stroke`: two numbers indicating stroke count of Sinitic character excluding radical and including radical, respectively

### Proto.MainSound

``` ts
{
  phonetic  : string,
  vunbag?   : string,
  type?     : number,
  hasmedia? : boolean
}
```

* `type`: type of dialect, see [Hakka Dialects](#hakka-dialects)
* `phonetic`: spelled by Hakka-ngi Phin-Yim Fong-On, see [Romanisation](#romanisation)
* `vunpag`: either `'文讀'` or `'白讀'`, see [Literary Readings and Colloquial Readings](literary-readings-and-colloquial-readings-文白異讀)
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

### Proto.Item

``` ts
{
  text   : string,
  index? : number
}
```

* `text`: title of the entry
* `index`: index to the entry

Misc
---

### Romanisation

The romanisation is called [Hakka-ngi Phin-Yim Fong-On](https://ws.moe.edu.tw/Download.ashx?u=C099358C81D4876C9D87E4835F9287C8E804826AA0BBAC116FDDD09213D47224C65D7C4B9E7E96854E511221BDA745F75EC872EF3E39AD9E&n=7943FD1CFE79AA2AA97DB40E60641199FD1A8116E2843D28&icon=..pdf) (客家語拼音方案), published by MOE in Taiwan in 2012.

### Literary Readings and Colloquial Readings (文白異讀)

A relative notation between distinct reading forms to the identical character, called **Literary Reading** (Vun-tug, 文讀) and **Colloquial Reading** (Pag-tug, 白讀), is mainly used in languages in Sinitic family. Generally, tag `'文讀'` indicates the reading form is used in formal situation or is later introduced in the phonological system, whereas tag `'白讀'` often indicates the reading form is used in informal situation or is former introduced or original in the phonological system.

For example, character **生** (life, fresh, raw, unacquaintance), in Xi-Ien Hakka, has two reading forms: literary reading *sen24 (sɛn˨˦)* and colloquial form *sang24 (saŋ˨˦)*.

### Hakka Dialects

There are 6 main Hakka dialects recognized in Taiwan:

1. Xi-Ien dialect (四縣腔)
2. Hoi-Liug dialect (海陸腔)
3. Tai-Bu dialect (大埔腔)
4. Ngiau-Pin dialect (饒平腔)
5. Zhio-On dialect (詔安腔)
6. Nam-Xi-Ian dialect (南四縣)

License
---

MIT

[site]: https://hakka.dict.edu.tw/hakkadict/
[repo]: https://github.com/m80126colin/hakka-dict-toolkit/
[npm]: https://www.npmjs.com/package/hakka-dict-toolkit
