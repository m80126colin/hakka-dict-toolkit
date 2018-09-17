import * as _  from 'lodash';
import * as qs from 'querystring';

import { host, random } from '../util';
import { EntryItem } from '../formatter/_type';

const postprocessor = (result : EntryItem[], options = { verbose: false }) => _.map(result,
  item => {
    if (options.verbose) {
      const query = qs.stringify({
        n_no:      item.index,
        soundtype: 0,
        sample:    random.sinitic()
      })
      return {
        text: item.text,
        link: `${host}/result_detail.jsp?${query}`
      }
    }
    return item
  })

export default postprocessor