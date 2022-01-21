<template>
    <span @click="togglePanel()">
        <slot name="icon">open</slot>
    </span>
    <div class="panel-background" v-if="showPanel">
        <div class="panel-body">
            <button class="close-button" @click="togglePanel()">x</button>
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
const showPanel = ref(false)
function togglePanel(){
    showPanel.value = !showPanel.value
}
</script>
<style scoped lang="sass">

.panel-background
    position: fixed
    top: 0
    left: 0
    height: 100vh
    width: 100vw
    background-color: rgba(0, 0, 0, 0.418)
    z-index: 5

$vertical-per: 20%
$horizontal-per: 20%
.panel-body
    position: absolute
    top: $vertical-per
    left: $horizontal-per
    width: 100%-2*$horizontal-per
    height: 100%-2*$vertical-per
    background-color: white
    border-radius: 0.4rem
    text-align: center
    
.close-button
    position: absolute
    top: 1rem
    right: 1rem
    background-color: white
</style>