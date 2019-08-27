import * as api from './api';

class HakkaDictToolkitAPI {
  entry    = api.entry;
  appendix = api.appendix;
  search   = api.search;
  constructor() {}
}

const APInstance = new HakkaDictToolkitAPI()

export default APInstance
module.exports = APInstance