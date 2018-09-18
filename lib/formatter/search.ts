import * as _ from 'lodash';

import partial from './partial';
import { HakkaDict } from '../_type';

export default (data : HakkaDict.ExtractData[][]) : HakkaDict.EntryItem[] => _
  .chain(data)
  .initial()
  .tail()
  .map(row => partial.item(row[1]))
  .value()