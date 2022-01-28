<template>
    <span @click="togglePanel()">
        <slot name="icon">open</slot>
    </span>
    <div class="panel-background" v-if="showPanel">
        <div class="panel-body">
            <button class="close-button" @click="togglePanel()">
                <img src="./Icons/close.svg" style="width:100%" />
            </button>
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { provide } from "vue"
const showPanel = ref(false)
function togglePanel() {
    showPanel.value = !showPanel.value
}
provide("togglePanel", togglePanel)
</script>
<style scoped lang="sass">

@import "./Layout/vars"

.panel-background
    position: fixed
    top: 0
    left: 0
    height: 100vh
    width: 100vw
    background-color: rgba(0, 0, 0, 0.4)
    z-index: 5

$vertical-per: 20%
$horizontal-per: 20%
$horizontal-per-small-screen: 10%

.panel-body
    @extend %scroll-box
    position: absolute
    background-color: white
    border-radius: 0.4rem
    text-align: center
    overflow: scroll
    overflow-x: hidden
    overflow-y: auto
    padding-top: 1.5rem

@media (max-width: $small-screen-width)
    .panel-body
        top: $vertical-per
        left: $horizontal-per-small-screen
        width: 100%-2*$horizontal-per-small-screen
        height: 100%-2*$vertical-per

@media (min-width: $small-screen-width)
    .panel-body
        top: $vertical-per
        left: $horizontal-per
        width: 100%-2*$horizontal-per
        height: 100%-2*$vertical-per

.close-button
    position: absolute
    top: 1rem
    right: 1rem
    background-color: white
    border: 0
    width: 2rem
    height: 2rem
    padding: 0

.close-button:hover
    background-color: $focus-color

</style>