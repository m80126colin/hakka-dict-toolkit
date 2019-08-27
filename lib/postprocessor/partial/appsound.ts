import * as _ from 'lodash';

import * as util from '../../util';
import { HakkaDictProtoType, HakkaDictEntry, HakkaDictionaryToolkit } from '../../types';

const postprocessor = (sound : HakkaDictProtoType.AppSound, options : HakkaDictionaryToolkit.Option) : HakkaDictProtoType.AppSound | HakkaDictEntry.AppSound => {
  if (!options.verbose)
    return sound
  const s = {
    text:     sound.text,
    type:     util.accent.reverse(sound.type),
    phonetic: sound.phonetic,
    media:    util.query.media(sound.index, sound.type, true)
  }
  if (!sound.vunbag)
    return s
  return _.merge(s, { vunbag: sound.vunbag })
}

export default postprocessor