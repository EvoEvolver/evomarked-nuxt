<template>
  <div class="remark-box" :id="id">
    <span v-if="!hideHead">
      <span style="font-weight: bold">{{ type }} {{ index }}</span>
      <span v-if="title"> ({{ title }})</span>
    </span>
    <div style="width:100%;margin-top: 0.3rem;margin-bottom: 0.3rem;">
      <slot></slot>
    </div>
    <div style="text-align:left;" class="minor-text">
      <div style="margin: auto;">
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
  text-align: center
  font-size: $minor-font-size
  &>:first-child::before
    content: ''
    font-weight: bold
    
</style>