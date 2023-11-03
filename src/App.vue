<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral></BarraLateral>
    </div>
    <div class="column is-three-quarter">
      <FormularioSuperiorComponent></FormularioSuperiorComponent>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioSuperiorComponent from './components/Formulario.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    FormularioSuperiorComponent,
  }
});
</script>

<style>
</style>
