import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playlist)
    },
    activated() {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method')
        }
    }
}
export const playerMixin = {
    computed: {
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
        ...mapGetters([
            'currentSong',
            'mode',
            'favoriteList',
            "fullScreen",
            "playlist",
            "currentSong",
            "playing",
            "currentIndex",
            "mode",
            "sequenceList",
            "favoriteList"
        ])
    },
    methods: {
        changeMode() {
            const mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = null
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList)
            } else {
                list = this.sequenceList
            }
            this.resetCurrentIndex(list)
            this.setPlayList(list)
        },
        resetCurrentIndex(list) {
            let index = list.findIndex((item) => {
                return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
        },
        getFavoriteIcon(currentSong) {
            if (this.isFavorite(currentSong)) {
                return 'icon-favorite'
            }
            return 'icon-not-favorite'
        },
        toggleFavorite(currentSong) {
            if (this.isFavorite(currentSong)) {
                this.deleteFavoriteList(currentSong)
            } else {
                this.saveFavoriteList(currentSong)
            }
        },
        isFavorite(currentSong) {
            const index = this.favoriteList.findIndex((item) => {
                return item.id === currentSong.id
            })
            return index > -1
        },
        ...mapMutations({
            setFullScreen: "SET_FULL_SCREEN",
            setPlayingState: "SET_PLAYING_STATE",
            setCurrentIndex: "SET_CURRENT_INDEX",
            setPlayMode: "SET_PLAY_MODE",
            setPlayList: "SET_PLAYLIST"
        }),
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList',
            'saveFavoriteList',
            'deleteFavoriteList'
        ])
    }
}
export const searchMixin = {
    data() {
        return {
            query: '',
            refreshDelay: 120
        }
    },
    computed: {
        ...mapGetters([
            'searchHistory'
        ])
    },
    methods: {
        onQueryChange(query) {
            this.query = query
        },
        blurInput() {
            this.$refs.searchbox.blur()
        },
        addQuery(query) {
            this.$refs.searchbox.setquery(query);
            this.query = query;
        },
        saveSearch() {
            this.saveSearchHistory(this.query)
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory'
        ])
    }
}
