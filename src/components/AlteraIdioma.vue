<template>
<div class="select mb-3 mt-2">
  <select @change="alterarIdioma($event)">
    <option v-for="(idioma, index) in idiomas"
            :key="index"
            :value="idioma.idioma"
            :selected="idioma.idioma === idiomaVigente">
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
    data(){
        return {
            idiomaVigente: 'pt',
        }
    },
    computed: {
        idiomas(){
            return [
                {'titulo':  this.$t('pt'), 'idioma':'pt'},
                {'titulo':  this.$t('en'), 'idioma':'en'},
                {'titulo':  this.$t('es'), 'idioma':'es'}
            ]
        }
    },
    created(){
        this.carregaIdioma();
    },
    methods: {
        carregaIdioma(){
            this.idiomaVigente = localStorage.getItem('idioma') || 'pt';
        },
        alterarIdioma(novoIdioma: any){
            const idioma = novoIdioma.target.value || 'pt';
            alterarIdioma(idioma);
            this.idiomaVigente = idioma;
            localStorage.setItem('idioma', idioma);
        }
    }
})
</script>

<style scoped>

</style>