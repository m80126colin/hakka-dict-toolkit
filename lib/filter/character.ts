import * as _ from 'lodash';

import * as util from '../util';
import { HakkaDictFilter } from '../_type';
/**
 * Convert specific character into corresponding unicode character.
 *
 * @param {string} context
 * @returns {string}
 */
const filter : HakkaDictFilter = (context : string) : string => _.reduce(
  util.table.replace,
  (str, pair) => _.replace(str, new RegExp(`&#x${pair[0]};`, 'ug'), pair[1]),
  context)

export default filter