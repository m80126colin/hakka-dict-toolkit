import * as _       from 'lodash';
import * as cheerio from 'cheerio';

import { image_table, replace_list } from '../util';

export interface Filter {
  (context : string) : string;
}

export const image_filter : Filter = (context : string) : string => {
  const $ = cheerio.load(context)
  $('img').each((idx, node) => {
    const link = $(node).attr('src')
    $(node).replaceWith(image_table[link])
  })
  return $('*').html()
}

export const character_filter : Filter = (context : string) : string => _.reduce(
  replace_list,
  (str, pair) => _.replace(str, new RegExp(pair[0], 'ug'), pair[1]),
  context)