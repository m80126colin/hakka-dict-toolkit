import * as _       from 'lodash';
import * as request from 'request-promise';

import * as filter        from '../filter';
import * as extracter     from '../extracter';
import * as formatter     from '../formatter';
import * as postprocessor from '../postprocessor';

import * as util from '../util';
import { HakkaDictProtoType, HakkaDictEntry, HakkaDictOption } from '../_type';

const search = (str : string, options : HakkaDictOption) : Promise<HakkaDictProtoType.Item[] | HakkaDictEntry.Item[]> => {
  return request({
      method: 'GET',
      uri: util.query.search(str),
      strictSSL: false
    })
    .then(filter.image)
    .then(filter.character)
    .then(extracter.search)
    .then(formatter.search)
    .then(result => postprocessor.search(result, options))
}

export default search