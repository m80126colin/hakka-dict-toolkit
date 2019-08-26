import * as _       from 'lodash';
import * as partial from './partial';
import { HakkaDictProtoType, HakkaDictOption } from '../types';

const options_default : HakkaDictOption = {
  verbose: true
}

const postprocessor = (result : HakkaDictProtoType.Item[], options : HakkaDictOption) => {
  const opt = _.defaults(options, options_default)
  return _.map(result, item => partial.item(item, opt))
}

export default postprocessor