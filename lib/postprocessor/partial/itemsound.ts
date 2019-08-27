import * as _ from 'lodash';

import * as util from '../../util';
import { HakkaDictProtoType, HakkaDictEntry, HakkaDictionaryToolkit } from '../../types';

const postprocessor = (sound : HakkaDictProtoType.ItemSound, options : HakkaDictionaryToolkit.Option) : HakkaDictProtoType.ItemSound | HakkaDictEntry.ItemSound => {
  if (!options.verbose)
    return sound
  let s = {
    type:     util.accent.reverse(sound.type),
    phonetic: sound.phonetic
  }
  if (sound.vunbag)
    _.assign(s, { vunbag: sound.vunbag })
  if (sound.index)
    _.assign(s, { link: util.query.entry(sound.index) })
  return s
}

export default postprocessor