<template>
    <span
        ref="content"
        @mouseover="show(false)"
        @touchstart="show(true)"
        @mouseleave="hide()"
        @focusout="hide()"
    >
        <slot></slot>
        <div ref="tooltip" class="tooltip">
            <div style="max-width:100%">
                <slot name="tip"></slot>
            </div>
            <div class="arrow" data-popper-arrow></div>
        </div>
    </span>
</template>

<script>
import { createPopper } from '@popperjs/core';

export default {
    data() {
        return {
            mouseIn: false,
            popperInstance: null,
            showing: false
        }
    },
    props: {
        duration: {
            default: 100
        },
        triggerTime: {
            default: 400 // Haven't implemented
        }
    },
    mounted() {
        this.popperInstance = createPopper(this.$refs.content, this.$refs.tooltip, {
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        padding: 10
                    }
                }
            ],
        });
    },
    watch: {
    },
    methods: {
        show(isTouch) {
            if (!isTouch) {
                this.mouseIn = true
                setTimeout(() => {
                    if (this.mouseIn) {
                        this.$refs.tooltip.setAttribute('data-show', '');
                        this.popperInstance.update()
                        this.showing = true
                    }
                }, this.triggerTime)
            } else {
                this.$refs.tooltip.setAttribute('data-show', '');
                this.popperInstance.update()
                setTimeout(() => {
                    this.showing = true
                }, 50)
            }
        },
        hide() {
            this.mouseIn = false
            setTimeout(() => {
                if (!this.mouseIn) {
                    this.showing = false
                    this.$refs.tooltip.removeAttribute('data-show');
                }
            }, this.duration)
        }
    }
};
</script>

<style lang="sass" scoped>

.tooltip
    background: white
    padding: 8px 8px
    border-radius: 4px
    display: none
    border: 1px
    box-shadow: 0 0 20px 20px #88888830
    max-width: 500px
    z-index: 5
    &[data-show]
        display: block
        animation: fade 0.1s linear

@keyframes fade
    0%
        opacity: 0
    100%
        opacity: 1

.arrow, .arrow::before
    position: absolute
    width: 8px
    height: 8px
    background: inherit

.arrow
    visibility: hidden

    &::before
        visibility: visible
        content: ''
        transform: rotate(45deg)

.tooltip[data-popper-placement^='top'] > .arrow
    bottom: -4px

.tooltip[data-popper-placement^='bottom'] > .arrow
    top: -4px

.tooltip[data-popper-placement^='left'] > .arrow
    right: -4px

.tooltip[data-popper-placement^='right'] > .arrow
    left: -4px
</style>