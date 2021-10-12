<template>
  <div class="tooltip">
    <slot></slot>
    <div :class="showTip ? 'tooltiptext' : 'hide'">
      <slot name="tip"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showTip: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="sass" scoped>
$tip-width: 500px
$box-color: white //rgba(0,0,0,0.8)
.tooltip
    position: relative
    display: inline-block
    color: #0084d1

    & .tooltiptext
        visibility: hidden
        width: $tip-width
        background-color: $box-color
        
        color: rgba(0,0,0,1)
        padding: 5px 30px
        //border: 1px solid
        box-shadow: 0 0 5px 5px white
        position: absolute
        z-index: 1
        bottom: 95%
        left: 0%
        margin-left: (-$tip-width*0.5)

        opacity: 0
        transition: opacity 0.3s

    &:hover .tooltiptext
        visibility: visible
        opacity: 1
        transition-delay: 0.5s

    &:hover .hide
        visibility: hidden
</style>