export function blockedBookingMessage(error) {
  if (error === 'Cannot list hotels! Ticket not paid') {
    return `Você precisa ter confirmado pagamento antes
          de fazer a escolha de hospedagem`;
  }
}
  
