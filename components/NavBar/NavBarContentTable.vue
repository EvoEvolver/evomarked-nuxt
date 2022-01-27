<template>
    <div v-if="pageInfoList" class="nav-content-table">
        <ul>
            <template v-for="(item, key) of pageInfoList" :key="key">
                <li v-if="item[0]!='index'">
                    <a :href="'/' + item[0]">{{ item[1]?.title || item[0] }}</a>
                </li>
            </template>
        </ul>
    </div>
</template>
<script setup>
const props = defineProps(["pageInfoList"])
</script>
<style lang="sass" scoped>

.nav-content-table a
    color: white
    font-size: 1.1rem

.nav-content-table li
    margin: 0.3rem
</style>