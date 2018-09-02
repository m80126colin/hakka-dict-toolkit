import * as _       from 'lodash';
import * as cheerio from 'cheerio';
import * as request from 'request-promise';

import { host } from './util';
import { image_filter, character_filter } from './filter';
import entry  from './format/entry';

const read_entry = (idx : number) => {
  const options = {
    method: 'GET',
    uri: `${host}/result_detail.jsp?n_no=${idx}&soundtype=0&sample=[`
  }
  return request(options)
    .then(image_filter)
    .then(character_filter)
    .then(body => entry(body))
}

class HakkaDictToolkitAPI {
  entry = read_entry;
  constructor() {}
}

module.exports = new HakkaDictToolkitAPI()