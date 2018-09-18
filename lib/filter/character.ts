import * as _ from 'lodash';

import * as util from '../util';
import { HakkaDict } from '../_type';
/**
 * Convert specific character into corresponding unicode character.
 *
 * @param {string} context
 * @returns {string}
 */
const filter : HakkaDict.Filter = (context : string) : string => _.reduce(
  util.table.replace,
  (str, pair) => _.replace(str, new RegExp(`&#x${pair[0]};`, 'ug'), pair[1]),
  context)

export default filter