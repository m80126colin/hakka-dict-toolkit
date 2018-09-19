import * as _ from 'lodash';

import { host }      from '../../util';
import { HakkaDictExtract, HakkaDictProtoType } from '../../_type';

const pattern = new RegExp('【([^】]+)】', 'u')
/**
 * Format the title or a link to other entries.
 *
 * @param {HakkaDictExtract.Data} data
 * @returns {HakkaDictProtoType.Item}
 */
const formatter = (data : HakkaDictExtract.Data) : HakkaDictProtoType.Item => {
  let result = { text: '' }
  switch (data.type) {
    case HakkaDictExtract.DataType.Link:
      result = _.assign(result, { index: parseInt(data.link.match(/n_no=(\d+)/u)[1]) })
    case HakkaDictExtract.DataType.Text:
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