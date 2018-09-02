import * as _ from 'lodash';
/**
 *  The table about all images corresponded to unicode characters in MOE Hakka dictionary.
 */
const unicode_table = [
  ['𠊎', 'koupng/F305.png'],
  ['𠎷', 'koupng/F44F.png'],
  ['𠖄', 'koupng/F39B.png'],
  ['𠖫', 'koupng/F421.png'],
  ['𠗻', 'koupng/F437.png'],
  ['𠜱', 'koupng/F3C9.png'],
  ['𠠃', 'koupng/F36D.png'],
  ['𠠝', 'koupng/F488.png'],
  ['𠢕', 'koupng/F4A7.png'],
  ['𠲿', 'koupng/F350.png'],
  ['𢫦', 'koupng/F315.png'],
  ['𢫫', 'koupng/F3A6.png'],
  ['𢯭', 'koupng/F374.png'],
  ['𢱤', 'koupng/F35A.png'],
  ['𢳆', 'koupng/F390.png'],
  ['𢳪', 'koupng/2CEA.png'],
  ['𢶀', 'koupng/F393.png'],
  ['𢼛', 'koupng/F30E.png'],
  ['𣛮', 'koupng/F37D.png'],
  ['𣲩', 'koupng/F379.png'],
  ['𣼎', 'koupng/F37C.png'],
  ['𤊶', 'koupng/F36B.png'],
  ['𤌍', 'koupng/2430.png'],
  ['𤍒', 'koupng/F433.png'],
  ['𤐰', 'koupng/F383.png'],
  ['𤘅', 'koupng/F401.png'],
  ['𤞚', 'koupng/F368.png'],
  ['𤲍', 'koupng/F4D0.png'],
  ['𤸁', 'koupng/F385.png'],
  ['𤸱', 'koupng/F3A5.png'],
  ['𥉌', 'koupng/F3B9.png'],
  ['𥉔', 'koupng/F4D5.png'],
  ['𥍉', 'koupng/F372.png'],
  ['𥯟', 'koupng/F36C.png'],
  ['𥯥', 'koupng/F397.png'],
  ['𥺆', 'koupng/F37B.png'],
  ['𧊅', 'koupng/F369.png'],
  ['𧩣', 'koupng/F36E.png'],
  ['𨃰', 'koupng/F434.png'],
  ['𨒇', 'koupng/F37E.png'],
  ['𨰠', 'koupng/F438.png'],
  ['𩜄', 'koupng/F414.png'],
  ['𩜰', 'koupng/F36F.png'],
  ['𪐞', 'koupng/F360.png'],
  ['𪖐', 'koupng/F3B5.png'],
  ['𪘒', 'koupng/2A61.png'],
  ['𫝘', 'koupng/F446.png'],
  ['𫟧', 'koupng/F444.png'],
  ['𫣆', 'koupng/F307.png'],
  ['𬠖', 'koupng/F442.png'],
  ['㗘', 'koupng/F463.png'],
  ['㘔', 'koupng/3614.png'],
  ['㧡', 'koupng/F34E.png'],
  ['㧾', 'koupng/39FE.png'],
  ['㩢', 'koupng/F40F.png'],
  ['㪐', 'koupng/F377.png'],
  ['㬹', 'koupng/F357.png'],
  ['㼓', 'koupng/3F13.png'],
  ['㾊', 'koupng/3F8A.png'],
  ['䀯', 'koupng/F3B4.png'],
  ['䀴', 'koupng/F31B.png'],
  ['䞚', 'koupng/F354.png'],
  ['䟓', 'koupng/F34F.png'],
  ['䟘', 'koupng/F39A.png'],
  ['䯋', 'koupng/F448.png'],
  ['⿺皮卜', 'koupng/F545.png']]

export const host  = 'http://hakka.dict.edu.tw/hakkadict'

export const image_table = _
  .chain(unicode_table)
  .map(([v, k]) => [k, v])
  .fromPairs()
  .value()

export const replace_list = _
  .chain(unicode_table)
  .map(([v, k]) => {
    const key = k.match(/koupng\/([0-9A-F]+).png/u)[1]
    return [key, v]
  })
  .value()