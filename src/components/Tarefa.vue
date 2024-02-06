<template>
    <BoxComponent>
        <div class="columns">
            <div class="column is-4">
                {{ dados?.descricao || $t('tarefa_sem_descricao') }}
            </div>
            <div class="column is-3">
                {{ dados?.projeto?.nome || 'N/D' }}
            </div>
            <div class="column">
                <CronometroComponent
                    :habilitarModoEscuro="false"
                    :tempo-em-segundos="dados?.duracaoEmSegundos" />
            </div>
            <div class="column">
                <button class="button" @click="abrirModalEditarTarefa()">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="button ml-2 is-danger" @click="removerTarefa">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    </BoxComponent>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import CronometroComponent from './Cronometro.vue';
import ITarefa from '@/interfaces/ITarefa';
import BoxComponent from './Box.vue';

export default defineComponent({
    name: 'TarefaComponent',
    emits: ['aoTarefaClicada','removerTarefa'],
    props: {
        dados: {
            type: Object as PropType<ITarefa>,
            require: true
        }
    },
    components: {
        CronometroComponent,
        BoxComponent,
    },
    setup(props, {emit}){

        const removerTarefa = () => {
            emit('removerTarefa');
        },
        abrirModalEditarTarefa = () => {
            emit('aoTarefaClicada', props.dados)
        }

        return {
            removerTarefa,
            abrirModalEditarTarefa
        }
    }
})
</script>