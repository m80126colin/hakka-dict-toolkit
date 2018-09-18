import * as _ from 'lodash';

import * as accents  from './_accents';
import { host }      from '../../util';
import { HakkaDict } from '../../_type';

const reducer = (current : HakkaDict.Sound[], ext : HakkaDict.ExtractData) => {
  switch (ext.type) {
    case HakkaDict.ExtractDataType.Text:
      return _.chain(accents.format(ext.text)).concat(current).value()
    case HakkaDict.ExtractDataType.Link:
      return _.map(current, c => _.assign(c, { related: `${host}/${ext.link}` }))
    default:
      return current
  }
}
/**
 * Format another accent fields different from the main 6 accents.
 *
 * @param {HakkaDict.ExtractData[]} data
 * @returns {HakkaDict.Sound[]}
 */
const formatter = (data : HakkaDict.ExtractData[]) : HakkaDict.Sound[] => {
  let init : HakkaDict.Sound[] = []
  const s = _.reduce(data, reducer, init)
  return s
}

export default formatter