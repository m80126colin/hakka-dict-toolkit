import * as util from '../../util';
import { HakkaDictProtoType, HakkaDictEntry, HakkaDictionaryToolkit } from '../../types';

const postprocessor = (item : HakkaDictProtoType.Item, options : HakkaDictionaryToolkit.Option) : HakkaDictProtoType.Item | HakkaDictEntry.Item => {
  if (!options.verbose)
    return item
  if (!item.index)
    return {
      text: item.text
    }
  return {
    text: item.text,
    link: util.query.entry(item.index)
  }
}

export default postprocessor