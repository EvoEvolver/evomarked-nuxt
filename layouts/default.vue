<template>
<div><Html>
    <Head>
      <Link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css"
        integrity="sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET"
        crossorigin="anonymous"
      />
    </Head>
    <LayoutDefault><slot></slot></LayoutDefault>
  </Html></div>
</template>

<script setup>
defineProps({
  name:{}
})
</script>
<style lang="sass">
</style>