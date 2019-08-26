import * as _ from 'lodash'
import { HakkaDictExtract } from '../../types';

const tag  = 'object'
const mark = '（media）'
const type = HakkaDictExtract.DataType.Media
/**
 * A handler to extract flash into objects with link.
 *
 * @param {CheerioStatic} jQuery
 * @param {CheerioElement} context
 * @returns {HakkaDictExtract.Data[]}
 */
const handler =
  (jQuery : CheerioStatic, context : CheerioElement) : HakkaDictExtract.Data[] => _
    .map(jQuery(tag, context), dom => {
      return { type, link: jQuery(dom).html().match(/mp3=([^"]+)/u)[1] }
    })

export default new HakkaDictExtract.Extracter(tag, mark, type, handler)