<script setup lang="ts">
import Terminal from './components/Terminal.vue';
</script>

<template>
    <Terminal />
</template>

<style scoped lang="scss">
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
    &:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }
    &.vue:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
    }
}
</style>
