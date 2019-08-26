import * as _ from 'lodash';

import * as util from '../../util';
import { HakkaDictProtoType, HakkaDictEntry, HakkaDictOption } from '../../types';

const postprocessor = (sound : HakkaDictProtoType.MainSound, index : number, options : HakkaDictOption) : HakkaDictProtoType.MainSound | HakkaDictEntry.MainSound => {
  if (!options.verbose)
    return sound
  const s = {
    type:     util.accent.reverse(sound.type),
    phonetic: sound.phonetic,
    media:    util.query.media(index, sound.type)
  }
  if (!sound.vunbag)
    return s
  return _.merge(s, { vunbag: sound.vunbag })
}

export default postprocessor