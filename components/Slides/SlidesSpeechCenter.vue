<template>
    <div>Text: {{ spokenText }}</div>
</template>
<script>

export default {
    data() {
        return {
            voiceName: "Microsoft Guy Online (Natural) - English (United States)",
            voices: [],
            voice: null,
            spokenText: "",
            muted: false
        }
    },
    mounted() {
        getVoices().then((_voices) => {
            this.voices = _voices
            this.voice = selectVoice(_voices, this.voiceName)
        });
    },
    methods: {
        speak(text, playFinished) {
            this.spokenText = text
            if (this.muted) {
                setTimeout(() => { playFinished.value = true }, text.length*20)
                return
            }
            let utterThis = new SpeechSynthesisUtterance(text);
            if (playFinished) {
                utterThis.onend = function (event) {
                    playFinished.value = true
                }
            }
            utterThis.onerror = function (event) {
                console.error('SpeechSynthesisUtterance.onerror');
            }
            utterThis.voice = this.voice
            utterThis.rate = 1.2
            utterThis.pitch = 1
            window.speechSynthesis.speak(utterThis);
        },
        cancel() {
            window.speechSynthesis.cancel()
        },
        setMuted(muted) {
            this.muted = muted
        }
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
            }, 10);
        }
    )
}

function selectVoice(voices, voiceName) {
    for (let v of voices) {
        if (v.name == voiceName) {
            return v
        }
    }
}
</script>