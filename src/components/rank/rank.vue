<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li @click="selectItem(item)" class="item" v-for="item of topList">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.img1v1Url" />
          </div>
          <ul class="songlist">
            <li class="song">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from "base/scroll/scroll";
import { playlistMixin } from "common/js/mixin";
import { mapMutations } from "vuex";
import { getTopList } from "api/rank.js";
import Loading from "base/loading/loading";
export default {
  mixins: [playlistMixin],
  created() {
    this._getTopList();
  },
  data() {
    return {
      topList: []
    };
  },
  methods: {
    _getTopList() {
      getTopList().then(res => {
        if (res.code === 200) {
          this.topList = res.data;
        }
      });
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.rank.style.bottom = bottom;
      this.$refs.toplist.refresh();
    },
    selectItem(item) {
      this.setTopList(item);
      this.$router.push({
        path: `/rank/${item.id}`
      });
    },
    ...mapMutations({ setTopList: "SET_TOP_LIST" })
  },
  components: {
    Scroll,
    Loading
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .toplist {
    height: 100%;
    overflow: hidden;

    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;

      &:last-child {
        padding-bottom: 20px;
      }

      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }

      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;

        .song {
          no-wrap();
          line-height: 26px;
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>