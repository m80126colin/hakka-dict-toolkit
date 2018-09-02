import * as _ from 'lodash'
import { Extracter, ExtractData, ExtractDataType } from '../_type';

const tag  = 'object'
const mark = '（media）'
const type = ExtractDataType.Media
/**
 *  Format flash into objects with link.
 *
 *  @param {CheerioStatic} jQuery
 *  @param {CheerioElement} context
 *  @returns {ExtractData[]}
 */
const handler =
  (jQuery : CheerioStatic, context : CheerioElement) : ExtractData[] => _
    .map(jQuery(tag, context), dom => {
      return { type, link: jQuery(dom).html().match(/mp3=([^"]+)/u)[1] }
    })

export default new Extracter(tag, mark, type, handler)