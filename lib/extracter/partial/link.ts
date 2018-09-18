import * as _ from 'lodash'
import { HakkaDict } from '../../_type';

const tag  = 'a'
const mark = '（link）'
const type = HakkaDict.ExtractDataType.Link
/**
 * A handler to extract link into objects with text and link.
 *
 * @param {CheerioStatic} jQuery
 * @param {CheerioElement} context
 * @returns {HakkaDict.ExtractData[]}
 */
const handler =
  (jQuery : CheerioStatic, context : CheerioElement) : HakkaDict.ExtractData[] => _
    .map(jQuery(tag, context), dom => {
      return {
        type,
        text: jQuery(dom).text(),
        link: jQuery(dom).attr('href')
      }
    })

export default new HakkaDict.Extracter(tag, mark, type, handler)