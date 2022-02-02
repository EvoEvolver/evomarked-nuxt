export function getAuthorList(authorStr) {
    if (!authorStr) return ["Author error!"]
    let strSplit = splitStringByAnd(authorStr);
    strSplit = strSplit.map((s)=>{return transformTeXAccent(s)})
    let authorList = [];
    for (let term of strSplit) {
        let last, first;
        let nameTuple = term.split(",");
        last = nameTuple[0]?.trim();
        first = nameTuple[1]?.trim();
        let abbrFirst = [];
        if (first) {
            for (let p of first.split("-")) {
                abbrFirst.push(p[0] + ".");
            }
        }else{
            first = ""
        }
        authorList.push([first, last, abbrFirst.join("-") + " " + last]);
    }
    return authorList
}
import tex2utf8 from "./tex2utf8"

function transformTeXAccent(src){
    let pos = 0
    let res = []
    let lastIndex = 0
    for (; pos < src.length; pos++) {
        if (src[pos] == "\\") {
            let tex
            if(src[pos+2] != "{"){
                tex = src.slice(pos,pos+3)
                pos+=2
            }else{
                tex = src.slice(pos,pos+5)
                pos+=4
            }
            let utf8 = tex2utf8[tex]
            if(!utf8){
                if(tex.length == "5"){
                    utf8 = tex2utf8[tex[0]+tex[1]+tex[3]]
                }
            }
            res.push(utf8 || tex)
            lastIndex = pos + 1
            continue
        }
        if (src[pos] == "{") {
            res.push(src.slice(lastIndex,pos))
            lastIndex = pos + 1
            continue
        }
        if (src[pos] == "}") {
            res.push(src.slice(lastIndex,pos))
            lastIndex = pos + 1
            continue
        }
    }
    res.push(src.slice(lastIndex,pos))
    return res.join("")
}

function splitStringByAnd(src) {
    let pos = 0
    let braceLevel = 0
    let res = []
    let lastIndex = 0
    for (; pos < src.length; pos++) {
        if (src[pos] == "{") {
            braceLevel++
            continue
        }
        if (src[pos] == "}") {
            braceLevel--
            continue
        }
        if (src[pos] == " " && braceLevel == 0 && src[pos+1]=="a") {
            if (src[pos + 2] == "n" && src[pos + 3] == "d" && src[pos + 4] == " ") {
                res.push(src.slice(lastIndex, pos))
                lastIndex = pos + 4
                pos += 3
                continue
            }
        }
    }
    res.push(src.slice(lastIndex, pos))
    res = res.map((s) => {return s.trim()}).filter((s) => { return s !== "" })
    return res
}