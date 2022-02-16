<template>
    <div ref="slidesBox" class="slides-box-root">
        <div :id="id"></div>
        <VueperSlides
            ref="slidesComp"
            :infinite="false"
            :slideRatio="slideRatio"
            :fillParent="isSlidesFullScreen"
            :touchable="false"
            progress
            :bulletsOutside="false"
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
                    >{{ currSlide.currPlayIndex }}/{{ currSlide.maxPlayIndex }}</span>
                    <span
                        v-show="!isSlidesFullScreen"
                        style="display: block;position:absolute; right:0.5rem; bottom:0.5rem; width:15%;"
                    >
                        <img
                            class="clickable-icon"
                            src="./backward.svg"
                            @click="unPlayCurrSlide()"
                            style="width:30%;"
                            alt="backward"
                        />
                        <img
                            class="clickable-icon"
                            src="./forward.svg"
                            @click="playCurrSlide()"
                            style="width:30%"
                            alt="forward"
                        />
                        <HoverTip>
                            <button class="keyboard-control-button" ref="keyboardControlButton">
                                <img
                                    v-if="!isSmallScreen"
                                    style="height: 1.5rem;padding: 0px;margin-left: 0.2rem;margin-right: 0.2rem;"
                                    src="./keyboard.svg"
                                    alt="keyboard"
                                />
                            </button>
                            <template v-slot:tip>
                                <table style="width:8rem;">
                                    <tr>
                                        <td colspan="2">Press to control</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">→</td>
                                        <td>Next point</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">↓</td>
                                        <td>Next page</td>
                                    </tr>
                                </table>
                            </template>
                        </HoverTip>
                    </span>
                </div>
            </template>
            <template #top>
                <div class="content-upper-bar">
                    <span style="padding: 0 1rem 0 1rem;" v-if="currSlide">
                        {{ currSlide.props.title }}
                        <span
                            v-if="currSlide.props.title && currSlide.props.section"
                        >/</span>
                        {{ currSlide.props.section }}
                    </span>
                    <span style="position: absolute;right: 0.5rem;">
                        <FullScreenPanel>
                            <SlidesSetting
                                :voiceTypes="speechCenter.$data.voices"
                                :voiceLang="voiceLang"
                            ></SlidesSetting>
                            <template v-slot:icon>
                                <img
                                    class="clickable-icon"
                                    src="./settings.svg"
                                    style="height: 1.7rem;"
                                    alt="settings"
                                />
                            </template>
                        </FullScreenPanel>
                        <img
                            class="clickable-icon"
                            src="./subtitles.svg"
                            @click="toggleShowScript()"
                            style="height: 1.7rem;"
                            alt="subtitles"
                        />
                        <img
                            v-show="!isMuted"
                            class="clickable-icon"
                            src="./vol-high.svg"
                            @click="toggleMute()"
                            style="height: 1.7rem;"
                            alt="mute"
                        />
                        <img
                            v-show="isMuted"
                            class="clickable-icon"
                            src="./vol-mute.svg"
                            @click="toggleMute()"
                            style="height: 1.7rem;"
                            alt="unmute"
                        />
                        <img
                            v-show="!isAutoPlay"
                            class="clickable-icon"
                            src="./autoplay.svg"
                            @click="toggleAutoplay()"
                            style="height: 1.7rem;"
                            alt="autoplay"
                        />
                        <img
                            v-show="isAutoPlay"
                            class="clickable-icon"
                            src="./pause.svg"
                            @click="toggleAutoplay()"
                            style="height: 1.7rem;"
                            alt="stop autoplay"
                        />
                        <img
                            v-if="!isSlidesFullScreen"
                            src="./expand.svg"
                            @click="makeSlidesFullScreen()"
                            class="clickable-icon"
                            style="height: 1.7rem;z-index: 3;"
                            alt="fullscreen"
                        />
                        <img
                            v-if="isSlidesFullScreen"
                            src="./contract.svg"
                            onclick="document.exitFullscreen()"
                            class="clickable-icon"
                            style="height: 1.7rem;z-index: 3;"
                            alt="stop fullscreen"
                        />
                    </span>
                </div>
            </template>
        </VueperSlides>
        <div>
            <SlidesSpeechCenter ref="speechCenter" class="speechCenter" :voiceLang="voiceLang"></SlidesSpeechCenter>
        </div>
    </div>
    <div></div>
</template>
<script setup>
import { ref, onMounted, provide, watch, computed } from 'vue'
import { defaultVoiceStyle } from './voiceStyleHelper'

const props = defineProps({
    voiceLang: {
        default: "English"
    },
    id: {}
})

// Slide Settings
// TODO make useCookie work
const cookieOption = {sameSite: true}
let voiceSpeed = useCookie("voiceSpeed", cookieOption)
voiceSpeed.value = voiceSpeed.value || 60
let voicePitch = useCookie("voicePitch", cookieOption)
voicePitch.value = voicePitch.value || 60
let voiceStyleSetting = useCookie("voiceStyleSetting", cookieOption)
voiceStyleSetting.value = voiceStyleSetting.value || {}

