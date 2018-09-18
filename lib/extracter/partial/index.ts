import * as _       from 'lodash';
import * as cheerio from 'cheerio';

import link  from './link';
import media from './media';
import { HakkaDict } from '../../_type';

const extracters = [ media, link ]
const pattern    = new RegExp(`(${_.chain(extracters).map('mark').join('|').value()})`, 'ug')
/**
 * Extract all links and media by traversing all extracters.
 *
 * @param {CheerioElement} context
 * @returns {HakkaDict.ExtractData[]}
 */
const extract = (context : CheerioElement) : HakkaDict.ExtractData[] => {
  const $     = cheerio.load(context)
  const store = _.chain(extracters)
    /** replace tag */
    .map(exter => {
      const data = exter.handler($, context)
      $(exter.tag).replaceWith(exter.mark)
      return data
    })
    .zipWith(extracters, (form, exter) => _.merge({ elements: form }, exter))
    .value()
  const result : HakkaDict.ExtractData[] = _.chain($(context).text())
    .split(pattern)
    .map(_.trim)
    .compact()
    .map(str => {
      const res = _.filter(store, e => e.mark === str)
      if (res.length !== 1)
        return {
          type: HakkaDict.ExtractDataType.Text,
          text: _.trim(str)
        }
      return {
        type: res[0].type
      }
    })
    .value()
  _.map(store, e => {
    _.chain(result)
      .filter(r => r.type === e.type)
      .zipWith(e.elements, (r, e) => _.merge(r, e))
      .value()
  })
  return result
}

export { extract }