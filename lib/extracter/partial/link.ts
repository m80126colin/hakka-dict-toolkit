import * as _ from 'lodash'
import { HakkaDictExtract } from '@/types';

const tag  = 'a'
const mark = '（link）'
const type = HakkaDictExtract.DataType.Link
/**
 * A handler to extract link into objects with text and link.
 *
 * @param {CheerioStatic} jQuery
 * @param {CheerioElement} context
 * @returns {HakkaDictExtract.Data[]}
 */
const handler =
  (jQuery : CheerioStatic, context : CheerioElement) : HakkaDictExtract.Data[] => _
    .map(jQuery(tag, context), dom => {
      return {
        type,
        text: jQuery(dom).text(),
        link: jQuery(dom).attr('href')
      }
    })

export default new HakkaDictExtract.Extracter(tag, mark, type, handler)