export function blockedListActivityMessage(error) {
  if (error === 'Cannot list activities! Ticket not paid') {
    return `Você precisa ter confirmado pagamento antes
    de fazer a escolha de atividades.`;
  }
  if (error === 'Cannot list activities! Ticket does not includes hotel') {
    return `Sua modalidade de ingresso não necessita escolher
    atividade. Você terá acesso a todas as atividades.`;
  } else {
    return 'Ocorreu um erro! Tente novamente.';
  }
}
