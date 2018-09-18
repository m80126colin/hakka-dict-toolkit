import * as _ from 'lodash'

import * as accents  from './_accents';
import { host }      from '../../util';
import { HakkaDict } from '../../_type';
/**
 * Format main 6 accent fields in the entry.
 *
 * @param {HakkaDict.ExtractData[]} data
 * @returns {HakkaDict.Sound}
 */
const formatter = (data : HakkaDict.ExtractData[]) : HakkaDict.Sound => {
  const s = _.map(data, (ext, idx) => {
    switch (ext.type) {
      case HakkaDict.ExtractDataType.Link:
        return { related: `${host}/${ext.link.match(/open\u0028\u0027([^']+)/u)[1]}` }
      case HakkaDict.ExtractDataType.Media:
        return { media: `${host}/${ext.link}` }
      case HakkaDict.ExtractDataType.Text:
        return accents.format(ext.text)[0]
      default:
        break;
    }
  })
  return _.merge.apply(null, s)
}

export default formatter