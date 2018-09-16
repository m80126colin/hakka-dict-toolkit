import * as _       from 'lodash';
import * as request from 'request-promise';
import * as qs      from 'querystring';

import * as filter    from '../filter';
import * as extracter from '../extracter';
import * as formatter from '../formatter';
import { host } from '../util';
import { ExtractData } from '../extracter/_type';

const appendix = (id : string, type : number) : Promise<ExtractData[][]> => {
  const query = qs.stringify({
    idno:      id,
    soundtype: 0,
    soundnum:  type
  })
  return request({
      method: 'GET',
      uri: `${host}/Showkou345.jsp?${query}`,
      strictSSL: false
    })
    .then(filter.image)
    .then(filter.character)
    .then(extracter.appendix)
    // .then(formatter.entry)
}

export default appendix