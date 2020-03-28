<template>
  <scroll
    class="listview"
    ref="listview"
    :probeType="probeType"
    :listenScroll="listenScroll"
    @scroll="_scroll"
  >
    <ul class="listview-content">
      <li v-for="items of data" ref="listGroup">
        <h2 class="listview-title">{{items.title}}</h2>
        <ul class="listview-content-li">
          <li v-for="item of items.items" class="listview-item" @click="selectItem(item)">
            <img v-lazy="item.img1v1Url" class="listview-item-img" />
            <h2 class="listview-item-text">{{item.name}}</h2>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul>
        <li
          v-for="(item,index) of shortcutList"
          class="list-shortcut-item"
          :class="{'active':currentIndex===index}"
          :data-index="index"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="scrollY<0" ref="listfixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <loading v-show="!data.length"></loading>
  </scroll>
</template>
<script>
import Scroll from "base/scroll/scroll.vue";
import Loading from "base/loading/loading.vue";
import { getData } from "common/js/dom.js";
import { playlistMixin } from "common/js/mixin";
const AHCHOR_HIGHT = 18;
const TITLE_HEIGHT = 30;
export default {
  name: "Listview",
  mixins: [playlistMixin],
  props: ["data"],
  data() {
    return {
      listenScroll: true,
      probeType: 3,
      scrollY: 0,
      listHeight: [],
      currentIndex: 0,
      diff: 0
    };
  },
  components: {
    Scroll,
    Loading
  },
  computed: {
    shortcutList() {
      return this.data.map(item => {
        return item.title.substr(0, 1);
      });
    },
    fixedTitle() {
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : "";
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, "index");
      this._scrollTo(anchorIndex);
    },
    onShortcutTouchMove(e) {
      let pageY = e.touches[0].pageY - 138;
      let index = Math.floor(pageY / AHCHOR_HIGHT);

      if (index >= 0 && index <= 22) {
        this._scrollTo(index);
      }
    },
    _scrollTo(index) {
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    },
    _scroll(pos) {
      this.scrollY = pos.y;
    },
    _calculateHeight() {
      this.listHeight = [];
      let height = 0;
      const list = this.$refs.listGroup;
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight;
        this.listHeight.push(height);
      }
    },
    selectItem(items) {
      this.$emit("select", items);
    },
    handlePlaylist(NewPlaylist) {
      const bottom = NewPlaylist.length > 0 ? "60px" : 0;
      this.$refs.listview.$el.style.bottom = bottom;
      this.$refs.listview.refresh();
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY) {
      let listHeight = this.listHeight;
      for (let i = 0; i < listHeight.length; i++) {
        let height = listHeight[i];
        let heights = listHeight[i + 1];
        if (this.currentIndex === 0) {
          this.diff = height + newY;
        } else {
          this.diff = heights + newY;
        }

        //屏幕滚到顶部以上
        if (newY > 0 || -newY < height) {
          this.currentIndex = 0;
          return;
        }

        //屏幕滚到中间
        if (-newY >= height && -newY < heights) {
          this.currentIndex = i + 1;
          return;
        }
      }
      //屏幕滚到下面
      this.currentIndex = this.listHeight.length - 1;
    },
    diff(newDiff) {
      let fixedTop =
        newDiff > 0 && newDiff < TITLE_HEIGHT ? newDiff - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.listfixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    }
  }
};
</script>
<style lang="stylus" scoped>
.listview {
  width: 100%;
  position: fixed;
  top: 5.625rem;
  bottom: 0;
  overflow: hidden;

  .listview-content {
    width: 100%;
    position: absolute;
    overflow: hidden;

    .listview-content-li {
      padding: 1.25rem 0 1.25rem 1.875rem;
    }

    .listview-title {
      height: 1.875rem;
      line-height: 1.875rem;
      padding-left: 1.25rem;
      font-size: 0.75rem;
      color: hsla(0, 0%, 100%, 0.5);
      background: #333;
    }

    .listview-item {
      display: flex;
      align-items: center;
      margin-bottom: 1.25rem;

      .listview-item-img {
        width: 3.125rem;
        height: 3.125rem;
        border-radius: 50%;
      }

      .listview-item-text {
        margin-left: 1.25rem;
        color: hsla(0, 0%, 100%, 0.5);
        font-size: 0.875rem;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    right: 0;
    top: 3.125rem;
    width: 1.25rem;
    z-index: 3;
    background: rgba(0, 0, 0, 0.3);
    font-family: Helvetica;
    font-size: 12px;
    color: hsla(0, 0%, 100%, 0.5);

    .list-shortcut-item {
      padding: 0.1875rem;
      text-align: center;
    }
  }

  .active {
    color: yellow;
  }

  .list-fixed {
    height: 1.875rem;
    line-height: 1.875rem;
    padding-left: 1.25rem;
    font-size: 0.75rem;
    color: hsla(0, 0%, 100%, 0.5);
    background: #333;
  }
}
</style>
