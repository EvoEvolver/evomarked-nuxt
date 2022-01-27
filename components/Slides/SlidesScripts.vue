<template>
    <div class="scripts" ref="scriptBox">
        <span
            v-if="!scriptList || scriptList.length == 0"
            class="other-script"
        >There is no script in this page.</span>
        <span
            v-for="(listForClkIn, clkIn) of scriptList"
            :ref="el => { if (el && listForClkIn) scriptEls[clkIn] = el }"
        >
            <span
                v-if="listForClkIn"
                v-for="script of listForClkIn"
                :class="clkIn == currPlayIndex ? 'focusing-script' : 'other-script'"
            >
                <span v-if="script">
                    {{ script }}
                    <br />
                </span>
            </span>
        </span>
    </div>
</template>
<script setup>
import { inject, watch } from "vue"
const props = defineProps({
    scriptList: {},
    currPlayIndex: {}
})
const scriptEls = ref([])
const scriptBox = ref(null)
watch(() => props.currPlayIndex, (val, oldVal) => {
    if (scriptEls.value[val]) {
        scriptBox.value.scroll({
            top: scriptEls.value[val].offsetTop,
            behavior: 'smooth'
        })
    }
})

</script>
<style lang="sass" scoped>

.scripts
    margin: auto
    max-width: 50rem
    max-height: 10rem
    border: 1px solid
    overflow: scroll
    background-color: rgba(226, 226, 226, 0.486)
    overflow-x: hidden
    text-align: center

.focusing-script
    color: black
    font-weight: bold
    margin: 0.5rem 0
    text-shadow: 0 0 0.4em rgb(255, 255, 255), -0 -0 0.4em rgb(255, 255, 255)

.other-script
    font-weight: bold
    color: rgb(110, 110, 110)

/* width */
::-webkit-scrollbar
    width: 7px

/* Track */
::-webkit-scrollbar-track
    background: #f1f1f1

/* Handle */
::-webkit-scrollbar-thumb
    background: #888

/* Handle on hover */
::-webkit-scrollbar-thumb:hover
    background: #555
    
</style>