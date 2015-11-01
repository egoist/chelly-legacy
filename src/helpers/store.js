import Datebase from 'nedb'
import userHome from 'user-home'
import path from 'path'

const model = new Datebase({
  filename: userHome + '/.chelly/notes.db',
  autoload: true
})

export default model
