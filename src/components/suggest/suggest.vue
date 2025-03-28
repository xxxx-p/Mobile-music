<template>
  <scroll
    @beforeScroll="listScroll"
    :beforeScroll="beforeScroll"
    ref="suggest"
    :pullup="pullup"
    @scrollToEnd="searchMore"
    class="suggest"
    :data="resule"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item of resule">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <h1 class="hasmoresing" v-show="hasmoresing">暂无更多歌曲</h1>
      <loading v-show="hasmore" title></loading>
    </ul>
    <div v-show="!hasmore && !resule.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>
<script>
import { getSearch } from "api/search.js";
import Scroll from "base/scroll/scroll";
import NoResult from "base/no-result/no-result";
import Loading from "base/loading/loading";
import { createTopSong } from "common/js/song";
import { mapActions } from "vuex";
const perpage = 20;
export default {
  name: "suggest",
  props: ["query"],
  data() {
    return {
      type: "song",
      resule: [],
      page: 1,
      pullup: true,
      hasmore: true,
      hasmoresing: false,
      beforeScroll: true
    };
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh();
    },
    search() {
      this.resule = [];
      if (!this.query) {
        return;
      }
      this.hasmore = true;
      this.hasmoresing = false;
      this.$refs.suggest.scrollTo(0, 0);
      getSearch(this.query, this.type, perpage, this.page).then(res => {
        if (res.code === 200) {
          this.checkhas(res);
          if (!res.data.hasOwnProperty("songs")) {
            return;
          }
          this.resule = this._normalizeSongs(res.data.songs);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        if (item.id && item.name) {
          ret.push(createTopSong(item));
        }
      });
      return ret;
    },
    getDisplayName(item) {
      return `${item.name} - ${item.ar[0].name}`;
    },
    searchMore() {
      if (this.hasmoresing) {
        return;
      }
      this.hasmore = true;
      this.page++;
      getSearch(this.query, this.type, perpage, this.page).then(res => {
        if (res.code === 200) {
          this.checkhas(res);
          if (!this.hasmore) {
            this.hasmoresing = true;
            return;
          }
          this.resule = this.resule.concat(res.data.songs);
          this.hasmore = false;
        }
      });
    },
    checkhas(res) {
      if (!res.hasOwnProperty("data") || !res.data.hasOwnProperty("songs")) {
        this.hasmore = false;
      }
    },
    selectItem(item) {
      this.insertSong(item);
      this.$emit("selectItem");
    },
    listScroll() {
      this.$emit("listScroll");
    },
    ...mapActions(["insertSong"])
  },
  watch: {
    query(newquery) {
      this.search();
    }
  },
  components: {
    Scroll,
    NoResult,
    Loading
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .hasmoresing {
      position: relative;
      padding-bottom: 20px;
      text-align: center;
      color: $color-text-d;
    }

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: $color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;

      .text {
        no-wrap();
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>