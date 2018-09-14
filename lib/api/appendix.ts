import * as _       from 'lodash';
import * as request from 'request-promise';

import * as filter    from '../filter';
import * as extracter from '../extracter';
import * as formatter from '../formatter';
import { host } from '../util';
import { WordEntry, CharacterEntry } from '../formatter/_type';

const appendix = (idx : number) : Promise<WordEntry | CharacterEntry> => {
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

export default appendix