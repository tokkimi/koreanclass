import type { Dict } from '../translate'

/** Dictionnaire anglais complet (chargé seulement quand le site est en anglais). Une valeur vide = texte identique. */
const files = import.meta.glob<Dict>('./*.json', { eager: true, import: 'default' })
const dict: Dict = {}
for (const f of Object.values(files)) for (const [k, v] of Object.entries(f)) if (v) dict[k] = v
export default dict
