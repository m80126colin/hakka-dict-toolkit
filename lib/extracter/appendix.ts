import * as _       from 'lodash';
import * as cheerio from 'cheerio';

import * as partial from './partial';
import { HakkaDict } from '../_type';
/**
 * Extract the form of appendix after accents in the entry of MOE Hakka Dictionary.
 *
 * @param {string} context
 * @returns {HakkaDict.ExtractData[][]}
 */
const extract = (context : string) : HakkaDict.ExtractData[][] => {
  const $    = cheerio.load(context)
  const rows = $('font > table.chineseword > tbody > tr', context)
  return _.map(rows, row => _.flatMap(
    $('tr > td', row),
    data => partial.extract(data)))
}

export default extract