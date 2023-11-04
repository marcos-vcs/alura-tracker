<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <BotaoDarkComponent class="btn-dark" @alterar-tema="alterarTema" />
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BotaoDarkComponent from './BotaoDark.vue';

export default defineComponent({
    name: 'BarraLateral',
    components: {
        BotaoDarkComponent,
    },
    emits: ['aoTemaAlterado'],
    data() {
        return {
            modoEscuroAtivo: false,
        }
    },
    methods: {
        alterarTema(modoEscuroAtivo: boolean): void {
            this.modoEscuroAtivo = modoEscuroAtivo;
            this.$emit('aoTemaAlterado', modoEscuroAtivo);
        }
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