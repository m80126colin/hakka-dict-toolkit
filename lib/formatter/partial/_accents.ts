import * as _ from 'lodash';

import { Sound } from '../_type';

const list = [
  { tag: '四', value: '四縣音' },
  { tag: '海', value: '海陸音' },
  { tag: '大', value: '大埔音' },
  { tag: '埔', value: '大埔音' },
  { tag: '饒', value: '饒平音' },
  { tag: '平', value: '饒平音' },
  { tag: '詔', value: '詔安音' },
  { tag: '安', value: '詔安音' },
  { tag: '南', value: '南四縣' },
  { tag: '文', value: '文讀' },
  { tag: '白', value: '白讀' }
]
const pattern = _.chain(list).map(o => o.tag).join('').value()

const formatter = (text : string) : Sound[] => {
  const temp = text.match(new RegExp(`([${pattern}]|[0-9a-zA-Z ]+)`, 'ug'))
  let state : { vunpag? : number, accent? : number } = {}
  return _.chain(temp)
    .map(value => _.chain(value)
      .split(/\s+/)
      .compact()
      .join(' ')
      .value())
    .reverse()
    .map(value => {
      const idx_vunpag = _.findIndex(list, o => o.tag === value, 9)
      if (idx_vunpag > -1) {
        state.vunpag = idx_vunpag
        return undefined
      }
      const idx_accent = _.findIndex(list, o => o.tag === value)
      if (idx_accent > -1) {
        state.accent = idx_accent
        return undefined
      }
      const result : Sound = _.chain(state)
        .mapValues(idx => list[idx].value)
        .assign({ phonetic: value })
        .value()
      return result
    })
    .reverse()
    .compact()
    .value()
}

export { formatter as format }