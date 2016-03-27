import {
  setInitialFile
} from './mutation-types'

export const setInitialFile = ({dispatch}, file) {
  dispatch(SET_INITIAL_FILE, file)
}
