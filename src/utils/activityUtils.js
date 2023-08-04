export function blockedListActivityMessage(error) {
  if (error === 'Cannot list activities! Ticket not paid') {
    return (
      <h1>
        Você precisa ter confirmado pagamento antes <br />
        de fazer a escolha de atividades.
      </h1>
    );
  }
  if (error === 'Cannot list activities! Ticket does not includes hotel') {
    return (
      <h1>
        Sua modalidade de ingresso não necessita escolher <br />
        atividade. Você terá acesso a todas as atividades.
      </h1>
    );
  } else {
    return <h1>Ocorreu um erro! Tente novamente.</h1>;
  }
}
