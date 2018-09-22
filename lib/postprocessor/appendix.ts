import * as _       from 'lodash';
import * as partial from './partial';
import { HakkaDictProtoType, HakkaDictOption } from '../_type';

const options_default : HakkaDictOption = {
  verbose: true
}

const postprocessor = (result : HakkaDictProtoType.AppSound[], options : HakkaDictOption) => {
  const opt = _.defaults(options, options_default)
  return _.map(result, item => partial.appsound(item, opt))
}

export default postprocessor