import * as _  from 'lodash';
import axios   from 'axios';

import * as util          from '@/util';
import * as filter        from '@/filter';
import * as extracter     from '@/extracter';
import * as formatter     from '@/formatter';
import * as postprocessor from '@/postprocessor';
import { HakkaDictProtoType, HakkaDictEntry, HakkaDictionaryToolkit } from '@/types';

/**
 * Retrieve accent link after main accents in the entry.
 *
 * @param {string} index the string id
 * @param {number} type type of accent
 * @param {HakkaDictionaryToolkit.Option} options @see HakkaDictionaryToolkit.Option
 * @returns {(Promise<(HakkaDictProtoType.AppSound | HakkaDictEntry.AppSound)[]>)} a promise
 *   with a accent list
 */
const appendix = (index : string, type : number, options : HakkaDictionaryToolkit.Option = {})
  : Promise<(HakkaDictProtoType.AppSound | HakkaDictEntry.AppSound)[]> => {
    const url = util.query.appendix(index, type)
    return axios.get<string>(url)
      .then(({ data }) => data)
      .then(filter.image)
      .then(filter.character)
      .then(extracter.appendix)
      .then(formatter.appendix)
      .then(result => postprocessor.appendix(result, options))
}

export default appendix