export function blockedBookingMessage(error) {
  if (error === 'Cannot list hotels! Ticket not paid') {
    return `Você precisa ter confirmado pagamento antes
        de fazer a escolha de hospedagem`;
  }
  if (error === 'Cannot list hotels! Ticket does not includes hotel') {
    return `Sua modalidade de ingresso não inclui hospedagem
        Prossiga para a escolha de atividades`;
  }
  else{
    return 'Ocorreu um erro! Tente novamente.';
  }
}
  
