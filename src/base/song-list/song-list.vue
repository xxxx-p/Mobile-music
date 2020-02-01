<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(item,index)" v-for="(item,index) of songs" class="item">
        <div class="content">
          <h2 class="name">{{item.name}}</h2>
          <p class="desc">{{getDesc(item)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["songs"],
  methods: {
    getDesc(item) {
      return `${item.singer}·${item.album}`;
    },
    selectItem(item,index){
      this.$emit("select",item,index)
    }
  }
};
</script>
<style lang="stylus" scoped>
.item {
  height: 4rem;
  font-size: 0.875rem;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 20px;
    overflow: hidden;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #fff;
    }

    .desc {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin-top: 4px;
      color: hsla(0, 0%, 100%, 0.3);
    }
  }
}
</style>