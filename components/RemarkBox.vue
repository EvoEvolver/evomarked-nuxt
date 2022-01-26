<template>
  <div class="remark-box" :id="id">
    <span v-if="!hideHead">
      <span style="font-weight: bold">{{ type }} {{ index }}</span>
      <span v-if="title">({{ title }})</span>
    </span>
    <p style="width:100%">
      <slot></slot>
    </p>
    <div style="text-align:left;" v-if="this && this.$slots.caption" class="minor-text">
      <div style="margin: auto;">
      <!--
        <p style="display:inline;">
          {{ type }} {{ index }}
          <span v-if="title">({{ title }})</span>:&nbsp;
        </p>-->
        <div class="remark-caption-box">
          <slot name="caption"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "id", "type", "index", "hideHead"],
};
</script>

<style lang="sass">

@import "./Layout/vars.sass"

.remark-box
  @extend %block
.remark-caption-box
  &>:first-child::before
    content: 'Caption: '
    font-weight: bold
</style>