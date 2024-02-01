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
import { defineComponent } from 'vue';
import { useStore } from '@/store/index';
import useNotificar from '@/hooks/notificador'
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
    name: 'FormularioView',
    props: {
        id: {
            type: String
        }
    },
    mounted(){
        if(this.id){
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || '';
        }
    },
    setup(){
        const { notificar } = useNotificar()
        const store = useStore();
        return {
            notificar,
            store
        }
    },
    data() {
        return {
            nomeDoProjeto: '',
        }
    },
    methods: {
        salvar(){
            if(this.id){
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
                this.$router.push('/projetos');
            }else{
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
                this.nomeDoProjeto = '';
                this.notificar(
                    TipoNotificacao.SUCESSO,
                    'Novo projeto foi salvo',
                    'Seu projeto já está disponível.'
                );
                this.$router.push('/projetos');
            }
        }
    }
})
</script>