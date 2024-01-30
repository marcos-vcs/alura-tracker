<template>
    <header>
        <h1>
            <img src="../assets/logo.png" :alt="$t('alt_logo')">
        </h1>
        <AlterarIdioma/>
        <ExportarParaCsvComponent
            :desabilitar="!exibirBotaoExportar"
            :json="jsonExportacao"
            :texto-botao="$t('exportar_tarefas')"
            :titulo-csv="nomeArquivoCsv" />
        <BotaoDarkComponent class="btn-dark" @alterar-tema="alterarTema" />

        <nav class="panel mt-6 has-text-left">
            <ul>
                <li>
                    <router-link to="/" class="link">
                        <li class="fas fa-tasks"></li>
                        tarefas
                    </router-link>
                </li>
                <li>
                    <router-link to="/projetos" class="link">
                        <i class="fas fa-project-diagram"></i>
                        projetos
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BotaoDarkComponent from './BotaoDark.vue';
import ExportarParaCsvComponent from './ExportarParaCsv.vue';
import AlterarIdioma from './AlteraIdioma.vue'

export default defineComponent({
    name: 'BarraLateral',
    emits: ['aoTemaAlterado'],
    components: {
        BotaoDarkComponent,
        ExportarParaCsvComponent,
        AlterarIdioma,
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

.panel {
    padding: 5px 10px;
}
.panel li {
    margin: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}
</style>