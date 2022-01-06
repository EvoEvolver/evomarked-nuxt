<template>
    <div class="slide-content">
        <div :class="'slide-' + (type || 'default')">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>

import { inject, provide, onMounted } from 'vue'

const props = defineProps({
    type: {},
})

const slidesComp = inject("slidesComp")
const playIndex = ref(0)
provide("playIndex", playIndex)
const maxPlayIndex = ref(0)
provide("maxPlayIndex", maxPlayIndex)

const addSlidesContent = inject("addSlidesContent")

onMounted(() => {
    addSlidesContent({
        play: play,
        unPlay: unPlay,
        playIndex: playIndex,
        maxPlayIndex: maxPlayIndex
    })
})


function play() {
    if (playIndex.value >= maxPlayIndex.value) {
        slidesComp.value.next()
        playIndex.value = maxPlayIndex.value+1
        return
    }
    playIndex.value += 1
}

function unPlay() {
    if (playIndex.value <= 0) {
        slidesComp.value.previous()
        return
    }
    playIndex.value -= 1
}


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
</style>