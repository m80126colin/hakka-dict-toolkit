import * as _ from 'lodash';

const accents : [string, number][] = [
  ['四縣音', 1],
  ['海陸音', 2],
  ['大埔音', 3],
  ['饒平音', 4],
  ['詔安音', 5],
  ['南四縣', 6]
]

const table_lookup  : _.Dictionary<number> = _.fromPairs(accents)
const table_reverse : _.Dictionary<string> = _.chain(accents)
  .map(([k, v]) => [v, k])
  .fromPairs()
  .value()

export const lookup  = (str : string) => table_lookup[str]
export const reverse = (idx : number) => table_reverse[idx]