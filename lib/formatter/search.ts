import * as _ from 'lodash';

import partial from './partial';
import { ExtractData } from '../extracter/_type';
import { EntryItem }   from './_type';

export default (data : ExtractData[][]) : EntryItem[] => _
  .chain(data)
  .initial()
  .tail()
  .map(row => partial.item(row[1]))
  .value()