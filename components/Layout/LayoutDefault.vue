<template>
    <slot></slot>
</template>

<script setup>
import { provide, onMounted, reactive } from "vue"
import katex from "katex/dist/katex.mjs";
provide('katexAPI', katex);
const { data:globalEnv } = await useAsyncData('globalEnv', () => $fetch('/page_assets/globalEnv.json'), { server: false })
provide('globalEnv', globalEnv);
</script>

<!-- Some style is in DocumentBegin-->
<style lang="sass">

</style>

