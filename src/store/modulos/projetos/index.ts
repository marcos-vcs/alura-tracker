import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS, OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/tipo-acoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUI_PROJETO } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
    mutations: {
        [ADICIONA_PROJETO](state, nomeProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeProjeto
            } as IProjeto
            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto: IProjeto){
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUI_PROJETO](state, id){
            state.projetos = state.projetos.filter(proj => proj.id != id);
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]){
            state.projetos = projetos;
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }){
            http.get('projetos')
            .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETOS](contexto, nomeDoProjeto: string){
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETOS](contexto, projeto: IProjeto){
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO]({ commit }, id: string){
            return http.delete(`/projetos/${id}`)
                .then( () => commit(EXCLUI_PROJETO, id))
        }
    }
}