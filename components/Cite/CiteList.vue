<template>
  <div class="reference-list" v-if="referenceInfo.length != 0">
    <h1>Reference</h1>
    <div
      v-for="(refInfo, index) of referenceInfo"
      :key="index"
      :id="'cite-def-' + refInfo.key"
      class="cite-def"
    >
      <span>{{ refInfo.index }}. </span>
      <HoverTip v-for="(authorName, index) of refInfo.author" interactive="true">
        {{ authorName[2] + ",&nbsp;" }}
        <template v-slot:tip>
          {{ authorName[0] + " " + authorName[1] }}
          <a
            :href="'https://scholar.google.com/scholar?hl=en&q=' + authorName[0] + ' ' + authorName[1]"
            target="_blank"
          >(Google Ta!)</a>
        </template>
      </HoverTip>
      {{ refInfo.title + " " + refInfo.publish }}
      <HoverTip v-if="refInfo.url">
        <a :href="refInfo.url" target="_blank">
          <img class="inline-icon" src="./book.svg" />
        </a>
        <template v-slot:tip>Origin Paper</template>
      </HoverTip>
      <HoverTip>
        <a :href="'https://scholar.google.com/scholar?hl=en&q=' + refInfo.title" target="_blank">
          <img class="inline-icon" src="./graduation-cap.svg" />
        </a>
        <template v-slot:tip>Google Scholar</template>
      </HoverTip>
    </div>
  </div>
</template>

<script>
import HoverTip from "../HoverTip.vue"
import { getAuthorList } from "./citeHelper"
export default {
  inject: ["pageEnv"],
  components: {
    HoverTip: HoverTip
  },
  data: function () {
    return {
      citedKeys: this.pageEnv.citedKeys,
      bibDict: this.pageEnv.bibDict,
    };
  },
  methods: {
  },
  computed: {
    referenceInfo: function () {
      let refInfoList = []
      for (let i in this.citedKeys) {
        let entry = this.bibDict[this.citedKeys[i]]?.entryTags;
        if (!entry) continue
        let publisher = ""
        if (entry.journal) {
          publisher += entry.journal
          if (entry.year)
            publisher += " (" + entry.year + ")"
        }
        let refInfo = {
          author: getAuthorList(entry.author),
          title: entry.title,
          publish: publisher,
          url: entry.url,
          key: this.citedKeys[i],
          index: Number(i) + 1
        }
        refInfoList.push(refInfo)
      }
      return refInfoList
    }
  }
};
</script>

<style lang="sass">
@import "../Layout/vars"

.cite-def
  margin-top: 0.2rem
</style>