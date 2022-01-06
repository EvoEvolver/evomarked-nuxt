<template>
    <div :class="showRange?'show-range':'hide-range'" style="position:relative;">
        <span class="credit-start" @mouseenter="()=>{showRange=true}" @mouseleave="()=>{showRange=false}">
            <hover-tip :interactive="true">
                <span :id="'credit-info-' + id">
                    <img class="inline-icon" src="assets/icons/info-svgrepo-com.svg" />
                </span>
                <template v-slot:tip>
                    <CreditTip :info="pageEnv.creditInfo[id]"></CreditTip>
                </template>
            </hover-tip>
        </span>
        <slot></slot>
        <span class="credit-end" :id="'credit-end-' + id" @click="goToHash('credit-info-' + id)">
            <img class="inline-icon" src="assets/icons/arrow-from-bottom-svgrepo-com.svg" />
        </span>
    </div>
</template>

<script setup>
defineProps({
    id: {}
})
import { inject } from "vue"
const pageEnv = inject("pageEnv")

const showRange = useState("showRange", ()=>false)

function goToHash(target) {
    let targetNode = document.getElementById(target);
    if (targetNode) {
        targetNode.scrollIntoView();
    }
}
</script>

<style>
.credit-start {
    position: absolute;
    left: -2rem;
    border-radius: 0.3rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
}
.credit-end {
    position: absolute;
    right: -2rem;
    bottom: 0rem;
    border-radius: 0.3rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
}
.show-range {
    background-color:rgb(241, 241, 241);
}
.hide-range {
}
</style>