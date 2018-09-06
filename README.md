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

``` js
var hakka = require('hakka-dict-toolkit')

hakka.entry(10377)
```

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
* `sounds`: see [Sound](#entry-sound)

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

#### [Sound](#entry-sound)

``` ts
{
  type?    : string;
  phonetic : string;
  media?   : string;
  related? : string;
  vunpag?  : string;
}
```

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
