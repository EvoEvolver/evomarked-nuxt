<template>
<!--
<span style="position:absolute; left:0rem;margin-top:-1rem;">
<div v-show="showScript" class="script-box">
{{ text }}
</div>
</span>-->
<span></span>
</template>

<script setup>
import { onMounted, inject, watch } from 'vue'

const props = defineProps({
    text: {
        default: "The quick brown fox jumps over the lazy dog"
    }
})

const speechCenter = inject("speechCenter")

const speechContents = inject("speechContents")

const playingList = inject("playingList")
let playingListId = -1

const addExtraController = inject("addExtraController")

onMounted(() => {
    speechContents.push(props.text)
    playingListId = playingList.push(false)
    addExtraController({
        type : "finiteEndure",
        play: play,
        finishPlay: finishPlay,
        script: props.text
    })
})


function play(){
    playingList[playingListId] = true
    speechCenter.value.speak(props.text, playingList, playingListId)
}

function finishPlay(){
    playingList[playingListId] = false
    speechCenter.value.cancel()
}




</script>

<style>
.voice-box{
    height: 0.1rem;
}

</style>