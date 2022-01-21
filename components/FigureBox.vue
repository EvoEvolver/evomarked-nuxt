<template>
<RemarkBox name="Figure" :title="title" :id="id" :index="index" :hideHead="true">
<div style="" class="figure-box">
<slot name="img"></slot>
</div>
  <template v-slot:caption><slot></slot></template>
</RemarkBox>

<!--
  <figure :title="title" :id="id" :index="index">
  <slot name="img"></slot>
    <figcaption :index="index" :title="title" holder="Figure">
      <span v-if="title" class="caption-title">{{ title }}</span>
      <slot></slot>
    </figcaption>
  </figure>
-->
</template>

<script>
import RemarkBox from "./RemarkBox.vue";
export default {
    props: ["src", "id", "index", "title"],
    components: { RemarkBox }
};
</script>

<style>
.figure-box{
  text-align: center;
}
.figure-box > img {
  margin: auto;
  max-height:25rem;
}
</style>