import IProjeto from "./IProjeto";

export default interface ITarefa {
    id: Number;
    duracaoEmSegundos: number;
    descricao: string;
    projeto: IProjeto;
}