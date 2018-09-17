import host from './host';

import * as qs     from  'querystring';
import * as random from './random';

export const search = (str : string) : string => {
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
  return `${host}/result.jsp?${query}`
}

export const entry = (index : number) : string => {
  const query = qs.stringify({
    n_no:      index,
    soundtype: 0,
    sample:    random.sinitic()
  })
  return `${host}/result_detail.jsp?${query}`
}

export const appendix = (index : string, type : number) : string => {
  const query = qs.stringify({
    idno:      index,
    soundtype: 0,
    soundnum:  type
  })
  return `${host}/Showkou345.jsp?${query}`
}