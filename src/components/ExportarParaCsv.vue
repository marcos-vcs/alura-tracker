<template>
    <div>
        <button class="button" :disabled="desabilitar" @click="exportToCSV(json)">
            {{ textoBotao }}
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ExportarParaCsvComponent',
    props: {
        json: {
            type: Array,
            required: true,
            description: 'Objeto json que deve ser convertido',
        },
        tituloCsv: {
            type: String,
            default: 'dados',
            description: 'Titulo do arquivo csv',
        },
        textoBotao: {
            type: String,
            required: true,
            description: 'Texto que deve ser mostrado no botão',
        },
        desabilitar: {
            type: Boolean,
            default: false,
            description: 'Desabilitar botão?'
        }
    },
    methods: {
        exportToCSV(jsonData: any) {
            if (jsonData.lenght === 0) {
                return;
            }
            const header = Object.keys(jsonData[0]);

            const csv = [
                header.join(';'),
                ...jsonData.map((obj: { [x: string]: any; }) => header.map(key => obj[key]).join(';'))
            ].join('\n');

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = this.tituloCsv;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        },
    }
})

</script>

<style scoped>
</style>