import * as _       from 'lodash';
import * as request from 'request-promise';
import * as qs      from 'querystring';

import * as filter    from '../filter';
import * as extracter from '../extracter';
import * as formatter from '../formatter';
import * as util      from '../util';
import { ExtractData } from '../extracter/_type';

const appendix = (index : string, type : number) : Promise<ExtractData[][]> => {
  return request({
      method: 'GET',
      uri: util.query.appendix(index, type),
      strictSSL: false
    })
    .then(filter.image)
    .then(filter.character)
    .then(extracter.appendix)
    // .then(formatter.entry)
}

export default appendix