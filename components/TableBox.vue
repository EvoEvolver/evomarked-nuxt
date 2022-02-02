<template>
  <div>
    <RemarkBox :title="title" :id="id" :index="index" type="Table">
      <div class="table-box">
        <slot></slot>
      </div>
      <template v-slot:caption>
          <slot name="caption"></slot>
      </template>
    </RemarkBox>
  </div>
</template>

<script setup>
import { computed } from "vue"
import RemarkBox from "./RemarkBox.vue";

const props = defineProps({
  content: {},
  title: {},
  id: {},
  index: {},
})
</script>

<style lang="sass">

@import "./Layout/vars"

.table-box
  > table
    min-width: 60%
    margin: auto

  > table, th, td
    border: 1px solid black
    border-collapse: collapse
    text-align: center
  thead
    font-weight: bold
    background-color: rgba(0, 0, 0, 0.2)
</style>