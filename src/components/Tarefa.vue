<template>
    <BoxComponent>
        <div class="columns">
            <div class="column is-7">
                {{ dados?.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column">
                <CronometroComponent :habilitarModoEscuro="false" :tempo-em-segundos="dados?.duracaoEmSegundos" />
            </div>
            <div class="column">
                <button class="button" @click="removerTarefa">
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
    emits: ['removerTarefa'],
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
    methods: {
        removerTarefa() {
            this.$emit('removerTarefa');
        }
    }
})
</script>