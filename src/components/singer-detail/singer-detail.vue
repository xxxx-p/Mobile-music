<template>
  <transition name="slide" appear>
    <div class="singer-detail-content">
      <music :bgImage="bgImage" :title="title" :songs="song"></music>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singer.js";
import { ERR_OK } from "api/config.js";
import { createSong } from "common/js/song.js";
import Music from "components/music-list/music-list.vue";

export default {
  name: "Singer-Detail",
  data() {
    return {
      song: []
    };
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.avatar;
    },
    ...mapGetters(["singer"])
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      getSingerDetail(this.singer.id).then(res => {
        if (!this.singer.id) {
          this.$router.push("/singer");
        }
        if (res.code === ERR_OK) {
          this.song = this._normalizeSongs(res.data.list);
        }
      });
    },
    _normalizeSongs(song) {
      let ret = [];
      song.forEach(item => {
        let { musicData } = item;
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  components: {
    Music
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.singer-detail-content {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.slide-enter-to, .slide-leave {
  transform: translate3d(0, 0, 0);
}
</style>