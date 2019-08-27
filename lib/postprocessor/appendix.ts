import * as _       from 'lodash';
import * as partial from './partial';
import { HakkaDictProtoType, HakkaDictionaryToolkit } from '../types';

const options_default : HakkaDictionaryToolkit.Option = {
  verbose: true
}

const postprocessor = (result : HakkaDictProtoType.AppSound[], options : HakkaDictionaryToolkit.Option) => {
  const opt = _.defaults(options, options_default)
  return _.map(result, item => partial.appsound(item, opt))
}

export default postprocessor