import * as _       from 'lodash';
import * as request from 'request-promise';

import * as filter    from '../filter';
import * as extracter from '../extracter';
import * as formatter from '../formatter';
import * as util      from '../util';
import { HakkaDictProtoType } from '../_type';
/**
 * Provide access to the entry of MOE Hakka Dictionary by index and returns a promise.
 *
 * @param {number} index index of entry
 * @returns a promise with either a word or a character
 */
const entry = (index : number, options = { verbose: true }) : Promise<HakkaDictProtoType.Char | HakkaDictProtoType.Word> => {
  return request({
      method: 'GET',
      uri: util.query.entry(index),
      strictSSL: false
    })
    .then(filter.image)
    .then(filter.character)
    .then(extracter.entry)
    .then(formatter.entry.bind(null, index))
}

export default entry