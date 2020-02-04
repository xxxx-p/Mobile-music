<template>
  <div class="music-list">
    <div class="header" ref="header">
      <div class="header-black" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="header-title">{{title}}</h1>
    </div>
    <div class="img-content" ref="bgimge">
      <img class="music-img" :src="bgImage" ref="bgimgeimg" />
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      @scroll="scroll"
      :probeType="probeType"
      :listenScroll="listenScroll"
      :data="songs"
      ref="list"
      class="list"
    >
      <div class="wrap" ref="wrap">
        <song :rank="rank" @select="selectItem" :songs="songs"></song>
      </div>
       <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from "base/scroll/scroll.vue";
import Song from "base/song-list/song-list.vue";
import { prefixStyle } from "common/js/dom.js";
import { mapActions } from "vuex";
import { playlistMixin } from "common/js/mixin";
import Loading from "base/loading/loading";
let transform = prefixStyle("transform");
const replaceStateRVED_HEIGHT = 40;
export default {
  mixins: [playlistMixin],
  data() {
    return {
      probeType: 3,
      listenScroll: true,
      scrollY: 0,
    };
  },
  name: "Music-list",
  props: ["bgImage", "songs", "title","rank"],
  components: {
    Scroll,
    Song,
    Loading
  },
  mounted() {
    this.imageHeight = this.$refs.bgimge.clientHeight;
  },
  watch: {
    scrollY(newY) {
      let minTranslateY = -this.imageHeight + replaceStateRVED_HEIGHT;
      let translateY = Math.max(minTranslateY, newY);
      let scale = 1;
      const percent = Math.abs(newY / this.imageHeight);
      scale += percent;
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;
      if (translateY <= minTranslateY) {
        this.$refs.bgimge.style.height = `${replaceStateRVED_HEIGHT}px`;
        this.$refs.filter.style.height = `${replaceStateRVED_HEIGHT}px`;
        this.$refs.bgimge.style.zIndex = 3;
        this.$refs.filter.style.zIndex = 4;
        this.$refs.header.style.zIndex = 5;
        this.$refs.playBtn.style.display = "none";
      } else if (translateY > 0) {
        this.$refs.bgimge.style[transform] = `scale(${scale})`;
        this.$refs.bgimge.style.zIndex = 1;
      } else {
        this.$refs.bgimge.style.height = `16.375rem`;
        this.$refs.filter.style.height = `16.375rem`;
        this.$refs.bgimge.style.zIndex = 0;
        this.$refs.bgimgeimg.style.zIndex = 0;
        this.$refs.filter.style.zIndex = 1;
        this.$refs.playBtn.style.display = "block";
      }
    }
  },
  methods: {
    scroll(newY) {
      this.scrollY = newY.y;
    },
    back() {
      this.$router.back();
    },
    selectItem(item, index) {
      this.selectPlay({ list: this.songs, index });
    },
    random() {
      this.randomPlay({ list: this.songs });
    },
    handlePlaylist(NewPlaylist) {
      const bottom = NewPlaylist.length > 0 ? "60px" : 0;
      this.$refs.list.$el.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    ...mapActions(["selectPlay", "randomPlay"])
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #222;

  .header {
    display: flex;
    position: absolute;
    width: 100%;
    text-align: center;
    z-index: 2;

    .header-black {
      position: absolute;
      padding: 4px;
      width: 2.625rem;
      height: 2.625rem;
      line-height: 2.625rem;
      font-size: 22px;
      color: #ffcd32;
      z-index: 1;
    }

    .header-title {
      position: absolute;
      width: 60%;
      height: 2.625rem;
      line-height: 2.625rem;
      font-size: 18px;
      color: #fff;
      left: 50%;
      transform: translateX(-50%);
      no-wrap();
    }
  }

  .img-content {
    position: relative;
    width: 100%;
    height: 16.375rem;
    overflow: hidden;
    background: rgba(7, 17, 27, 0.4);
    right: 0;

    .music-img {
      position: relative;
      width: 100%;
      z-index: 1;
    }

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;

      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }

      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }

      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 16.375rem;
      background: rgba(7, 17, 27, 0.4);
      z-index: 1;
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
    z-index: 1;
  }

  .list {
    position: absolute;
    top: 39%;
    width: 100%;
    bottom: 0;
    background: $color-background;

    .wrap {
      padding: 20px 30px;
      position: relative;
      z-index: 2;
    }
  }
}
</style>