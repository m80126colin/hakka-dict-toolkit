import * as _       from 'lodash';
import * as cheerio from 'cheerio';

import * as partial from './partial';
import { HakkaDictExtract } from '../_type';
/**
 * Extract the form of entry of MOE Hakka Dictionary.
 *
 * @param {string} context
 * @returns {HakkaDictExtract.Data[][]}
 */
const extract = (context : string) : HakkaDictExtract.Data[][] => {
  const $    = cheerio.load(context)
  const rows = $('font > table.t14 > tbody > tr', context)
  const data = _.map(rows, (row, idx) => {
    if (idx !== 11 && idx !== 12)
      return _.flatMap($('tr > td', row), data => partial.extract(data))
    // Extract special from for field 'another accents (又音)' and 'multiple accents (多音字)'
    return _.concat(
      partial.extract($('tr > td', row)[0]),
      _.flatMap($('tr', $(row)), data => partial.extract(data)))
  })
  return data
}

export default extract