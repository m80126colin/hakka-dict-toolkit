import * as _ from 'lodash';

import { table } from '@/assets/unicode';

export const image = _.chain(table)
  .map(({ key, char }) => [`koupng/${key}.png`, char])
  .fromPairs()
  .value()

export const replace = _.map(table, ({ key, char }) => [key, char])