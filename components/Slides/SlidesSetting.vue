<template>
    <div v-if="slidesSettings">
        <div>
            Voice style:
            <select v-if="voiceTypes" v-model="slidesSettings.voiceStyleName">
                <option v-for="(item, key) of filteredVoices">{{ item.name }}</option>
            </select>
        </div>
        <div>
            Voice speed:
            <input
                type="range"
                min="1"
                max="100"
                v-model="slidesSettings.voiceSpeed"
                class="slider"
            />
            {{ slidesSettings.voiceSpeed }}
        </div>
        <div>
            Voice pitch:
            <input
                type="range"
                min="1"
                max="100"
                v-model="slidesSettings.voicePitch"
                class="slider"
            />
            {{ slidesSettings.voicePitch }}
        </div>
        <!--{{slidesSettings}}-->
    </div>
</template>
<script setup>
import { computed, inject, onMounted, watch } from "vue"
import { filteredVoices as _filteredVoices } from "./voiceStyleHelper"

const props = defineProps({
    voiceTypes: {},
    voiceLang: {}
})

const slidesSettings = inject("slidesSettings")

const filteredVoices = computed(() => _filteredVoices(props.voiceTypes, props.voiceLang))


watch(() => slidesSettings.value.voiceStyleName, (val, oldVal) => { 
    slidesSettings.value.voiceStyleSetting[props.voiceLang] = val
    slidesSettings.value.voiceStyleSetting = Object.assign({},slidesSettings.value.voiceStyleSetting)
})

import { getGoodVoice } from "./voiceStyleHelper"

onMounted(() => {
    if (!slidesSettings.value.voiceStyleName) {
        slidesSettings.value.voiceStyleName = getGoodVoice(props.voiceTypes, props.voiceLang).name
    }
})

</script>
<style scoped>
div {
    margin: 1rem;
}
.slider {
}
</style>