<template>
    <div>
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        {{ title }}
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: String,
});
</script>

<script lang="ts">

export default {
    name:"Loading",
}

</script>

<style scoped>

</style>
