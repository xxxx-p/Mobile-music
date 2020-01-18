<template>
  <div class="m-header">
    <div class="icon"></div>
    <span class="text">Chicken Music</span>
  </div>
</template>
<script>
export default {};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.m-header {
  position: relative;
  height: 2.75rem;
  justify-content: center;
  align-items: center;
  font-size: 0;
  color: $color-theme;
  display: flex;

  .icon {
    bg-image: 'logo';
    width: 1.875rem;
    height: 2rem;
    margin-right: 9px;
    background-size: cover;
  }

  .text {
    font-size: 18px;
  }
}
</style>