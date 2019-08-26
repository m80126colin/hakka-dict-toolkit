import * as _ from 'lodash'

import * as util    from '../../util';
import * as sound from './_sound';
import { HakkaDictExtract, HakkaDictProtoType } from '../../types';
/**
 * Format the sound of appendix.
 *
 * @param {HakkaDictExtract.Data[]} data
 * @returns {HakkaDictProtoType.AppSound}
 */
const formatter = (data : HakkaDictExtract.Data[]) : HakkaDictProtoType.AppSound => {
  const s = _.map(data, ext => {
    switch (ext.type) {
      case HakkaDictExtract.DataType.Text:
        return sound.format(ext.text)[0]
      case HakkaDictExtract.DataType.Media:
        const index = parseInt(ext.link.match(/^audio\/s_sound\d_1\/(\d+).mp3$/)[1])
        return { index }
      default:
        break;
    }
  })
  return _.merge.apply(null, s)
}

export default formatter