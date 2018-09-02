import * as _ from 'lodash';

import accents from './accents';
import { host }                         from '../../util';
import { Sound }                        from '../_type';
import { ExtractData, ExtractDataType } from '../../extract/_type';

export default (data : ExtractData[]) : Sound[] => {
  const s = _.reduce(data, (current, ext) => {
    switch (ext.type) {
      case ExtractDataType.Text:
        return _.chain(accents(ext.text)).concat(current).value()
      case ExtractDataType.Link:
        return _.map(current, c => _.assign(c, { related: `${host}/${ext.link}` }))
      default:
        return current
    }
  }, [])
  return s
}