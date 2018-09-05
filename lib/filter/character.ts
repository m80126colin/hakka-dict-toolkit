import * as _ from 'lodash';

import { Filter       } from './_type';
import { replace_list } from '../util';
/**
 * Convert specific character into corresponding unicode character.
 *
 * @param {string} context
 * @returns {string}
 */
const filter : Filter = (context : string) : string => _.reduce(
  replace_list,
  (str, pair) => _.replace(str, new RegExp(`&#x${pair[0]};`, 'ug'), pair[1]),
  context)

export default filter