import * as _       from 'lodash';
import * as cheerio from 'cheerio';

import { Filter      } from './_type';
import { image_table } from '../util';
/**
 * Convert image into corresponding unicode characters.
 *
 * @param {string} context
 * @returns {string}
 */
const filter : Filter = (context : string) : string => {
  const $ = cheerio.load(context)
  $('img').each(node => {
    const link = $(node).attr('src')
    $(node).replaceWith(image_table[link])
  })
  return $('*').html()
}

export default filter