import ProjetosView from "@/views/Projetos.vue";
import TarefasView from "@/views/Tarefas.vue";
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const rotas: RouteRecordRaw[] = [
    {path: '/', name: 'Tarefas', component: TarefasView},
    {path: '/projetos', name: 'Projetos', component: ProjetosView},
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;