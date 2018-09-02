import * as _       from 'lodash';
import * as request from 'request-promise';

import * as extracter from '../extracter';
import * as filter    from '../filter';
import * as formatter from '../formatter';
import { host } from '../util';
/**
 * Provide access to the entry of MOE Hakka Dictionary by index and returns a promise.
 *
 * @param {number} idx index of entry
 * @returns a promise with either a word or a character
 */
const entry = (idx : number) => {
  const options = {
    method: 'GET',
    uri: `${host}/result_detail.jsp?n_no=${idx}&soundtype=0&sample=[`
  }
  return request(options)
    .then(filter.image)
    .then(filter.character)
    .then(extracter.entry)
    .then(formatter.entry)
}

export default entry