<template>
<div class="block" style="padding:1rem;">
<h3>Pages</h3>
<template v-for="(item, key) of pageEnv.linearize">
<OuterRef :page="item"></OuterRef> <br/>
</template>
</div>
</template>
<script setup>
import OuterRef from './OuterRef.vue';
const pageEnv = inject('pageEnv')
</script>
<style lang="sass">
@import "./Layout/vars"

</style>