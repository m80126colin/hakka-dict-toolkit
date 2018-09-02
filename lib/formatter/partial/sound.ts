import * as _ from 'lodash'

import * as accents from './_accents';
import { host }     from '../../util';
import { Sound }    from '../_type';
import { ExtractData, ExtractDataType } from '../../extracter/_type';
/**
 * Format main 6 accent fields in the entry.
 *
 * @param {ExtractData[]} data
 * @returns {Sound}
 */
const formatter = (data : ExtractData[]) : Sound => {
  const s = _.map(data, (ext, idx) => {
    switch (ext.type) {
      case ExtractDataType.Link:
        return { related: `${host}/${ext.link.match(/open\u0028\u0027([^']+)/u)[1]}` }
      case ExtractDataType.Media:
        return { media: `${host}/${ext.link}` }
      case ExtractDataType.Text:
        if (idx === 0)
          return { type: ext.text }
        return accents.format(ext.text)[0]
      default:
        break;
    }
  })
  return _.merge.apply(null, s)
}

export default formatter