let slidesSettings = ref({
    voiceSpeed: voiceSpeed,
    voicePitch: voicePitch,
    voiceStyleName: voiceStyleSetting.value[props.voiceLang],
    voiceStyleSetting: voiceStyleSetting
})
provide("slidesSettings", slidesSettings)

const slidesComp = ref(null)
provide("slidesComp", slidesComp)
const speechCenter = ref(null)
provide("speechCenter", speechCenter)
const slidesBox = ref(null)

// Add keyboard listeners
const keyboardControlButton = ref(null)

onMounted(() => {
    keyboardControlButton.value.addEventListener('keyup', keyup)
    document.addEventListener('fullscreenchange', onFullscreenChange);
    window.addEventListener('resize', onResize);
    onResize()
    // TODO unmount the listeners when destroy
})

onBeforeUnmount(() => {
})

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

// add the reference of slides
let slidesContents = []
const currSlide = computed(() => {
    if (slidesComp.value)
        return slidesContents[slidesComp.value.slides.current]
    else
        return null
})

function playCurrSlide() {
    /**
     * Play the content in the slide
     * Will end next slide if all contents are played
     * This function will be given to SlidesBox and be called by it
     */
    if (currSlide.value.currPlayIndex.value >= currSlide.value.maxPlayIndex.value) {
        currSlide.value.currPlayIndex.value = currSlide.value.maxPlayIndex.value + 1
        slidesComp.value.next()
        return
    }
    currSlide.value.currPlayIndex.value += 1
}

function unPlayCurrSlide() {
    if (currSlide.value.currPlayIndex.value <= 0) {
        slidesComp.value.previous()
        return
    }
    currSlide.value.currPlayIndex.value -= 1
}

function addSlidesContent(slideContent) {
    slidesContents.push(slideContent)
}
provide("addSlidesContent", addSlidesContent)


// Full-screen

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    }
}

const isSlidesFullScreen = ref(false)

function makeSlidesFullScreen() {
    openFullscreen(slidesBox.value)
}

const _fixedDefaultSlideRatio = 3 / 4
const defaultSlideRatio = ref(_fixedDefaultSlideRatio)
const slideRatio = ref(defaultSlideRatio.value)

// The ratio of the slides will be changed to the ratio of screen
function onFullscreenChange() {
    if (document.fullscreenElement != null) {
        isSlidesFullScreen.value = true
        slideRatio.value = 1 / window.devicePixelRatio
    } else {
        isSlidesFullScreen.value = false
        slideRatio.value = defaultSlideRatio.value
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

// Responsiveness

const isSmallScreen = ref(false)

function onResize() {
    if (document.documentElement.clientWidth < 600) {
        let ratio = (document.documentElement.clientHeight - 100) / document.documentElement.clientWidth
        slideRatio.value = ratio
        defaultSlideRatio.value = ratio
        isSmallScreen.value = true
    } else {
        defaultSlideRatio.value = _fixedDefaultSlideRatio
        if (!isSlidesFullScreen.value)
            slideRatio.value = _fixedDefaultSlideRatio
        isSmallScreen.value = false
    }
}

// Autoplay

const isAutoPlay = ref(false)
function toggleAutoplay() {
    isAutoPlay.value = !isAutoPlay.value
}


function isTheLast() {
    if (slidesComp.value.slides.current == slidesContents.length - 1) {
        if (currSlide.value.maxPlayIndex.value == currSlide.value.currPlayIndex.value) {
            return true
        }
    }
    return false
}
let autoplayInterval
watch(() => isAutoPlay.value, (val, oldVal) => {
    if (val) {
        autoplayInterval = setInterval(function () {
            if (isTheLast()) {
                isAutoPlay.value = false
            }
            if (currSlide.value.readyToPlayNext())
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
// Show & Hide script
const showScript = ref(false)
provide("showScript", showScript)
function toggleShowScript() {
    showScript.value = !showScript.value
}


</script>
<style src="./slides.sass" lang="sass">

</style>
<style lang="sass">

.vueperslides__arrow
    color: rgb(0, 0, 0)

.vueperslides__bullet .default
    background-color: rgba(0, 0, 0, 0.404)
    border: none
    box-shadow: none
    transition: 0.3s
    width: 16px
    height: 16px

.vueperslides__bullet--active .default
    background-color: rgba(0, 0, 0, 0.842)

.vueperslides__progress
    background: rgba(0, 0, 0, 0.25)
    color: rgba(0, 0, 0, 0.904)

.upper-bar
    height: 1rem
    width: 100%
    background-color: black

.clickable-icon
    height: 1.5rem
    padding: 0px
    margin-bottom: -0.1rem
    margin-left: 0.2rem

    &:hover
        background-color: rgba(128, 128, 128, 0.712)

.keyboard-control-button
    padding: 0
    background-color: white
    margin: 0 0.2rem
    border: 0

    &:focus
        background-color: rgba(128, 128, 128, 0.493)

.speechCenter
    text-align: center
    margin: auto
    margin-top: 1rem
    width: 90%
    background-color: rgba(128, 128, 128, 0.3)

.content-upper-bar
    background-color: rgba(128, 128, 128, 0.466)
    height: 1.7rem
</style>