<template>
<span>
</span>
</template>

<script setup>
import { onMounted, inject } from 'vue'

const props = defineProps({
    text: {
        default: "The quick brown fox jumps over the lazy dog"
    }
})


const newestContent = inject("newestContent")
const speechCenter = inject("speechCenter")
const waitForFinish = inject("waitForFinish")
const playFinished = inject("playFinished")


onMounted(() => {
    waitForFinish.value = true
})


watch(() => newestContent.value || false, (val, oldVal) => {
    if (val) {
        playFinished.value = false
        speechCenter.value.speak(props.text, playFinished)
    }else{
        playFinished.value = true
        speechCenter.value.cancel()
    }
});

</script>

<style>
</style>