<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" :aria-label="$t('aria_label_formulario')">
                <input type="text" v-model="descricao" class="input" :placeholder="$t('placeholder_nova_tarefa')">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <TemporizadorComponent @ao-temporizador-finalizado="finalizarTarefa($event)" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TemporizadorComponent from './Temporizador.vue';
import { useStore } from 'vuex';
import { key } from '../store/index'
import { computed } from 'vue';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { notificacaoMixin } from '@/mixins/notificar';

export default defineComponent({
    name: 'FormularioTarefa',
    mixins: [
        notificacaoMixin
    ],
    emits: ['aoSalvarTarefa'],
    components: {
        TemporizadorComponent,
    },
    setup() {
        const store = useStore(key)
        return {
            store,
            projetos: computed(
                () => store.state.projeto.projetos
            )
        }
    },
    data() {
        return {
            idProjeto: '',
            descricao: '',
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            const projeto = this.projetos.find(proj => proj.id == this.idProjeto);

            if (!projeto) {
                this.notificar(
                    TipoNotificacao.FALHA,
                    'Erro ao salvar tarefa',
                    'A tarefa deve estar vinculada a um projeto.'
                );
                return;
            }

            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
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
