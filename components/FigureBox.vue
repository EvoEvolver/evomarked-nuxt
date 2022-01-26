<template>
  <RemarkBox type="Figure" :title="title" :id="id" :index="index" :hideHead="true">
    <div style class="figure-box">
      <slot name="img"></slot>
    </div>
    <template v-slot:caption>
      <slot></slot>
    </template>
  </RemarkBox>
</template>

<script>
import RemarkBox from "./RemarkBox.vue";
export default {
  props: ["src", "id", "index", "title"],
  components: { RemarkBox }
};
</script>

<style lang="sass">

.figure-box
  text-align: center

  & > img
    margin: auto
    max-height: 25rem

</style>