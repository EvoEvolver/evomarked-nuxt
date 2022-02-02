<template>
    <div v-if="prevPage || nextPage" style="display: flex;">
        <div style="width: 48%; text-align: center;">
            <a
                class="prev-next-button"
                style="text-align:left;"
                v-if="prevPage"
                :href="(typeof prevPage == 'string') ? prevPage : prevPage.link"
            >← {{ prevPageTitle }}</a>
        </div>
        <div style="width: 48%; text-align: center;">
            <a
                class="prev-next-button"
                style="text-align:right;"
                v-if="nextPage"
                :href="(typeof nextPage == 'string') ? nextPage : nextPage.link"
            >{{ nextPageTitle }} →</a>
        </div>
    </div>
</template>
<script setup>
import { inject, computed } from "vue"

const globalEnv = inject('globalEnv')
const pageEnv = inject('pageEnv')

// prevPage , nextPage can be a string or a dict like {title:"",link:""}
const prevPage = pageEnv.prevPage
const nextPage = pageEnv.nextPage

function getTitle(page) {
    if (page.title)
        return page.title
    if (typeof page == "string") {
        return globalEnv.value?.pageInfo[page]?.title || page
    } else {
        return globalEnv.value?.pageInfo[page.link]?.title || page.link
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