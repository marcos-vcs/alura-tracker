<template>
  <main class="columns is-gapless is-multiline" :class="tema">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"></BarraLateral>
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioSuperiorComponent @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :dados="tarefa" />
        <BoxComponent v-show="listaEstaVazia">
          Nenhuma atividade executada por enquanto :(
        </BoxComponent> 
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioSuperiorComponent from './components/Formulario.vue';
import TarefaComponent from './components/Tarefa.vue';
import ITarefa from './interfaces/ITarefa';
import BoxComponent from './components/Box.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      tarefas: [] as ITarefa[],
      tema: '',
    }
  },
  computed: {
    listaEstaVazia(): boolean{
      return this.tarefas.length === 0;
    }
  },
  components: {
    BarraLateral,
    FormularioSuperiorComponent,
    TarefaComponent,
    BoxComponent,
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.unshift(tarefa);
    },
    trocarTema(modoEscuroAtivo: boolean){
      this.tema = modoEscuroAtivo ? 'modo-escuro' : '';
    },
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
main {
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}
.conteudo{
  background-color: var(--bg-primario);
}
</style>
