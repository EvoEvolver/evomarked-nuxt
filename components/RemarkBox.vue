<template>
  <div class="remark-box" :id="id">
    <span v-if="!hideHead">
      <span style="font-weight: bold">{{ name }} {{ index }}</span>
      <span v-if="title">({{ title }})</span>
    </span>
    <p>
      <slot></slot>
    </p>
    <div style="text-align:center;" v-if="this && this.$slots.caption" class="minor-text">
    <div style="margin: auto;">
      <p style="display:inline-block;">{{ name }} {{ index }}<span v-if="title">({{ title }})</span>:&nbsp;</p><div style="display:inline-block;"><slot name="caption"></slot></div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "id", "name", "index", "hideHead"],
};
</script>

<style lang="sass">
@import "./Layout/vars.sass"

.remark-box
    @extend %block
</style>