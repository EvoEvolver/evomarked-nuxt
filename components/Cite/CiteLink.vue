<template>
  [<PreviewLink :target="citingKeyIds">
    <span
      class="cite-link"
      v-for="(item, index) in tagGroups"
      :key="index"
      :href="
        '#cite-def-' +
        citedKeys[Number(Array.isArray(item) ? item[0] : item) - 1]
      "
    >{{ Array.isArray(item) ? item[0] + "-" + item[1] : item }}</span>
  </PreviewLink>
  <HoverTip v-if="missedKeys">
    ?
    <template v-slot:tip>
      Missing key:
      <strong v-for="(item, index) in missedKeys">{{ item + " " }}</strong>
    </template>
  </HoverTip>]
</template>
<script>
export default {
  methods: {},
  inject: ["pageEnv"],
  props: {
    citingKey: {
      default: () => []
    },
    missedKeys: {
      default: null
    }
  },
  data() {
    return {
      citedKeys: this.pageEnv.citedKeys,
      bibKeys: this.pageEnv.bibKeys,
      bibDict: this.pageEnv.bibDict,
    };
  },
  computed: {
    citingKeyIds() {
      let citingKeyIds = [];
      this.citingKey.forEach((key) => {
        citingKeyIds.push("cite-def-" + key);
      });
      return citingKeyIds;
    },
    citingItems() {
      return this.bibDict["li2018echarts"];
    },
    tagGroups() {
      let tagList = [];
      this.citingKey.forEach((key) => {
        tagList.push(this.citedKeys.indexOf(key) + 1);
      });
      tagList.sort((a, b) => a - b);
      let tagGroups = [];
      for (let i = 0; i < tagList.length;) {
        let groupLen = 1;
        for (let j = i + 1; j < tagList.length; j++) {
          if (tagList[j] != tagList[j - 1] + 1)
            break;
          else
            groupLen += 1;
        }
        if (groupLen == 1) {
          tagGroups.push(tagList[i]);
          i += 1;
          continue;
        }
        if (groupLen == 2) {
          tagGroups.push(tagList[i]);
          tagGroups.push(tagList[i + 1]);
          i += 2;
          continue;
        }
        // if groupLen >= 3
        tagGroups.push([tagList[i], tagList[i + groupLen - 1]]);
        i += groupLen;
      }
      return tagGroups;
    },
  }
};
</script>

<style lang="sass">

.cite-link::before
  content: ","

.cite-link:first-child::before
  content: ""

.cite-links
  &::before
    content: "["
  &::after
    content: "]"
</style>