import * as _      from 'lodash';
import * as qs     from  'querystring';

import * as random from './random';
import host from '@/assets/host';

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

export const variant = (index : string) : string => {
  const query = qs.stringify({
    wordiffquery: index,
    soundtype:    0
  })
  return `${host}/ShowKouword.jsp?${query}`
}

export const media = (index : number, type : number, is_appendix = false) : string => {
  return `${host}/audio/s_sound${type}${is_appendix ? '_1' : ''}/${_.padStart(`${index}`, 5, '0')}.mp3`
}