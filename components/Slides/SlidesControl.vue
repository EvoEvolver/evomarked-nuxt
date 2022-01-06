<template>
    <div :style="(showContent ? '' : 'visibility:hidden;')" :class="newestContent ? 'attention-box' : ''">
        <slot></slot>
    </div>
</template>

<script setup>
import { inject, provide } from "vue"
const props = defineProps({
    clkIn: {},
})
const emit = defineEmits(['play', 'stop'])
import { onMounted, ref } from 'vue'

const playIndex = inject("playIndex")
const maxPlayIndex = inject("maxPlayIndex")
const showContent = ref(false)
const newestContent = ref(false)
provide("showContent", showContent)
provide("newestContent", newestContent)

onMounted(() => {
    if (props.clkIn > maxPlayIndex.value) {
        maxPlayIndex.value = props.clkIn
    }
})

const waitForFinish = ref(false)
provide("waitForFinish", waitForFinish)

watch(() => playIndex.value, (val, oldVal) => {
    if (val >= props.clkIn) {
        emit("play")
        showContent.value = true
        newestContent.value = (val == props.clkIn)
    }
    if (val < props.clkIn) {
        showContent.value = false
        newestContent.value = false
    }
});
</script>
<!--https://www.gradient-animator.com/-->
<style>
.attention-box {
    background: linear-gradient(270deg, #ffffff, rgba(69, 196, 255,0.3));
    background-size: 500% 500%;

    -webkit-animation: AnimationName 4s ease infinite;
    -moz-animation: AnimationName 4s ease infinite;
    animation: AnimationName 4s ease infinite;
}

@-webkit-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}

</style>