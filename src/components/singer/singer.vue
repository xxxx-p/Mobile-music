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
import {mapMutations} from "vuex";

const HOT_SINGER_LEN = 10;
const HOT_NAME = "热门";
export default {
  name:"Singer",
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
        if (res.code === ERR_OK) {
          this.list = res.data.list;
          this.singlist = this._normalizeSinger(res.data.list);
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            })
          );
        }

        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          })
        );
      });
      let hot = [];
      let ret = [];
      for (let key in map) {
        if (map[key].title.match(/[a-zA-Z]/)) {
          ret.push(map[key]);
        } else if (map[key].title === HOT_NAME) {
          hot.push(map[key]);
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        });
      }
      return hot.concat(ret);
    },
    selectSinger(item) {
      this.$router.push(`/singer/${item.id}`);
      this.setSinger(item)
    },
    ...mapMutations({
      setSinger:'SET_SINGER'
    })
  },
  components: {
    Listview
  }
};
</script>