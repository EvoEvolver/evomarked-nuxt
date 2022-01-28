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

</style>