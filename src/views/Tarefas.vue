<template>
    <FormularioSuperiorComponent @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :dados="tarefa"
            @removerTarefa="removerTarefa(index)" />
        <BoxComponent v-show="listaEstaVazia">
            {{ $t('sem_tarefas') }}
        </BoxComponent>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import FormularioSuperiorComponent from '../components/Formulario.vue';
import TarefaComponent from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import BoxComponent from '../components/Box.vue';

export default defineComponent({
    name: 'tarefasView',
    components: {
        FormularioSuperiorComponent,
        TarefaComponent,
        BoxComponent,
    },
    data() {
        return {
            tarefas: [] as ITarefa[],
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0;
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.tarefas.unshift(tarefa);
            localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
        },
        removerTarefa(index: number) {
            if (index > -1) {
                this.tarefas.splice(index, 1);
                localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
            }
        },
    }
});
</script>
  