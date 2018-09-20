import * as _ from 'lodash'

import * as accents  from './_accents';
import { host }      from '../../util';
import { HakkaDictExtract, HakkaDictProtoType } from '../../_type';
/**
 * Format main 6 accent fields in the entry.
 *
 * @param {HakkaDictExtract.Data[]} data
 * @returns {HakkaDictProtoType.Sound}
 */
const formatter = (data : HakkaDictExtract.Data[]) : HakkaDictProtoType.Sound => {
  const s = _.map(data, (ext, idx) => {
    switch (ext.type) {
      case HakkaDictExtract.DataType.Link:
        return { related: `${host}/${ext.link.match(/open\u0028\u0027([^']+)/u)[1]}` }
      case HakkaDictExtract.DataType.Media:
        return { media: `${host}/${ext.link}` }
      case HakkaDictExtract.DataType.Text:
        return accents.format(ext.text)[0]
      default:
        break;
    }
  })
  return _.merge.apply(null, s)
}

export default formatter