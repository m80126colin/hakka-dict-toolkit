import * as _       from 'lodash';
import * as cheerio from 'cheerio';

import * as partial from './partial';
import { ExtractData } from './_type';
/**
 * Extract the table of search result.
 *
 * @param {string} context
 * @returns {ExtractData[][]}
 */
const extract = (context : string) : ExtractData[][] => {
  const $    = cheerio.load(context)
  const rows = $('font > table.t14 > tbody > tr', context)
  return _.map(rows, row => _.flatMap(
    $('tr > td', row),
    data => partial.extract(data)))
}

export default extract