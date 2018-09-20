import * as _ from 'lodash'

import * as util    from '../../util';
import * as accents from './_accents';
import { HakkaDictExtract, HakkaDictProtoType } from '../../_type';
/**
 * Format main 6 accent fields in the entry.
 *
 * @param {HakkaDictExtract.Data[]} data
 * @returns {HakkaDictProtoType.MainSound}
 */
const formatter = (data : HakkaDictExtract.Data[]) : HakkaDictProtoType.MainSound => {
  const s = _.map(data, (ext, idx) => {
    if (idx === 0)
      return { type: util.accent.lookup(ext.text) }
    switch (ext.type) {
      case HakkaDictExtract.DataType.Text:
        return accents.format(ext.text)[0]
      case HakkaDictExtract.DataType.Media:
        return { hasmedia: true }
      default:
        break;
    }
  })
  return _.merge.apply(null, s)
}

export default formatter