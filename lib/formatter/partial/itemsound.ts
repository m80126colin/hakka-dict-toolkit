import * as _ from 'lodash';

import * as sound from './_sound';
import { HakkaDictExtract, HakkaDictProtoType } from '@/types';

const reducer = (current : HakkaDictProtoType.ItemSound[], ext : HakkaDictExtract.Data) => {
  switch (ext.type) {
    case HakkaDictExtract.DataType.Text:
      return _.chain(sound.format(ext.text)).concat(current).value()
    case HakkaDictExtract.DataType.Link:
      return _.map(current, c => {
        const index = parseInt(ext.link.match(/n_no=(\d+)/)[1])
        return _.assign(c, { index })
      })
    default:
      return current
  }
}
/**
 * Format another accent fields different from the main 6 accents.
 *
 * @param {HakkaDictExtract.Data[]} data
 * @returns {HakkaDictProtoType.ItemSound[]}
 */
const formatter = (data : HakkaDictExtract.Data[]) : HakkaDictProtoType.ItemSound[] => {
  let init : HakkaDictProtoType.ItemSound[] = []
  const s = _.reduce(data, reducer, init)
  return s
}

export default formatter