import i18n from '../../i18n';

export function alterarIdioma(novoIdioma: any) {
  if (i18n.global.availableLocales.includes(novoIdioma)) {
    i18n.global.locale.value = novoIdioma;
  }
}