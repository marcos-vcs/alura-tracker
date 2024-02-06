<template>
    <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :dados="tarefa"
            @removerTarefa="removerTarefa(index)" @ao-tarefa-clicada="selecionarTarefa(tarefa)" />
        <BoxComponent v-show="listaEstaVazia">
            {{ $t('sem_tarefas') }}
        </BoxComponent>
    </div>
    <div class="modal" :class="{'is-active' : tarefaSelecionada}" v-if="tarefaSelecionada">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Editar tarefa</p>
                <button class="delete" aria-label="close" @click="fecharModalEdicao()"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label for="descricaoTarefa" class="label">
                        Descrição
                    </label>
                    <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoTarefa">
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="alterarTarefa()">Salvar alterações</button>
                <button class="button" @click="fecharModalEdicao()">Cancelar</button>
            </footer>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import FormularioTarefa from '../components/Formulario.vue';
import TarefaComponent from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import BoxComponent from '../components/Box.vue';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { computed } from 'vue';
import { useStore } from '@/store';
import { toHandlers } from 'vue';

export default defineComponent({
    name: 'tarefasView',
    components: {
        FormularioTarefa,
        TarefaComponent,
        BoxComponent,
    },
    data(){
        return {
            tarefaSelecionada: null as ITarefa | null,
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);
        return {
            store,
            tarefas: computed(
                () => store.state.tarefa.tarefas
            )
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            if(this.tarefas && this.tarefas.length){
                return this.tarefas.length === 0;
            }else{
                return true;
            }
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        removerTarefa(index: number) {
            if (index > -1) {
                this.tarefas.splice(index, 1);
                localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
            }
        },
        selecionarTarefa(tarefa: ITarefa){
            this.tarefaSelecionada = tarefa;
        },
        fecharModalEdicao(){
            this.tarefaSelecionada = null;
        },
        alterarTarefa(){
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
            .then(() => this.fecharModalEdicao());
        }
    }
});
</script>