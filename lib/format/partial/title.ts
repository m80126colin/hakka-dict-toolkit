import * as _ from 'lodash';

import { host }                         from '../../util';
import { EntryItem }                    from '../_type';
import { ExtractData, ExtractDataType } from '../../extract/_type';

export default (data : ExtractData) : EntryItem => {
  let result = { text: '' }
  switch (data.type) {
    case ExtractDataType.Link:
      result = _.assign(result, { link: `${host}/${data.link}` })
    case ExtractDataType.Text:
      result = _.assign(result, { text: data.text.match(/【([^】]+)】/u)[1] })
      return result
    default:
      break;
  }
}