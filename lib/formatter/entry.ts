import * as _       from 'lodash';

import partial  from './partial';
import { host } from '../util';
import { HakkaDict } from '../_type';
/**
 * Format other accents into an array with following fields:
 *    1. Vun-pag accents (文白讀),
 *    2. another accents (又音),
 *    3. multiple-accent words (多音字).
 *
 * @param {HakkaDict.ExtractData[][]} data
 * @returns {HakkaDict.Sound[]}
 */
const makeAnother = (data : HakkaDict.ExtractData[][]) : HakkaDict.Sound[] => {
  // vunpag accents
  const vunpag = _.chain(data[10])
    .tail()
    .flatMap(acc => partial.another([acc]))
    .value()
  // another accents
  const another = _.chain(data[11])
    .tail()
    .chunk(2)
    .flatMap(partial.another)
    .value()
  // multiple accents
  const multi_accents = _.chain(data[12])
    .tail()
    .chunk(2)
    .flatMap(partial.another)
    .value()
  return _.concat([], vunpag, another, multi_accents)
}
/**
 * Format synonym or antonym into an array of EntryItem.
 *
 * @param {HakkaDict.ExtractData[]} data
 * @returns {HakkaDict.EntryItem[]}
 */
const makeSemantics = (data : HakkaDict.ExtractData[]) : HakkaDict.EntryItem[] => _.chain(data)
  .tail()
  .map(item => partial.item(item))
  .compact()
  .value()
/**
 * Format following fields that exists in both word and character:
 *    1. title (詞目),
 *    2. main 6 accents in the entry: Xi-Ien (四縣), Hoi-Liug (海陸), Tai-Bu (大埔),
 *       Ngiau-Pin (饒平), Zhio-On (詔安), Nam-Xi-Ian (南四縣),
 *    3. meanings of entry,
 *    4. mandarin translation,
 *    5. other accents different from main 6 accents.
 * And check the type of entry.
 *
 * @param {HakkaDict.ExtractData[][]} data
 * @returns {HakkaDict.BasicEntry}
 */
const makeBasicEntry = (data : HakkaDict.ExtractData[][]) : HakkaDict.BasicEntry => {
  let basic = {
    title:   partial.item(data[0][1]).text,
    type:    (data[0][2].text.match('詞性') === null) ? 'character' : 'word',
    sounds:  _.chain(_.range(1, 1 + 6))
      .map(idx => {
        const res = partial.sound(_.tail(data[idx]))
        if (_.toPairs(res).length === 0)
          return undefined
        return _.merge(res, { type: data[idx][0].text })
      })
      .compact()
      .value(),
    meaning: data[7][1].text
  }
  // another accents
  const another = makeAnother(data)
  if (another.length > 0)
    _.assign(basic, { another })
  // mandarin translation
  if (data[13].length > 1)
    _.assign(basic, { mandarin: data[13][1].text })
  return basic
}
/**
 * Format fields only appeared in character entry:
 *    1. radical,
 *    2. strokes.
 *
 * @param {HakkaDict.ExtractData[][]} data
 * @param {HakkaDict.BasicEntry} basic
 * @returns {HakkaDict.CharacterEntry}
 */
const makeCharacterEntry = (data : HakkaDict.ExtractData[][], basic : HakkaDict.BasicEntry) : HakkaDict.CharacterEntry => {
  let character : HakkaDict.CharacterEntry = _.merge({}, basic)
  // radical
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
/**
 * Format fields only appeared in word entry:
 *    1. part of speech,
 *    2. the variant form used in other references (各家用字表),
 *    3. synonym,
 *    4. antonym.
 *
 * @param {HakkaDict.ExtractData[][]} data
 * @param {HakkaDict.BasicEntry} basic
 * @returns {HakkaDict.WordEntry}
 */
const makeWordEntry = (data : HakkaDict.ExtractData[][], basic : HakkaDict.BasicEntry) : HakkaDict.WordEntry => {
  let word : HakkaDict.WordEntry = _.merge({}, basic)
  // part of speech
  const pos = _.chain(data[0][2].text)
    .split(/:?\s+/u)
    .tail()
    .value()
  if (pos.length > 0)
    _.assign(word, { pos })
  //
  if (data[0][3].type === HakkaDict.ExtractDataType.Link) {
    const variant = `${host}/${data[0][3].link.match(/open\u0028\u0027([^']+)/u)[1]}`
    _.assign(word, { variant })
  }
  // synonym
  const synonym = makeSemantics(data[8])
  if (synonym.length > 0)
    _.assign(word, { synonym })
  // antonym
  const antonym = makeSemantics(data[9])
  if (antonym.length > 0)
    _.assign(word, { antonym })
  return word
}

export default (data : HakkaDict.ExtractData[][]) : HakkaDict.CharacterEntry | HakkaDict.WordEntry => {
  const basic = makeBasicEntry(data)
  if (basic.type === 'character')
    return makeCharacterEntry(data, basic)
  return makeWordEntry(data, basic)
}