<template>
    <section>
        <strong :class="classeModoEscuro">{{ tempoDecorrido }}</strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CronometroComponent',
    props: {
        habilitarModoEscuro: {
            type: Boolean,
            default: true
        },
        tempoEmSegundos: {
            type: Number,
            default: 0
        }
    },
    computed: {
        tempoDecorrido() {
            return new Date(this.tempoEmSegundos * 1000).toISOString().substring(11, 19);
        },
        classeModoEscuro(){
            return this.habilitarModoEscuro ? 'display' : '';
        }
    },
})
</script>

<style>
.display {
    color: var(--texto-primario);
}
</style>