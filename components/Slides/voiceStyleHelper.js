
export function defaultVoiceStyle(_lang) {
    let lang = _lang.toLowerCase()
    let browser = getBrowser()
    switch (lang) {
        case "english":
            return "Microsoft Guy Online (Natural) - English (United States)"
            break
    }
}

export function getAVoiceStyle(_lang) {

}

function getBrowser() {
    const { userAgent } = navigator
    if (userAgent.includes('Firefox/')) {
        return "Firefox"
    } else if (userAgent.includes('Edg/')) {
        return "Edge (Chromium)"
    } else if (userAgent.includes('Chrome/')) {
        return "Chrome"
    } else if (userAgent.includes('Safari/')) {
        return "Safari"
    }
}

let langNameDict = {
    "chinese": "zh",
    "english": "en",
    "spanish": "es",
    "french": "fr",
    "japanese": "ja"
}

export function getStandardLangName(naturalName) {
    return langNameDict[naturalName.toLowerCase()]
}

export function filteredVoices(voices, voiceLang) {
    let filteredVoices = []
    let stdLangName = getStandardLangName(voiceLang)
    for (let voice of voices) {
        if (voice.lang.startsWith(stdLangName)) {
            filteredVoices.push(voice)
        }
    }
    return filteredVoices
}

let goodVoiceDict = {
    "english": ["Microsoft Guy Online (Natural) - English (United States)","Google US English","Microsoft Zira Desktop - English (United States)"]
}

export function getGoodVoice(_voices, voiceLang){
    if(_voices.length == 0)
        return null
    let voices = filteredVoices(_voices, voiceLang)
    if(voices.length == 0)
        return filteredVoices(_voices, "english")[0]
    let goodVoiceNames = goodVoiceDict[voiceLang.toLowerCase()]
    for(let voiceName of goodVoiceNames){
        for(let voice of voices){
            if(voice.name == voiceName){
                return voice
            }
        }
    }
    return voices[0]
}