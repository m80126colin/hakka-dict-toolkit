import * as _ from 'lodash';

import * as accents from './_accents';
import { host }     from '../../util';
import { Sound }    from '../_type';
import { ExtractData, ExtractDataType } from '../../extracter/_type';

const formatter = (data : ExtractData[]) : Sound[] => {
  const s = _.reduce(data, (current, ext) => {
    switch (ext.type) {
      case ExtractDataType.Text:
        return _.chain(accents.format(ext.text)).concat(current).value()
      case ExtractDataType.Link:
        return _.map(current, c => _.assign(c, { related: `${host}/${ext.link}` }))
      default:
        return current
    }
  }, [])
  return s
}

export default formatter