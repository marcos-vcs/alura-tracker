<template>
    <section class="projetos">
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label display">
                    Nome do projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store/index';
import useNotificar from '@/hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'FormularioView',
    props: {
        id: {
            type: String
        }
    },
    setup(props){
        const router = useRouter();
        const { notificar } = useNotificar();
        const store = useStore();
        const nomeDoProjeto = ref('');

        if(props.id){
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
            nomeDoProjeto.value = projeto?.nome || '';
        }

        const sucessoNaRequisicao = () => {
            nomeDoProjeto.value = '';
                    notificar(
                        TipoNotificacao.SUCESSO,
                        'Novo projeto foi salvo',
                        'Seu projeto já está disponível.'
                    );
                    router.push('/projetos');
        }

        const salvar = () => {
            if(props.id){
                store.dispatch(ALTERAR_PROJETOS, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                }).then(() => sucessoNaRequisicao())
            }else{
                store.dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value).then(() => {
                    sucessoNaRequisicao();
                });
            }
        }

        return {
            salvar,
            nomeDoProjeto
        }
    }
})
</script>