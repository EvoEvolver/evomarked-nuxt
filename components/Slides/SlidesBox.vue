<template>
    <div
        style="margin-left:-5rem;margin-right:-5rem;margin-top:2rem;position:relative;"
        ref="slidesbox"
    >
        <VueperSlides
            ref="slidesComp"
            :infinite="false"
            :slideRatio="2/3"
            :fillParent="isSlidesFullScreen"
            :touchable="false"
            progress
            :bulletsOutside="!isSlidesFullScreen"
            :arrows="false"
            :transition-speed="250"
            class="slidesComp"
        >
            <slot></slot>
            <template #bottom>
                <div>
                    <span
                        v-if="currSlide"
                        style="position:absolute;bottom: 0.5rem;left:0.5rem;"
                    >{{ currSlide.playIndex }}/{{ currSlide.maxPlayIndex }}</span>
                    <span
                        v-if="!isSlidesFullScreen"
                        style="display: block;margin: auto; width:70%;"
                    >
                        <img
                            class="clickable-icon"
                            src="./backward.svg"
                            @click="unPlayCurrSlide()"
                            style="width:49%;"
                        />
                        <img
                            class="clickable-icon"
                            src="./forward.svg"
                            @click="playCurrSlide()"
                            style="width:49%"
                        />
                    </span>
                    <SlidesSpeechCenter ref="speechCenter" class="speechCenter"></SlidesSpeechCenter>
                </div>
            </template>
            <template #top>
                <div class="content-upper-bar">
                    <span style="padding: 0 1rem 0 1rem;">Page title / Chapter title</span>
                    <span style="position: absolute;right: 0.5rem;">
                        <img
                            v-if="!isMuted"
                            class="clickable-icon"
                            src="./vol-high.svg"
                            @click="toggleMute()"
                            style="height: 1.7rem;"
                        />
                        <img
                            v-if="isMuted"
                            class="clickable-icon"
                            src="./vol-mute.svg"
                            @click="toggleMute()"
                            style="height: 1.7rem;"
                        />
                        <img
                            v-if="!isAutoPlay"
                            class="clickable-icon"
                            src="./autoplay.svg"
                            @click="toggleAutoplay()"
                            style="height: 1.7rem;"
                        />
                        <img
                            v-if="isAutoPlay"
                            class="clickable-icon"
                            src="./pause.svg"
                            @click="toggleAutoplay()"
                            style="height: 1.7rem;"
                        />
                        <img
                            v-if="!isSlidesFullScreen"
                            src="./expand.svg"
                            @click="makeSlidesFullScreen()"
                            class="clickable-icon"
                            style="height: 1.7rem;z-index: 3;"
                        />
                        <img
                            v-if="isSlidesFullScreen"
                            src="./contract.svg"
                            onclick="document.exitFullscreen()"
                            class="clickable-icon"
                            style="height: 1.7rem;z-index: 3;"
                        />
                    </span>
                </div>
            </template>
        </VueperSlides>
        <div></div>
    </div>
    <div>
        <button
            class="keyboard-control-button"
            ref="keyboardControlButton"
        >Press to enable keyboard control</button>
    </div>
</template>
<script setup>
import { ref, onMounted, provide, watch, computed } from 'vue'

const slidesComp = ref(null)
provide("slidesComp", slidesComp)
const speechCenter = ref(null)
provide("speechCenter", speechCenter)
const slidesbox = ref(null)

const keyboardControlButton = ref(null)
onMounted(() => {
    keyboardControlButton.value.addEventListener('keyup', keyup)
    document.addEventListener('fullscreenchange', onFullscreenChange);
})

onBeforeUnmount(() => {
})



let slidesContents = []
const currSlide = computed(() => {
    if (slidesComp.value)
        return slidesContents[slidesComp.value.slides.current]
    else
        return null
})
function playCurrSlide() {
    currSlide.value.play()
}
function unPlayCurrSlide() {
    currSlide.value.unPlay()
}

function keyup(e) {
    console.log(e.key)
    if (e.key == "ArrowRight" || e.key == " ")
        playCurrSlide()
    if (e.key == "ArrowLeft")
        unPlayCurrSlide()
    if (e.key == "ArrowUp")
        slidesComp.value.previous()
    if (e.key == "ArrowDown")
        slidesComp.value.next()
}

function addSlidesContent(slideContent) {
    slidesContents.push(slideContent)
}
provide("addSlidesContent", addSlidesContent)


function openFullscreen(elem) {
    console.log(elem)
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    }
}

const isSlidesFullScreen = ref(false)

function makeSlidesFullScreen() {
    openFullscreen(slidesbox.value)
}

provide("makeSlidesFullScreen", makeSlidesFullScreen)
const defaultSlideRatio = 2/3
const slideRatio = ref(defaultSlideRatio)

function onFullscreenChange() {
    if (document.fullscreenElement != null) {
        isSlidesFullScreen.value = true
        slideRatio.value = 1/window.devicePixelRatio
        console.log(slideRatio.value)
    } else {
        isSlidesFullScreen.value = false
        slideRatio.value = defaultSlideRatio
    }
}

provide("isSlidesFullScreen", isSlidesFullScreen)

watch(() => isSlidesFullScreen.value, (val, oldVal) => {
    if (val) {
        window.addEventListener('keyup', keyup)
    } else {
        window.removeEventListener('keyup', keyup)
    }
})

// Autoplay

const isAutoPlay = ref(false)
function toggleAutoplay() {
    isAutoPlay.value = !isAutoPlay.value
}
const playFinished = ref(true)
provide("playFinished", playFinished)
let autoplayInterval
watch(() => isAutoPlay.value, (val, oldVal) => {

    if (val) {
        autoplayInterval = setInterval(function () {
            if (playFinished.value)
                playCurrSlide()
        }, 1000)
    } else {
        clearInterval(autoplayInterval)
    }
})

// Mute

const isMuted = ref(false)
function toggleMute() {
    isMuted.value = !isMuted.value
    speechCenter.value.setMuted(isMuted.value)
    if (isMuted.value)
        speechCenter.value.cancel()
}


</script>
<style>
.vueperslides__arrow {
    color: rgb(0, 0, 0);
}
.vueperslides__bullet .default {
    background-color: rgba(0, 0, 0, 0.404);
    border: none;
    box-shadow: none;
    transition: 0.3s;
    width: 16px;
    height: 16px;
}
.vueperslides__bullet--active .default {
    background-color: rgba(0, 0, 0, 0.842);
}
.vueperslides__progress {
    background: rgba(0, 0, 0, 0.25);
    color: rgba(0, 0, 0, 0.904);
}
.upper-bar {
    height: 1rem;
    width: 100%;
    background-color: black;
}
.clickable-icon {
    height: 1.5rem;
    padding: 0px;
    margin-bottom: -0.1rem;
    margin-left: 0.2rem;
}
.clickable-icon:hover {
    background-color: rgba(128, 128, 128, 0.712);
}
.keyboard-control-button {
    background-color: white;
}
.keyboard-control-button:focus {
    background-color: greenyellow;
}
.speechCenter {
    position: absolute;
    top: 5rem;
    right: 0;
    background-color: rgba(128, 128, 128, 0.3);
}
:fullscreen .speechCenter {
    position: absolute;
    top: -6rem;
    left: 15%;
    width: 70%;
    z-index: 10;
}
.content-upper-bar {
    background-color: rgba(128, 128, 128, 0.466);
    height: 1.7rem;
}
</style>