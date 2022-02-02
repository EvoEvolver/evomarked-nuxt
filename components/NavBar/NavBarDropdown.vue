<template>
    <div>
        <span @mouseenter="show()" @click="show()" @mouseleave="hide()" @focusout="hide()">
            <span class="navbar-item" ref="icon">
                <slot name="title"></slot>
            </span>
            <div
                ref="tooltip"
                v-show="showTooltip"
                style="background-color: rgba(51, 51, 51, 0.904)"
                class="content"
            >
                <slot name="content"></slot>
            </div>
        </span>
    </div>
</template>

<script setup>
import { onMounted } from "vue"

import { createPopper } from '@popperjs/core';

const icon = ref(null)
const tooltip = ref(null)
const showTooltip = ref(false)
let popperInstance
onMounted(() => {

    // Pass the button, the tooltip, and some options, and Popper will do the
    // magic positioning for you:
    popperInstance = createPopper(icon.value, tooltip.value, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [5, 0],
                },
            },
        ],
        placement: 'bottom-start',
    });
})

function show() {
    showTooltip.value = true
    popperInstance.update()
}

function hide() {
    showTooltip.value = false
}
</script>

<style lang="sass" scoped>

.navbar-item
    display: block
    color: white
    text-align: center
    padding: 0.8rem
    text-decoration: none
.content
    color: white
    border-radius: 0.4rem
    padding: 0 1rem 0 1rem
    opacity: 1
    animation: fade 0.1s linear

@keyframes fade
    0%
        opacity: 0
    100%
        opacity: 1
</style>