import * as _ from 'lodash'
import { HakkaDict } from '../../_type';

const tag  = 'object'
const mark = '（media）'
const type = HakkaDict.ExtractDataType.Media
/**
 * A handler to extract flash into objects with link.
 *
 * @param {CheerioStatic} jQuery
 * @param {CheerioElement} context
 * @returns {HakkaDict.ExtractData[]}
 */
const handler =
  (jQuery : CheerioStatic, context : CheerioElement) : HakkaDict.ExtractData[] => _
    .map(jQuery(tag, context), dom => {
      return { type, link: jQuery(dom).html().match(/mp3=([^"]+)/u)[1] }
    })

export default new HakkaDict.Extracter(tag, mark, type, handler)