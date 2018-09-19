import * as _       from 'lodash';
import * as cheerio from 'cheerio';

import * as partial from './partial';
import { HakkaDictExtract } from '../_type';
/**
 * Extract the form of appendix after accents in the entry of MOE Hakka Dictionary.
 *
 * @param {string} context
 * @returns {HakkaDictExtract.Data[][]}
 */
const extract = (context : string) : HakkaDictExtract.Data[][] => {
  const $    = cheerio.load(context)
  const rows = $('font > table.chineseword > tbody > tr', context)
  return _.map(rows, row => _.flatMap(
    $('tr > td', row),
    data => partial.extract(data)))
}

export default extract