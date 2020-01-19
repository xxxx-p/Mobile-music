<template>
  <div class="loading-content">
    <img class="loading-img" src="./loading.gif" />
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
export default {
  name: "Loading",
  props: {
    title: {
      type: String,
      default: "正在载入..."
    }
  }
};
</script>
<style lang="stylus" scoped>@import '~common/stylus/variable';

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 50%;

  .loading-img {
    width: 1.5rem;
    height: 1.5rem;
  }

  .desc {
    line-height: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
  }
}
</style>