import * as _ from 'lodash';

import { host }      from '../../util';
import { HakkaDict } from '../../_type';

const pattern = new RegExp('【([^】]+)】', 'u')
/**
 * Format the title or a link to other entries.
 *
 * @param {HakkaDict.ExtractData} data
 * @returns {HakkaDict.EntryItem}
 */
const formatter = (data : HakkaDict.ExtractData, options = { verbose: false }) : HakkaDict.EntryItem => {
  let result = { text: '' }
  switch (data.type) {
    case HakkaDict.ExtractDataType.Link:
      if (options.verbose)
        result = _.assign(result, { link: `${host}/${data.link}` })
      else {
        result = _.assign(result, { index: parseInt(data.link.match(/n_no=(\d+)/u)[1]) })
      }
    case HakkaDict.ExtractDataType.Text:
      const match = data.text.match(pattern)
      if (match === null)
        return undefined
      result = _.assign(result, { text: match[1] })
      return result
    default:
      break;
  }
}

export default formatter