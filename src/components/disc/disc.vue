<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="song"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from "components/music-list/music-list";
import { getSongList } from "api/recommend";
import { mapGetters } from "vuex";
import { createSong } from "common/js/song";
export default {
  data() {
    return { song: [] };
  },
  created() {
    this._getSongList();
  },
  computed: {
    ...mapGetters(["disc"]),
    title() {
      return this.disc.name;
    },
    bgImage() {
      return this.disc.coverImgUrl;
    }
  },
  methods: {
    _getSongList() {
        if (!this.disc.id) {
          this.$router.push('/recommend')
          return
        }
      getSongList(this.disc.id).then(res => {
        if (res.code === 200) {
          this.song = this._normalizeSongs(res.data.tracks);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        ret.push(createSong(musicData));
      });
      return ret;
    }
  },
  components: {
    MusicList
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>