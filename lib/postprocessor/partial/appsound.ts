import * as _ from 'lodash';

import * as util from '../../util';
import { HakkaDictProtoType, HakkaDictEntry, HakkaDictOption } from '../../_type';

const postprocessor = (sound : HakkaDictProtoType.AppSound, options : HakkaDictOption) : HakkaDictProtoType.AppSound | HakkaDictEntry.AppSound => {
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