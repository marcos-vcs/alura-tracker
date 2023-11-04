<template>
    <div class="toggle-switch" @click="toggleTheme">
        <input type="checkbox" class="switch" v-model="isChecked" />
        <label></label>
        <i class="fas" :class="isChecked ? 'fa-sun flip' : 'fa-moon'"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BotaoDarkComponent',
    emits: ['alterarTema'],
    data() {
        return {
            isChecked: false,
        };
    },
    watch: {
        isChecked() {
            this.alterarTema();
        }

    },
    methods: {
        alterarTema() {
            this.$emit('alterarTema');
        },
        toggleTheme() {
            this.isChecked = !this.isChecked;
        },
    },
})
</script>

<style scoped>
.toggle-switch {
    position: relative;
    cursor: pointer;
}

.switch {
    display: none;
}

label {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 30px;
    background-color: #ccc;
    border-radius: 15px;
}

label::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 50%;
    left: 0;
    transition: transform 0.4s;
}

input:checked+label::before {
    transform: translateX(20px);
}

i {
    position: absolute;
    line-height: 30px;
    left: 5px;
    color: white;
    z-index: 2;
    font-size: 18px;
    transition: transform 0.4s;
}

i.flip {
    transform: translateX(20px);
}

.fa-sun {
    color: yellow;
}

.fa-moon {
    color: gray;
}</style>