<template>
  <main class="columns is-gapless is-multiline" :class="tema">
    <div class="column is-one-quarter">
      <BarraLateral :jsonExportacao="tarefas" @aoTemaAlterado="trocarTema"></BarraLateral>
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioSuperiorComponent @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <TarefaComponent
          v-for="(tarefa, index) in tarefas"
          :key="index"
          :dados="tarefa"
          @removerTarefa="removerTarefa(index)" />
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
  components: {
    BarraLateral,
    FormularioSuperiorComponent,
    TarefaComponent,
    BoxComponent,
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
      tema: '',
      exibirModal: false,
    }
  },
  created() {
    const modoAtual = localStorage.getItem('modo-escuro');
    if (modoAtual === '' || modoAtual === undefined || modoAtual === null) {
      localStorage.setItem('modo-escuro', 'false');
      this.trocarTema(false);
    } else {
      this.trocarTema(modoAtual === 'true');
    }
    this.recuperarListaTarefas();
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    }
  },
  methods: {
    recuperarListaTarefas() {
      const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
      this.tarefas = tarefas;
    },
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.unshift(tarefa);
      localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    },
    removerTarefa(index: number) {
      if(index > -1){
        this.tarefas.splice(index, 1);
        localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
      }
    },
    trocarTema(modoEscuroAtivo: boolean) {
      this.tema = modoEscuroAtivo ? 'modo-escuro' : '';
      localStorage.setItem('modo-escuro', modoEscuroAtivo.toString());
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

.conteudo {
  background-color: var(--bg-primario);
}</style>
