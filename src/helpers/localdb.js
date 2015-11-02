import localdb from 'localdb'

const app = new localdb('app', 'Object')
const history = new localdb('histroy', 'Array', true)
const lastNote = new localdb('lastNote', 'Object')

export default {
  app,
  history,
  lastNote
}
