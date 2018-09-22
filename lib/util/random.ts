import * as _ from 'lodash';
/**
 * base ~ base + range - 1
 */
export const number = (base : number, range : number) => base + _.random(range)

export const sinitic = () => String.fromCharCode(_.random(0x4E00, 0x9FFF))