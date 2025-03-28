<template>
  <div class="singer">
    <listview @select="selectSinger" :data="singlist"></listview>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList } from "api/singer.js";
import { ERR_OK } from "api/config.js";
import { Singer } from "common/js/singer.js";
import Listview from "base/listview/listview.vue";
import { mapMutations } from "vuex";
import pinyin from "base/pinyin/Convert_Pinyin.js";

const HOT_SINGER_LEN = 10;
const HOT_NAME = "热门";
export default {
  name: "Singer",
  data() {
    return {
      singlist: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === 200) {
          let list = res.data;
          list.sort(function compareFunction(item1, item2) {
            return item1.name.localeCompare(item2.name);
          });
          this.singlist = this._normalizeSinger(list);
        }
      });
    },
    _normalizeSinger(list) {
      let arr = [];
      let code = [];
      for (var i = 0; i < 26; i++) {
        arr[i] = {};
        if (i == 0) {
          arr[i].title = "热门";
          arr[i].items = [];
        } else {
          arr[i].title = String.fromCharCode(65 + i - 1);
          arr[i].items = [];
        }
      }
      list.forEach((singitem, index) => {
        if (index < 10) {
          arr[0].items.push(singitem);
        }
        arr.forEach(item => {
          if (item.title == pinyin.getFullChars(singitem.name).substr(0, 1)) {
            item.items.push(singitem);
          }
        });
      });
      return arr;
    },
    selectSinger(item) {
      this.$router.push(`/singer/${item.id}`);
      this.setSinger(item);
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  },
  components: {
    Listview
  }
};
</script>
