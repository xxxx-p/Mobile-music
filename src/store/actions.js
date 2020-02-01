import * as types from './mutatoin-types'
import { playMode } from "common/js/config.js";
import { shuffle } from "common/js/util.js";
export const selectPlay = function ({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
        let randomlist = shuffle(list)
        commit(types.SET_PLAYLIST, randomlist)
        index = randomlist.findIndex(item => {
           return item.id === list[index].id
        })
    }
    else {
        commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
export const randomPlay = function ({ commit, state }, { list }) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomlist = shuffle(list)
    commit(types.SET_PLAYLIST, randomlist)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}