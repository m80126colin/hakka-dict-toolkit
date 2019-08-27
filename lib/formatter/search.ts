import * as _ from 'lodash';

import partial from './partial';
import { HakkaDictExtract, HakkaDictProtoType } from '@/types';

export default (data : HakkaDictExtract.Data[][]) : HakkaDictProtoType.Item[] => _
  .chain(data)
  .initial()
  .tail()
  .map(row => partial.item(row[1]))
  .value()