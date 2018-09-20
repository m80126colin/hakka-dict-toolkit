import * as _  from 'lodash';
import * as qs from 'querystring';

import * as util from '../util';
import { HakkaDictProtoType } from '../_type';

const postprocessor = (result : HakkaDictProtoType.Item[], options = { verbose: true }) => _.map(result,
  item => {
    if (options.verbose)
      return {
        text: item.text,
        link: util.query.entry(item.index)
      }
    return item
  })

export default postprocessor