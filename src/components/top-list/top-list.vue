<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgimage" :songs="song"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from "components/music-list/music-list";
import { getMusicList } from "api/rank";
import { ERR_OK } from "api/config";
import { mapGetters } from "vuex";
import { createTopSong } from "common/js/song";
export default {
  data() {
    return {
      song: [],
      rank:true
    };
  },
  computed: {
    ...mapGetters(["toplist"]),
    title() {
      return this.toplist.name;
    },
    bgimage() {
      return this.toplist.img1v1Url;
    }
  },
  created() {
    this._getMusicList();
  },
  methods: {
    _getMusicList() {
      if(!this.toplist.id){
        this.$router.push({
          path:"/rank"
        })
      }
      getMusicList(this.toplist.id).then(res => {
        if (res.code === 200) {
          this.song = this._normalizeSongs(res.data.songs); 
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        ret.push(createTopSong(musicData));
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
  transition: all 0.3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>