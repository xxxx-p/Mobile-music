import storage from 'good-storage'

const SEARCH_KEY = '_search_'
const SEARCH_MAXLENGTH = 15

const PLAY_KEY = '_play_'
const PLAY_MAXLENGTH = 200

const FAVORITE_KEY = '_ favorite_'
const FAVORITE_MAXLENGTH = 200

function inserArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)
    if (index === 0) {
        return
    }
    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

export function saveSearch(query) {
    let searchs = storage.get(SEARCH_KEY, [])
    inserArray(searchs, query, (item) => {
        return item === query
    }, SEARCH_MAXLENGTH)
    storage.set(SEARCH_KEY, searchs)
    return searchs
}

export function loadSearch() {
    return storage.get(SEARCH_KEY, [])
}

function deleteArray(searchs, query) {
    let index = searchs.findIndex((item) => {
        return item === query
    })
    searchs.splice(index, 1)
}

export function deleteSearch(query) {
    let searchs = storage.get(SEARCH_KEY, [])
    deleteArray(searchs, query)
    storage.set(SEARCH_KEY, searchs)
    return searchs
}

export function clearSearch(query) {
    storage.remove(SEARCH_KEY)
    return []
}

export function savePlay(song) {
    let songs = storage.get(PLAY_KEY, [])
    inserArray(songs, song, (item) => {
        return item.id === song.id
    }, PLAY_MAXLENGTH)
    storage.set(PLAY_KEY, songs)
    return songs
}

export function loadPlay() {
    return storage.get(PLAY_KEY, [])
}

export function saveFavorite(favorite) {
    let favorites = storage.get(FAVORITE_KEY, [])
    inserArray(favorites, favorite, (item) => {
        return item.id === favorite.id
    }, FAVORITE_MAXLENGTH)
    storage.set(FAVORITE_KEY, favorites)
    return favorites
}


export function deleteFavorite(favorite) {
    let favorites = storage.get(FAVORITE_KEY, [])
    deleteArray(favorites, favorite)
    storage.set(FAVORITE_KEY, favorites)
    return favorites
}

export function loadFavorite() {
    return storage.get(FAVORITE_KEY, [])
}