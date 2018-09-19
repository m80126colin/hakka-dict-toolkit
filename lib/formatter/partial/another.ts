import * as _ from 'lodash';

import * as accents  from './_accents';
import { host }      from '../../util';
import { HakkaDictExtract, HakkaDictProtoType } from '../../_type';

const reducer = (current : HakkaDictProtoType.Sound[], ext : HakkaDictExtract.Data) => {
  switch (ext.type) {
    case HakkaDictExtract.DataType.Text:
      return _.chain(accents.format(ext.text)).concat(current).value()
    case HakkaDictExtract.DataType.Link:
      return _.map(current, c => _.assign(c, { related: `${host}/${ext.link}` }))
    default:
      return current
  }
}
/**
 * Format another accent fields different from the main 6 accents.
 *
 * @param {HakkaDictExtract.Data[]} data
 * @returns {HakkaDictProtoType.Sound[]}
 */
const formatter = (data : HakkaDictExtract.Data[]) : HakkaDictProtoType.Sound[] => {
  let init : HakkaDictProtoType.Sound[] = []
  const s = _.reduce(data, reducer, init)
  return s
}

export default formatter