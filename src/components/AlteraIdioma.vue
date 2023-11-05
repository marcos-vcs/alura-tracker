<template>
<div class="select mb-3 mt-2">
  <select @change="alterarIdioma($event)">
    <option v-for="(idioma, index) in idiomas" 
            :key="index"
            :value="idioma.idioma">
        {{ idioma.titulo }}
    </option>
  </select>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { alterarIdioma } from '@/services/idiomaService';

export default defineComponent({
    name: 'AlterarIdioma',
    computed: {
        idiomas(){
            return [
                {'titulo':  this.$t('pt'), 'idioma':'pt'},
                {'titulo':  this.$t('en'), 'idioma':'en'},
                {'titulo':  this.$t('es'), 'idioma':'es'}
            ]
        }
    },
    methods: {
        alterarIdioma(novoIdioma: any){
            alterarIdioma(novoIdioma.target.value);
        }
    }
})
</script>

<style scoped>

</style>