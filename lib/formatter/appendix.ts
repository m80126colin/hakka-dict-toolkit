import * as _ from 'lodash';

import * as util from '../util';
import partial from './partial';
import { HakkaDictExtract, HakkaDictProtoType } from '../_type';

export default (data : HakkaDictExtract.Data[][]) : HakkaDictProtoType.AppSound[] => _
  .chain(data)
  .initial()
  .tail()
  .map(row => {
    return _.merge({
      text: row[0].text,
      type: util.accent.lookup(data[0][1].text),
    }, partial.appsound(_.tail(row)))
  })
  .value()