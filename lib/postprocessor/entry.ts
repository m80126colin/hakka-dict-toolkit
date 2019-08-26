import * as _       from 'lodash';

import * as util    from '../util';
import * as partial from './partial';
import { HakkaDictProtoType, HakkaDictOption, HakkaDictEntry } from '../types';

const options_default : HakkaDictOption = {
  verbose: true
}

const postprocessor = (result : HakkaDictProtoType.Char | HakkaDictProtoType.Word, options : HakkaDictOption) :
  HakkaDictProtoType.Char | HakkaDictEntry.Char | HakkaDictProtoType.Word | HakkaDictEntry.Word => {
    const opt = _.defaults(options, options_default)
    if (!opt.verbose)
      return result
    const base : HakkaDictEntry.BasicForm = {
      title    : result.title,
      sounds   : _.map(result.sounds,  sound => <HakkaDictEntry.MainSound>partial.mainsound(sound, result.index, options_default)),
      another  : _.map(result.another, sound => <HakkaDictEntry.ItemSound>partial.itemsound(sound, options_default)),
      meaning  : result.meaning,
      mandarin : result.mandarin
    }
    if (result.type === 'character')
      return _.merge(base, _.pick(<HakkaDictProtoType.Char>result, ['radical', 'stroke']))
    const word = <HakkaDictProtoType.Word>result
    return _.merge(base, _.pick(word, ['pos']), {
      variant: (word.variant) ? util.query.variant(word.index_ap) : '',
      synonym: _.map(word.synonym, nym => <HakkaDictEntry.Item>partial.item(nym, options_default)),
      antonym: _.map(word.antonym, nym => <HakkaDictEntry.Item>partial.item(nym, options_default))
    })
  }

export default postprocessor