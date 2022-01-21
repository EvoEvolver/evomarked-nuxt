<template>
    <div class="slide-content">
        <div class="script-box" v-if="showScript">
            <SlidesScripts :scriptList="scriptList" :currPlayIndex="currPlayIndex"></SlidesScripts>
        </div>
        <div :class="'slide-' + (type || 'default')">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>

import { inject, provide, onMounted } from 'vue'

const props = defineProps({
    type: {},
    title: {},
    section: {},
})

const currPlayIndex = ref(0)
provide("currPlayIndex", currPlayIndex)

const maxPlayIndex = ref(0)
provide("maxPlayIndex", maxPlayIndex)

let playingList = []
provide("playingList", playingList)

let speechContents = []
provide("speechContents", speechContents)

const addSlidesContent = inject("addSlidesContent")

let slidesControls = ref([])

function addSlidesControl(slidesControl) {
    let index = slidesControls.value.push(slidesControl)
    return index
}
provide("addSlidesControl", addSlidesControl)

function readyToPlayNext() {
    for (let playing of playingList) {
        if (playing)
            return false
    }
    return true
}

onMounted(() => {
    addSlidesContent({
        currPlayIndex: currPlayIndex,
        maxPlayIndex: maxPlayIndex,
        readyToPlayNext: readyToPlayNext,
        props: props,
    })
})
let autoplayInterval
let autoPlayIndex = 0
// currPlayIndex is controlled by SlidesBox
watch(() => currPlayIndex.value, (val, oldVal) => {
    let currPlayContents = []
    let currFiniteEndure = []
    let oldFiniteEndure = []
    for (let item of slidesControls.value) {
        if (item.clkIn == val) {
            currPlayContents.push(item)
            if (item.hasExtraController) {
                if (item.extraController.type == "finiteEndure") {
                    currFiniteEndure.push(item)
                }
            }
        } else if (item.clkIn == oldVal) {
            if (item.hasExtraController) {
                if (item.extraController.type == "finiteEndure") {
                    oldFiniteEndure.push(item)
                }
            }
        }
    }
    currFiniteEndure.sort((item1, item2) => {
        if (!item1.autoIn) return -1
        if (!item2.autoIn) return 1
        return item1.autoIn - item2.autoIn
    })
    // Try to stop old playings
    for (let item of oldFiniteEndure) {
        item.extraController.finishPlay()
    }
    clearInterval(autoplayInterval)
    autoPlayIndex = 0
    // Play new contents
    autoplayInterval = setInterval(function () {
        if (readyToPlayNext()) {
            let item = currFiniteEndure[autoPlayIndex]
            if (!item) {
                clearInterval(autoplayInterval)
                return
            }
            item.extraController.play()
            autoPlayIndex++
        }
    }, 100)
});


// Script Box
const showScript = inject("showScript")
const scriptList = computed(()=>{
    let scriptList = []
    for (let item of slidesControls.value) {
        if (item?.extraController?.script) {
            if(!scriptList[item.clkIn])
                scriptList[item.clkIn] = []
            if(!item.autoIn)
                scriptList[item.clkIn][0] = item.extraController.script
            else
                scriptList[item.clkIn][item.autoIn] = item.extraController.script
            
        }
    }
    return scriptList
})

</script>

<style scoped>
.slide-content {
    position: relative;
    height: 99%;
    background-color: white;
}
.content-control-bar {
    position: absolute;
    bottom: 0;
    color: rgba(128, 128, 128, 0.774);
    width: 98%;
}
.content-upper-bar {
    font-size: 1.2rem;
    position: absolute;
    top: 0.4rem;
    height: 1.7rem;
    width: 100%;
    background-color: rgba(128, 128, 128, 0.233);
}
.script-box{
    padding: 0.1rem;
    width: 100%;
    position: absolute;
    top:3rem;
    text-align: center;
    z-index: 20;
}
</style>