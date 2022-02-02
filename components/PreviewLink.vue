<template>
    <span @mouseenter="loadTip()" @click="loadTip()">
        <HoverTip ref="hoverTip">
            <a ref="content" @mouseup="goToHash(target)" style="cursor:pointer">
                <slot></slot>
            </a>
            <template v-slot:tip>
                <div ref="tooltip" class="preview-box"></div>
            </template>
        </HoverTip>
    </span>
</template>

<script>
export default {
    data() {
        return {
            needLoad: true,
            hasContent: false,
        };
    },
    props: {
        target: {
            type: Array,
            default: []
        }
    },
    methods: {
        loadTip() {
            if (!this.needLoad) {
                return;
            }
            let hasContent = false;
            let needLoad = false;
            let targetList = this.$refs.tooltip;
            targetList.innerHTML = "";
            for (let id of this.target) {
                let targetNode = document.getElementById(id);
                if (!targetNode) {
                    needLoad = true;
                    continue;
                }
                let cloneNode = targetNode.cloneNode(true)
                cloneNode.setAttribute("id", null)
                targetList.appendChild(cloneNode);
                hasContent = true;
            }
            this.needLoad = needLoad;
            this.hasContent = hasContent;
        },
        goToHash(target) {
            if (this.$refs.hoverTip.showing) {
                let targetNode = document.getElementById(target);
                if (targetNode) {
                    targetNode.scrollIntoView();
                }
            }
        }
    },
};
</script>

<style lang="sass">

.preview-box
    min-width: 300px
    max-width: 100%
    
    
.preview-box
    & > div
        border: 0px
        box-shadow: none
        
</style>