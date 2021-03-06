import * as _       from 'lodash';
import * as request from 'request-promise';

import * as filter        from '../filter';
import * as extracter     from '../extracter';
import * as formatter     from '../formatter';
import * as postprocessor from '../postprocessor';
import * as util      from '../util';
import { HakkaDictProtoType, HakkaDictEntry, HakkaDictOption } from '../_type';

/**
 * Retrieve accent link after main accents in the entry.
 *
 * @param {string} index the string id
 * @param {number} type type of accent
 * @param {HakkaDictOption} options @see HakkaDictOption
 * @returns {(Promise<(HakkaDictProtoType.AppSound | HakkaDictEntry.AppSound)[]>)} a promise
 *   with a accent list
 */
const appendix = (index : string, type : number, options : HakkaDictOption) : Promise<(HakkaDictProtoType.AppSound | HakkaDictEntry.AppSound)[]> => {
  return request({
      method: 'GET',
      uri: util.query.appendix(index, type),
      strictSSL: false
    })
    .then(filter.image)
    .then(filter.character)
    .then(extracter.appendix)
    .then(formatter.appendix)
    .then(result => postprocessor.appendix(result, options))
}

export default appendix