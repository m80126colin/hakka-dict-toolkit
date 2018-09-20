import * as _       from 'lodash';
import * as request from 'request-promise';

import * as filter        from '../filter';
import * as extracter     from '../extracter';
import * as formatter     from '../formatter';
import * as postprocessor from '../postprocessor';

import * as util from '../util';
import { HakkaDictProtoType, HakkaDictEntry, HakkaDictOption, HakkaDictExtract } from '../_type';
/**
 * Provide access to the entry of MOE Hakka Dictionary by index and returns a promise.
 *
 * @param {number} index index of entry
 * @returns a promise with either a word or a character
 */
const entry = (index : number, options : HakkaDictOption) : Promise<
  HakkaDictProtoType.Char | HakkaDictEntry.Char |
  HakkaDictProtoType.Word | HakkaDictEntry.Word> => {
    return request({
        method: 'GET',
        uri: util.query.entry(index),
        strictSSL: false
      })
      .then(filter.image)
      .then(filter.character)
      .then(extracter.entry)
      .then(exts   => formatter.entry(index, exts))
      .then(result => postprocessor.entry(result, options))
  }

export default entry