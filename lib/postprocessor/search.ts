import * as _  from 'lodash';
import * as qs from 'querystring';

import * as util from '../util';
import { HakkaDict } from '../_type';

const postprocessor = (result : HakkaDict.EntryItem[], options = { verbose: false }) => _.map(result,
  item => {
    if (options.verbose)
      return {
        text: item.text,
        link: util.query.entry(item.index)
      }
    return item
  })

export default postprocessor