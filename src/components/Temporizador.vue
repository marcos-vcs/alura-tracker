<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometroComponent :tempoEmSegundos="tempoEmSegundos" />
        <BotaoComponent :icone="'fas fa-play'" :desabilitar="cronometroRodando" :rotulo="'play'" @clickBotao="iniciar" />
        <BotaoComponent :icone="'fas fa-stop'" :desabilitar="!cronometroRodando" :rotulo="'stop'" @clickBotao="finalizar" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CronometroComponent from './Cronometro.vue';
import BotaoComponent from './Botao.vue';

export default defineComponent({
    name: 'TemporizadorComponent',
    emits: ['aoTemporizadorFinalizado'],
    components: {
        CronometroComponent,
        BotaoComponent,
    },
    data() {
        return {
            tempoEmSegundos: 0,
            referenciaCronometro: 0,
            cronometroRodando: false,
        }
    },
    methods: {
        iniciar() {
            this.cronometroRodando = true;
            this.referenciaCronometro = setInterval(() => {
                this.tempoEmSegundos++;
            }, 1000)
        },
        finalizar() {
            this.cronometroRodando = false;
            clearInterval(this.referenciaCronometro);
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        }
    }

})
</script>

<style scoped></style>