<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
        ref="progressBtn"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { prefixStyle } from "common/js/dom.js";
const transform = prefixStyle("transform");
const progressBtnWidth = 16;
export default {
  name: "Progress-bar",
  props: ["percent"],
  created() {
    this.touch = {};
  },
  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const pageX = e.touches[0].pageX - this.touch.startX;
      this._offsetWidth(this._max(pageX + this.touch.left));
    },
    progressTouchEnd() {
      this.touch.initiated = false;
      this._triggerPercent();
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const percent = this.$refs.progress.clientWidth / barWidth;
      this.$emit("percentChange", percent);
    },
    _offsetWidth(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
    },
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      this._offsetWidth(this._max(e.pageX - rect.left));
      this._triggerPercent();
    },
    _max(x) {
      const Maxpage = this.$refs.progressBar.clientWidth - progressBtnWidth;
      return Math.max(0, Math.min(Maxpage, x));
    }
  },

  watch: {
    percent(newPercent) {
      if (newPercent > 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const offsetWidth = newPercent * barWidth;
        this._offsetWidth(offsetWidth);
      }
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      width: 0;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>