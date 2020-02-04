<template>
  <div class="recommend" ref="list">
    <scroll ref="recommend" class="recommend-content" :data="discList">
      <div>
        <slider v-if="recommend.length" class="slider-wrapper">
          <div v-for="item in recommend" :key="item.id">
            <a :href="item.picUrl">
              <img class="needsclick" @load="loadImg" :src="item.picUrl" />
            </a>
          </div>
        </slider>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item of discList" class="item">
              <img class="icon" v-lazy="item.coverImgUrl" />
              <div class="text">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.creator.nickname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <loading v-show="!discList.length"></loading>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from "axios";
import Slider from "base/slider/slider.vue";
import Scroll from "base/scroll/scroll.vue";
import Loading from "base/loading/loading.vue";
import { getDiscList, getRecommend } from "api/recommend";
import { ERR_OK } from "api/config";
import { playlistMixin } from "common/js/mixin";
import { mapMutations } from "vuex";
export default {
  name: "Recommend",
  mixins: [playlistMixin],
  data() {
    return {
      recommend: [],
      discList: [],
      clickImg: false
    };
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === 200) {
          this.recommend = res.data;
        }
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === 200) {
          this.discList = res.data;
        }
      });
    },
    loadImg() {
      if (!this.clickImg) {
        this.$refs.recommend.refresh();
        this.clickImg = true;
      }
    },
    handlePlaylist(NewPlaylist) {
      const bottom = NewPlaylist.length > 0 ? "60px" : 0;
      this.$refs.list.style.bottom = bottom;
      this.$refs.recommend.refresh();
    },
    selectItem(item){
      this.setDisc(item)
      this.$router.push({
        path:`/recommend/${item.id}`
      })
    },
    ...mapMutations({
      setDisc:'SET_DISC'
    })
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.recommend {
  position: absolute;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        padding: 0 1.25rem 1.25rem 1.25rem;

        .icon {
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 230px;

          .name {
            margin-bottom: 0.625rem;
            no-wrap();
          }

          .desc {
            color: rgba(255, 255, 255, 0.3);
          }
        }
      }
    }
  }
}
</style>
