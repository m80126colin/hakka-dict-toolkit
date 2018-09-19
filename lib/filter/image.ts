import * as _       from 'lodash';
import * as cheerio from 'cheerio';

import * as util from '../util';
import { HakkaDictFilter } from '../_type';
/**
 * Convert image into corresponding unicode characters.
 *
 * @param {string} context
 * @returns {string}
 */
const filter : HakkaDictFilter = (context : string) : string => {
  const $ = cheerio.load(context)
  _.map($('img'), node => {
    const link = $(node).attr('src')
    $(node).replaceWith(util.table.image[link])
  })
  return $('*').html()
}

export default filter