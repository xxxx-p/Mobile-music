<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from "components/m-header/m-header.vue";
import Tab from "components/tab/tab.vue";
export default {
  components: {
    MHeader,
    Tab
  }
  // created(){
  //   this.setfontsize()
  // },
  // methods: {
  //   setfontsize() {
  //     var docEl = document.documentElement;

  //     // set 1rem = viewWidth / 10
  //     function setRemUnit() {
  //       var rem = docEl.clientWidth / 23.4;
  //       docEl.style.fontSize = rem + "px";
  //     }

  //     setRemUnit();

  //     // reset rem unit on page resize
  //     window.addEventListener("resize", setRemUnit);
  //     window.addEventListener("pageshow", function(e) {
  //       if (e.persisted) {
  //         setRemUnit();
  //       }
  //     });
  //   }
  // }
};
</script>
<style lang="stylus" scoped></style>
