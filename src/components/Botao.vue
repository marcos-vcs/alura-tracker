<template>
    <button @click="clickBotao" class="button" :disabled="desabilitar">
        <span class="icon">
            <i :class="icone"></i>
        </span>
        <span>{{ rotulo }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BotaoComponent',
    emits: ['clickBotao'],
    props: {
        icone: {
            type: String,
            default: ''
        },
        desabilitar: {
            type: Boolean,
            default: false
        },
        rotulo: {
            type: String,
            default: ''
        },
    },
    methods: {
        clickBotao(){
            this.$emit('clickBotao');
        }
    }
})
</script>