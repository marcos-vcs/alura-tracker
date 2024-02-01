<template>
  <main class="columns is-gapless is-multiline" :class="tema">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <NotificacoesGerais></NotificacoesGerais>
      <RouterView></RouterView>
    </div>
  </main>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import NotificacoesGerais from './components/Notificacoes.vue';
import { alterarIdioma } from '@/services/idiomaService';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    NotificacoesGerais,
  },
  data() {
    return {
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
    this.recuperarIdiomaVigente();
  },
  methods: {
    recuperarIdiomaVigente(){
      const idioma = localStorage.getItem('idioma') || 'pt';
      alterarIdioma(idioma);
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
