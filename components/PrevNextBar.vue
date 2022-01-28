<template>
    <div style="position: relative;" v-if="prevPage || nextPage">
        <div style="position: absolute; top:0; right: 0;text-align: center;">
            <a
                class="prev-next-button"
                style="text-align:right;"
                v-if="nextPage"
                :href="(typeof nextPage == 'string') ? nextPage : nextPage.link"
            >{{ nextPageTitle }} →</a>
        </div>
        <div style="position: absolute; top:0; left: 0;text-align: center;">
            <a
                class="prev-next-button"
                style="text-align:left;"
                v-if="prevPage"
                :href="(typeof prevPage == 'string') ? prevPage : prevPage.link"
            >← {{ prevPageTitle }}</a>
        </div>
    </div>
</template>
<script setup>
import { inject, computed } from "vue"

const reactiveEnv = inject('reactiveEnv')
const pageEnv = inject('pageEnv')

// prevPage , nextPage can be a string or a dict like {title:"",link:""}
const prevPage = pageEnv.prevPage
const nextPage = pageEnv.nextPage

function getTitle(page) {
    if (page.title)
        return page.title
    if (typeof page == "string") {
        return reactiveEnv.value?.globalEnv?.pageInfo[page]?.title || page
    } else {
        return reactiveEnv.value?.globalEnv?.pageInfo[page.link]?.title || page.link
    }
}

const prevPageTitle = computed(() => {
    return getTitle(prevPage)
})

const nextPageTitle = computed(() => {
    return getTitle(nextPage)
})

</script>
<style lang="sass">

@import "./Layout/vars"

.prev-next-button
    border: 0
    //background-color: rgba(167, 167, 167,0.1)
    //color: black
    width: 90%
    height: 3rem
    font-size: 1.2rem
</style>