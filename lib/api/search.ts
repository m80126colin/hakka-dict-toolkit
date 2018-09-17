import * as _       from 'lodash';
import * as request from 'request-promise';
import * as qs      from 'querystring';

import * as filter        from '../filter';
import * as extracter     from '../extracter';
import * as formatter     from '../formatter';
import * as postprocessor from '../postprocessor';

import { host, random } from '../util';
import { Hakka } from '../postprocessor/_type';

const search = (str : string, options = { verbose: false }) : Promise<Hakka.Item[]> => {
  const query = qs.stringify({
    sample:      str,
    page:        1,
    limit:       random.number(1000000, 10000),
    'submit.x':  random.number(0, 1000),
    'submit.y':  random.number(0, 1000),
    querytarget: 1,
    soundtype:   0,
    searchtype:  1
  })
  return request({
      method: 'GET',
      uri: `${host}/result.jsp?${query}`,
      strictSSL: false
    })
    .then(filter.image)
    .then(filter.character)
    .then(extracter.search)
    .then(formatter.search)
    .then(result => postprocessor.search(result, options))
}

export default search