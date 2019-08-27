import * as _ from 'lodash';

import { accent } from '@/assets/accent';

const table_lookup  : _.Dictionary<number> = _.chain(accent)
  .map(({ id, name }) => [name, id])
  .fromPairs()
  .value()
const table_reverse : _.Dictionary<string> = _.chain(accent)
  .map(({ id, name }) => [id, name])
  .fromPairs()
  .value()

export const lookup  = (str : string) => table_lookup[str]
export const reverse = (idx : number) => table_reverse[idx]