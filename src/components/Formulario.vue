<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" :aria-label="$t('aria_label_formulario')">
                <input
                    type="text"
                    v-model="descricao"
                    class="input"
                    :placeholder="$t('placeholder_nova_tarefa')">
            </div>
            <div class="column">
                <TemporizadorComponent @ao-temporizador-finalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TemporizadorComponent from './Temporizador.vue';

export default defineComponent({
    name: 'FormularioComponent',
    emits: ['aoSalvarTarefa'],
    components: {
        TemporizadorComponent,
    },
    data() {
        return {
            descricao: '',
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao
            })
            this.descricao = '';
        }
    }
})
</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>
