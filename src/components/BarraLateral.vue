<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <ExportarParaCsvComponent
            :desabilitar="!exibirBotaoExportar"
            :json="jsonExportacao"
            :texto-botao="'Exportar tarefas'"
            :titulo-csv="nomeArquivoCsv" />
        <BotaoDarkComponent class="btn-dark" @alterar-tema="alterarTema" />
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BotaoDarkComponent from './BotaoDark.vue';
import ExportarParaCsvComponent from './ExportarParaCsv.vue';

export default defineComponent({
    name: 'BarraLateral',
    emits: ['aoTemaAlterado'],
    components: {
        BotaoDarkComponent,
        ExportarParaCsvComponent,
    },
    props: {
        jsonExportacao: {
            type: Array,
            default: () => [],
            description: 'Json que será exportado',
        },
    },
    data() {
        return {
            modoEscuroAtivo: false,
        }
    },
    computed: {
        nomeArquivoCsv() {
            const now = new Date();

            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); 
            const year = String(now.getFullYear()).slice(-2);
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');

            return `${day}_${month}_${year}_${hours}_${minutes}`;
        },
        exibirBotaoExportar(){
            return this.jsonExportacao.length > 0;
        },
    },
    methods: {
        alterarTema(modoEscuroAtivo: boolean): void {
            this.modoEscuroAtivo = modoEscuroAtivo;
            this.$emit('aoTemaAlterado', modoEscuroAtivo);
        },
    }
})
</script>

<style scoped>
.btn-dark {
    display: inline-block;
    margin-left: -50px;
}

header {
    text-align: center;
    padding: 1rem;
    background-color: #0d3b66;
    width: 100%;
    height: 100vh;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
</style>