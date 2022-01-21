<template>
    <div
        :style="(showContent ? '' : 'visibility:hidden;')"
        :class="isNewestContent ? 'attention-box' : ''"
    >
        <slot></slot>
    </div>
</template>

<script setup>

import { inject, provide } from "vue"
const props = defineProps({
    clkIn: {},
    autoIn: {},
})
const emit = defineEmits(['play', 'stop'])
import { onMounted, ref } from 'vue'

const currPlayIndex = inject("currPlayIndex")
const maxPlayIndex = inject("maxPlayIndex")
const showContent = ref(false)
const isNewestContent = ref(false)
provide("showContent", showContent)
provide("isNewestContent", isNewestContent)

let extraController = {}
let hasExtraController = false

function addExtraController(_extraController) {
    hasExtraController = true
    extraController = _extraController
    //console.log("hasExtraController", _extraController)
}
provide("addExtraController", addExtraController)

const addSlidesControl = inject("addSlidesControl")

onMounted(() => {
    // Add self's clkIn to parent SlidesContent
    // Update maxPlayIndex of parent SlidesContent
    if (props.clkIn > maxPlayIndex.value) {
        maxPlayIndex.value = props.clkIn
    }
    addSlidesControl({
        clkIn: props.clkIn,
        autoIn: props.autoIn,
        showContent: showContent,
        isNewestContent: isNewestContent,
        hasExtraController: hasExtraController,
        extraController: extraController
    })
})

watch(() => currPlayIndex.value, (val, oldVal) => {
    if (val >= props.clkIn) {
        emit("play")
        showContent.value = true
        isNewestContent.value = (val == props.clkIn)
    }
    if (val < props.clkIn) {
        emit("stop")
        showContent.value = false
        isNewestContent.value = false
    }
});


</script>
<!--https://www.gradient-animator.com/-->
<style>
.attention-box {
    background: linear-gradient(270deg, #ffffff, rgba(69, 196, 255, 0.3));
    background-size: 500% 500%;

    -webkit-animation: AnimationName 4s ease infinite;
    -moz-animation: AnimationName 4s ease infinite;
    animation: AnimationName 4s ease infinite;
}

@-webkit-keyframes AnimationName {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
@-moz-keyframes AnimationName {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
@keyframes AnimationName {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>