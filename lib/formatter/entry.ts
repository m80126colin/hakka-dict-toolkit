import * as _    from 'lodash';

import partial   from './partial';
import * as util from '../util';
import { HakkaDictExtract, HakkaDictProtoType } from '../_type';
/**
 * Format other accents into an array with following fields:
 *    1. Vun-pag accents (文白讀), aka literary reading (文讀) and colloquial reading (白讀)
 *    2. another accents (又音),
 *    3. multiple-accent words (多音字).
 *
 * @param {HakkaDictExtract.Data[][]} data
 * @returns {HakkaDictProtoType.ItemSound[]}
 */
const collectAnotherSound = (data : HakkaDictExtract.Data[][]) : HakkaDictProtoType.ItemSound[] => {
  const vunpag = [ _.tail(data[10]) ]
  const another = _.chain(data[11]).tail().chunk(2).value()
  const multi   = _.chain(data[12]).tail().chunk(2).value()
  // result
  const result : HakkaDictExtract.Data[][] = []
  return _.chain(result)
    .concat(vunpag, another, multi)
    .flatMap(partial.itemsound)
    .value()
}
/**
 * Format synonym or antonym into an array of HakkaDictProtoType.Item.
 *
 * @param {HakkaDictExtract.Data[]} data
 * @returns {HakkaDictProtoType.Item[]}
 */
const collectSemantics = (data : HakkaDictExtract.Data[]) : HakkaDictProtoType.Item[] => _.chain(data)
  .tail()
  .map(partial.item)
  .compact()
  .value()
/**
 * Format following fields that exists in both word and character:
 *    1. title (詞目),
 *    2. index of the entry, which will be used to the link of media of accents,
 *    3. index of the appendix (相關資料連結) and variant form (各家用字表),
 *    4. main 6 accents in the entry: Xi-Ien (四縣), Hoi-Liug (海陸), Tai-Bu (大埔),
 *       Ngiau-Pin (饒平), Zhio-On (詔安), Nam-Xi-Ian (南四縣),
 *    5. other accents different from main 6 accents,
 *    6. meanings of entry,
 *    7. mandarin translation.
 * And check the entry which is either character or word.
 * @see HakkaDictProtoType.BasicForm
 *
 * @param {HakkaDict.ExtractData[][]} data
 * @returns {HakkaDictProtoType.BasicForm}
 */
const makeBasicForm = (data : HakkaDictExtract.Data[][], index : number) : HakkaDictProtoType.BasicForm => {
  // main accents
  const collect_sounds = _.chain(_.range(1, 1 + 6))
    .map(idx => {
      const res = partial.mainsound(data[idx])
      if (!res.phonetic)
        return undefined
      return res
    })
    .compact()
    .value()
  // related and index_ap
  const related_sounds = _.chain(_.range(1, 1 + 6))
    .map(idx => {
      const r = _.filter(data[idx], (ext : HakkaDictExtract.Data) => ext.type === HakkaDictExtract.DataType.Link)
      if (r.length === 0)
        return undefined
      return {
        type:  util.accent.lookup(data[idx][0].text),
        index: _.head(r).link.match(/idno=(\d+)/u)[1]
      }
    })
    .compact()
    .value()
  // another accents
  const another = collectAnotherSound(data)
  // basic form
  return {
    title: partial.item(data[0][1]).text,
    type: (data[0][2].text.match('詞性') === null) ? 'character' : 'word',
    index,
    index_ap: _.chain(related_sounds).map(r => r.index).concat('').head().value(),
    sounds: collect_sounds,
    another: (another.length > 0) ? another : [],
    related: _.map(related_sounds, r => _.pick(r, ['type'])),
    meaning: data[7][1].text,
    mandarin: (data[13].length > 1) ? data[13][1].text : ''
  }
}
/**
 * Format fields only appeared in character entry:
 *    1. radical,
 *    2. strokes.
 * @see HakkaDictProtoType.Char
 *
 * @param {HakkaDictExtract.Data[][]} data
 * @param {HakkaDictProtoType.BasicForm} basic
 * @returns {HakkaDictProtoType.Char}
 */
const makeCharacterEntry = (data : HakkaDictExtract.Data[][], basic : HakkaDictProtoType.BasicForm) : HakkaDictProtoType.Char => {
  // radical
  const radical = _.split(data[0][2].text, /:\s*/u)[1]
  // numbers of stroke excluding and including radical
  const stroke = _.split(data[0][3].text, /:\s*/u)[1]
  return _.merge(basic, {
    radical,
    stroke: (stroke.length > 0) ? _.chain(stroke).split('-').map(s => parseInt(s)).value() : []
  })
}
/**
 * Format fields only appeared in word entry:
 *    1. part of speech,
 *    2. the variant form used in other references (各家用字表),
 *    3. synonym,
 *    4. antonym.
 * @see HakkaDictProtoType.Word
 *
 * @param {HakkaDictExtract.Data[][]} data
 * @param {HakkaDictProtoType.BasicForm} basic
 * @returns {HakkaDictProtoType.Word}
 */
const makeWordEntry = (data : HakkaDictExtract.Data[][], basic : HakkaDictProtoType.BasicForm) : HakkaDictProtoType.Word => {
  // part of speech
  const pos = _.chain(data[0][2].text)
    .split(/:?\s+/u)
    .tail()
    .value()
  // variant
  const variant  = data[0][3].type === HakkaDictExtract.DataType.Link
  const index_ap = ((variant) ? data[0][3].link.match(/wordiffquery=([0-9\-]+)/u)[1] : '') || basic.index_ap
  // synonym & antonym
  const synonym = collectSemantics(data[8])
  const antonym = collectSemantics(data[9])
  return _.merge(basic, {
    index_ap,
    pos,
    variant,
    synonym,
    antonym
  })
}

export default (index : number, data : HakkaDictExtract.Data[][]) : (HakkaDictProtoType.Char | HakkaDictProtoType.Word) => {
  const basic = makeBasicForm(data, index)
  if (basic.type === 'character')
    return makeCharacterEntry(data, basic)
  return makeWordEntry(data, basic)
}