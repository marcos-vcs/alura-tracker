<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para a criação de uma nova tarefa">
                <input type="text" v-model="descricao" class="input" placeholder="Qual tarefa você deseja iniciar?">
            </div>
            <div class="column">
                <TemporizadorComponent @ao-temporizador-finalizado="finalizarTarefa"></TemporizadorComponent>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TemporizadorComponent from './Temporizador.vue';

export default defineComponent({
    name: 'FormularioComponent',
    components: {
        TemporizadorComponent,
    },
    data(){
        return {
            descricao: '',
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void{  
            this.descricao = '';
        }
    }
})
</script>

<style scoped></style>
