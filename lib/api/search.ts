import * as _ from 'lodash';
import axios  from 'axios';

import * as filter        from '../filter';
import * as extracter     from '../extracter';
import * as formatter     from '../formatter';
import * as postprocessor from '../postprocessor';

import * as util from '../util';
import { HakkaDictProtoType, HakkaDictEntry, HakkaDictOption } from '../types';
/**
 * Search to MOE Hakka Dictionary.
 *
 * @param {string} str query string
 * @param {HakkaDictOption} options @see HakkaDictOption
 * @returns {(Promise<(HakkaDictProtoType.Item | HakkaDictEntry.Item)[]>)} a promise with
 *   list of result
 */
const search = (str : string, options : HakkaDictOption)
  : Promise<(HakkaDictProtoType.Item | HakkaDictEntry.Item)[]> => {
    const url = util.query.search(str)
    return axios.get<string>(url)
      .then(({ data }) => data)
      .then(filter.image)
      .then(filter.character)
      .then(extracter.search)
      .then(formatter.search)
      .then(result => postprocessor.search(result, options))
}

export default search