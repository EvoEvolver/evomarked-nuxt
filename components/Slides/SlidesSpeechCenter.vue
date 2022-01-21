<template>
    <div><!--{{ spokenText }}--></div>
</template>
<script>

export default {
    inject: ["slidesSettings"],
    props:{
        voiceLang: {}
    },
    data() {
        return {
            voices: [],
            spokenText: "",
            muted: false
        }
    },
    mounted() {
        getVoices().then((_voices) => {
            this.voices = _voices
        });
    },
    computed:{
        voice(){
            let _voice = selectVoice(this.voices, this.slidesSettings.value.voiceStyleName)
            if(!_voice){
                _voice = selectVoiceByLang(this.voices, this.voiceLang)
                this.slidesSettings.value.voiceStyleName = _voice.name
                return _voice
            }else{
                return _voice
            }
        }
    },
    methods: {
        speak(text, playingList, playingListId) {
            this.spokenText = text
            if (this.muted) {
                setTimeout(() => { playingList[playingListId] = false }, text.length * 20)
                return
            }
            let utterThis = new SpeechSynthesisUtterance(text);
            if (playingList) {
                utterThis.onend = function (event) {
                    playingList[playingListId] = false
                }
            }
            utterThis.onerror = function (event) {
                console.error('SpeechSynthesisUtterance.onerror'+String(event));
            }
            utterThis.voice = this.voice
            utterThis.rate = 0.5+1*0.01*this.slidesSettings.value.voiceSpeed
            utterThis.pitch = 2*0.01*this.slidesSettings.value.voicePitch
            console.log(utterThis.pitch)
            window.speechSynthesis.speak(utterThis);
        },
        cancel() {
            window.speechSynthesis.cancel()
        },
        setMuted(muted) {
            this.muted = muted
        },
    }
}
// from https://stackoverflow.com/questions/49506716/speechsynthesis-getvoices-returns-empty-array-on-windows

function getVoices() {
    let synth = window.speechSynthesis
    return new Promise(
        function (resolve, reject) {
            let id;
            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 20);
        }
    )
}

function selectVoice(voices, voiceName) {
    for (let v of voices) {
        if (v.name == voiceName) {
            return v
        }
    }
    return null
}
import {getGoodVoice} from "./voiceStyleHelper"
function selectVoiceByLang(voices, voiceLang){
    return getGoodVoice(voices, voiceLang)
}
</script>