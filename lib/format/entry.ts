import * as _       from 'lodash';
import * as cheerio from 'cheerio';

import extract  from '../extract';
import partial  from './partial';
import { host } from '../util';
import { ExtractData, ExtractDataType } from '../extract/_type';
import { Sound, BasicEntry, CharacterEntry, WordEntry } from './_type';

const makeAnother = (data : ExtractData[][]) : Sound[] => {
  // vunpag accents
  const vunpag = _.chain(data[10])
    .tail()
    .flatMap(acc => partial.another([acc]))
    .value()
  // multiple accents
  const multi_accents = _.chain(data[12])
    .tail()
    .chunk(2)
    .flatMap(partial.another)
    .value()
  return _.concat([], vunpag, multi_accents)
}

const makeBasicEntry = (data : ExtractData[][]) : BasicEntry => {
  let basic = {
    title:   partial.title(data[0][1]).text,
    type:    (data[0][2].text.match('詞性') === null) ? 'character' : 'word',
    sounds:  _.map(_.range(1, 1 + 6), idx => partial.sound(data[idx])),
    meaning: data[7][1].text
  }
  const another = makeAnother(data)
  if (another.length > 0)
    _.assign(basic, { another })
  // mandarin translation
  if (data[13].length > 1)
    _.assign(basic, { mandarin: data[13][1].text })
  return basic
}

const makeCharacterEntry = (data : ExtractData[][], basic : BasicEntry) : CharacterEntry => {
  let character : CharacterEntry = _.merge({}, basic)
  //
  const radical = _.split(data[0][2].text, /:\s*/u)[1]
  if (radical.length > 0)
    _.assign(character, { radical })
  // numbers of stroke excluding and including radical
  const stroke = _.split(data[0][3].text, /:\s*/u)[1]
  if (stroke.length > 0)
    _.assign(character, { stroke: _
      .chain(stroke)
      .split('-')
      .map(s => parseInt(s))
      .value()
    })
  return character
}

const makeWordEntry = (data : ExtractData[][], basic : BasicEntry) : WordEntry => {
  let word : WordEntry = _.merge({}, basic)
  // part of speech
  const pos = _.chain(data[0][2].text)
    .split(/:?\s+/u)
    .tail()
    .value()
  if (pos.length > 0)
    _.assign(word, { pos })
  //
  if (data[0][3].type === ExtractDataType.Link) {
    const use = `${host}/${data[0][3].link.match(/open\u0028\u0027([^']+)/u)[1]}`
    _.assign(word, { use })
  }
  // synonym
  const synonym = _.chain(data[8]).tail().map(partial.title).value()
  if (synonym.length > 0)
    _.assign(word, { synonym })
  // antonym
  const antonym = _.chain(data[9]).tail().map(partial.title).value()
  if (antonym.length > 0)
    _.assign(word, { antonym })
  return word
}

export default (context : string) : CharacterEntry | WordEntry => {
  const $    = cheerio.load(context)
  const rows = $('font > table.t14 > tbody > tr', context)
  const data = _.map(rows, (row, idx) => {
    if (idx !== 12)
      return _.flatMap($('tr > td', row), data => extract(data))
    // for special format field 'multiple accents (多音字)'
    return _.concat(
      extract($('tr > td', row)[0]),
      _.flatMap($('tr', $(row)), data => extract(data)))
  })
  console.log(data)
  /** BasicEntry */
  const basic = makeBasicEntry(data)
  /** make CharacterEntry */
  if (basic.type === 'character') {
    return makeCharacterEntry(data, basic)
  }
  /** make WordEntry */
  return makeWordEntry(data, basic)
}