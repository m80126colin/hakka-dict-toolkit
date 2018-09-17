import * as _ from 'lodash';

import { host }                         from '../../util';
import { EntryItem }                    from '../_type';
import { ExtractData, ExtractDataType } from '../../extracter/_type';

const pattern = new RegExp('【([^】]+)】', 'u')
/**
 * Format the title or a link to other entries.
 *
 * @param {ExtractData} data
 * @returns {EntryItem}
 */
const formatter = (data : ExtractData, options = { verbose: false }) : EntryItem => {
  let result = { text: '' }
  switch (data.type) {
    case ExtractDataType.Link:
      if (options.verbose)
        result = _.assign(result, { link: `${host}/${data.link}` })
      else {
        result = _.assign(result, { index: parseInt(data.link.match(/n_no=(\d+)/u)[1]) })
      }
    case ExtractDataType.Text:
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