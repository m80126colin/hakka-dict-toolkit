import * as _ from 'lodash'
import { Extracter, ExtractData, ExtractDataType } from './_type';

const tag  = 'a'
const mark = '（link）'
const type = ExtractDataType.Link
/**
 *  Format link into objects with text and link.
 *
 *  @param {CheerioStatic} jQuery
 *  @param {CheerioElement} context
 *  @returns {ExtractData[]}
 */
const handler =
  (jQuery : CheerioStatic, context : CheerioElement) : ExtractData[] => _
    .map(jQuery(tag, context), dom => {
      return {
        type,
        text: jQuery(dom).text(),
        link: jQuery(dom).attr('href')
      }
    })

export default new Extracter(tag, mark, type, handler)