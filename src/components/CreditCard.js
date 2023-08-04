import React, { useState } from 'react';
import { useRef } from 'react';
import Cards from 'react-credit-cards-2';

import 'react-credit-cards-2/dist/es/styles-compiled.css';
import styled from 'styled-components';
import { toast } from 'react-toastify';

export default function PaymentForm({ reservationTicketId, postPayment }) {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const formRef = useRef(null);

  const handleSubmitClick = (event) => {
    event.preventDefault();

    // form validation
    if (formRef.current.reportValidity()) {
      handleSubmit(event);
    }
  };

  async function handleSubmit(event) {
    let issuer;
    if (state.number.charAt(0) === '4') {
      issuer = 'Visa';
    } else if (state.number.charAt(0) === '5') {
      issuer = 'MasterCard';
    } else {
      issuer = 'unknown';
    }

    const data = {
      ticketId: reservationTicketId,
      cardData: {
        issuer: issuer,
        number: state.number,
        name: state.name,
        expirationDate: state.expiry,
        cvv: state.cvc,
      },
    };

    console.log(state.expiry);

    try {
      await postPayment(data);
    } catch (err) {
      console.log('Error submitting reservation: ', err);
      toast('Não foi possível efetuar o pagamento!');
    }
  }

  function clearNumber(value = '') {
    return value.replace(/[^\d]/g, '');
  }

  function formatCreditCardNumber(value) {
    if (!value) {
      return value;
    }
    const clearValue = clearNumber(value);

    const formattedValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(
      8,
      12
    )} ${clearValue.slice(12, 19)}`;

    return formattedValue;
  }

  function formatExpirationDate(value) {
    const clearValue = clearNumber(value);

    if (clearValue?.length >= 3) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }

    return clearValue;
  }

  function formatCVC(value) {
    const clearValue = clearNumber(value);

    return clearValue.slice(0, 3);
  }

  const handleInputChange = (evt) => {
    let { name, value } = evt.target;

    if (name === 'number') {
      value = formatCreditCardNumber(value);
    } else if (name === 'expiry') {
      value = formatExpirationDate(value);
    } else if (name === 'cvc') {
      value = formatCVC(value);
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <>
      <CreditCardContainer>
        <PaymentFormContainer>
          <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={state.focus} />
          <Form ref={formRef}>
            <input
              type="tel"
              name="number"
              placeholder="Número do Cartão"
              value={state.number}
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />

            <input
              type="text"
              name="name"
              placeholder="Nome do Cartão"
              value={state.name}
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />

            <div>
              <input
                className="expiry"
                type="text"
                name="expiry"
                placeholder="MM/YY Data de Vencimento"
                value={state.expiry}
                pattern="\d\d/\d\d"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <input
                className="cvc"
                type="tel"
                name="cvc"
                placeholder="CVC"
                value={state.cvc}
                pattern="\d{3,4}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
          </Form>
        </PaymentFormContainer>
      </CreditCardContainer>
      <SubmitButton type="button" onClick={handleSubmitClick}>
        FINALIZAR PAGAMENTO
      </SubmitButton>
    </>
  );
}

const PaymentFormContainer = styled.div`
  display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  height: 100%;
  justify-content: space-between;
  > input {
    width: 400px;
    border-radius: 5px;
    border: 1px solid #8e8e8e;
    height: 45px;
    padding-left: 5px;

    &::placeholder {
      padding-left: 5px;
    }
  }

  > div {
    display: flex;
    justify-content: space-between;

    > input {
      border-radius: 5px;
      border: none;
      height: 45px;
      border: 1px solid #8e8e8e;
      padding-left: 5px;

      &::placeholder {
        padding-left: 5px;
      }
    }

    .expiry {
      width: 60%;
    }

    .cvc {
      width: 30%;
    }
  }
`;

const SubmitButton = styled.button`
  width: 220px;
  height: 37px;
  background-color: #dddddd;
  border-radius: 4px;
  border: none;
  margin-top: 40px;
  font-size: 14px;
  font-weight: 500;

  :hover {
    cursor: pointer;
  }
`;

const CreditCardContainer = styled.div`
  display: flex;
  margin-top: 17px;
`;

// {
//     "id": 9,
//     "ticketId": 56,
//     "value": 2500,
//     "cardIssuer": "mastercard",
//     "cardLastDigits": "6465",
//     "createdAt": "2023-08-03T19:41:44.451Z",
//     "updatedAt": "2023-08-03T19:41:44.452Z"
//   }
