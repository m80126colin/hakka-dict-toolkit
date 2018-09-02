import * as _       from 'lodash';
import * as cheerio from 'cheerio';

import * as partial from './partial';
import { ExtractData } from './_type';

const extract = (context : string) : ExtractData[][] => {
  const $    = cheerio.load(context)
  const rows = $('font > table.t14 > tbody > tr', context)
  const data = _.map(rows, (row, idx) => {
    if (idx !== 12)
      return _.flatMap($('tr > td', row), data => partial.extract(data))
    // for special format field 'multiple accents (多音字)'
    return _.concat(
      partial.extract($('tr > td', row)[0]),
      _.flatMap($('tr', $(row)), data => partial.extract(data)))
  })
  return data
}

export default extract