import * as api from './api';

class HakkaDictToolkitAPI {
  entry    = api.entry;
  appendix = api.appendix;
  search   = api.search;
  constructor() {}
}

module.exports = new HakkaDictToolkitAPI()