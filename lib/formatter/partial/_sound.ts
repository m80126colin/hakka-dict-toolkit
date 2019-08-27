import * as _ from 'lodash';

import * as util from '@/util';
import { accent } from '@/assets/accent';
import { HakkaDictProtoType } from '@/types';

const list = _.chain(accent)
  .flatMap(({ name : value, abbr }) => _.map(abbr, tag => {
    return { tag, value }
  }))
  .concat([
    { tag: '文', value: '文讀' },
    { tag: '白', value: '白讀' }
  ])
  .value()
const pattern = _.chain(list).map(o => o.tag).join('').value()
/**
 * Format accent with vunpag tags (文白讀) and accent tags if exists.
 *
 * @param {string} text
 * @returns {HakkaDictProtoType.Sound[]} an array of accents
 */
const format = (text : string) : HakkaDictProtoType.Sound[] => {
  const regexp = new RegExp(`([${pattern}]|[0-9a-zA-Z ]+)`, 'ug')
  const temp   = _.flatMap(text.match(/([^、]+)/ug), str => _.chain(str.match(regexp))
    .map(_.trim)
    .compact()
    .value())
  let state : { vunpag? : number, type? : number } = {}
  return _.chain(temp)
    .map(value => _.chain(value)
      .split(/\s+/)
      .compact()
      .join(' ')
      .value())
    .reverse()
    .map(value => {
      // set the state with either literary (文讀) or colloquial (白讀) reading
      const idx_vunpag = _.findIndex(list, o => o.tag === value, 9)
      if (idx_vunpag > -1) {
        state.vunpag = idx_vunpag
        return undefined
      }
      // set the state with type of accents
      const idx_accent = _.findIndex(list, o => o.tag === value)
      if (idx_accent > -1) {
        state.type   = idx_accent
        return undefined
      }
      // convert by format
      const result : HakkaDictProtoType.Sound = _.chain(state)
        .mapValues((idx, key) => (key === 'type') ? util.accent.lookup(list[idx].value) : list[idx].value)
        .assign({ phonetic: value })
        .value()
      return result
    })
    .reverse()
    .compact()
    .value()
}

export { format }