import * as _ from 'lodash';

import * as util from '../../util';
import { HakkaDictProtoType, HakkaDictEntry, HakkaDictOption } from '../../_type';

const postprocessor = (sound : HakkaDictProtoType.ItemSound, options : HakkaDictOption) : HakkaDictProtoType.ItemSound | HakkaDictEntry.ItemSound => {
  if (!options.verbose)
    return sound
  const s = {
    type:     util.accent.reverse(sound.type),
    phonetic: sound.phonetic,
    link:     util.query.entry(sound.index)
  }
  if (!sound.vunbag)
    return s
  return _.merge(s, { vunbag: sound.vunbag })
}

export default postprocessor