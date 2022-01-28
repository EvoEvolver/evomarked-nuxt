<template>
    <div class="document-end">
        <hr class="hr-edge-weak" />
        <PrevNextBar></PrevNextBar>
        <CiteList></CiteList>
    </div>
</template>

<script>
import CiteList from "./Cite/CiteList.vue";
export default {
    components: { CiteList }
}
</script>

<style lang="sass" scoped>

.document-end
    margin-top: 5rem
.hr-edge-weak
    border: 0
    padding-top: 1px
    background: linear-gradient(to right, transparent, #d0d0d5, transparent)
    margin-bottom:1.2rem
</style>