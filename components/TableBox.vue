<template>
  <div>
    <RemarkBox :title="title" :id="id" :index="index" type="Table">
      <p class="table-box">
        <slot></slot>
      </p>
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

.table-box
  > table
    min-width: 60%
    margin: auto

  > table, th, td
    border: 1px solid black
    border-collapse: collapse
    text-align: center
</style>