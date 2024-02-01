import ProjetosView from "@/views/Projetos.vue";
import TarefasView from "@/views/Tarefas.vue";
import FormularioView from "@/views/projetos/Formulario.vue";
import ListaView from "@/views/projetos/Lista.vue";
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const rotas: RouteRecordRaw[] = [
    {path: '/', name: 'Tarefas', component: TarefasView},
    {
        path: '/projetos',
        component: ProjetosView,
        children: [
            {path: '', name: 'Projetos', component: ListaView},
            {path: 'novo', name: 'Novo projeto', component: FormularioView},
            {path: ':id', name: 'Editar projeto', component: FormularioView, props: true},
        ]
    }
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;