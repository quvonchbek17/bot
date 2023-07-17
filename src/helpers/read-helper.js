import { readFileSync } from 'fs'
import { join } from 'path'

export const readFile = path => JSON.parse(readFileSync(join(process.cwd(), 'src', 'model', `${path}.json`), 'utf-8'))

