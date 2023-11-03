<template>
    <div class="box has-text-weight-bold" :style="estilo">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BoxComponent',
    data(){
        return {
            estilo: {
                backgroundColor: '#faf0ca',
            }
        }
    },
})
</script>

<style scoped>
</style>