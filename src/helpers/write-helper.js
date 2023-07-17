import { writeFileSync } from 'fs'
import { join } from 'path'

export const writeFile = (path, data) => writeFileSync(join(process.cwd(), 'src', 'model', `${path}.json`), JSON.stringify(data, null, 4))