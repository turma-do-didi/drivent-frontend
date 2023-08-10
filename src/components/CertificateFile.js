import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  document: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '98%',
    width: '99%',
  },
  lateralSection: {
    backgroundColor: '#FA4098',
    width: '120px',
    height: '100%',
    marginRight: '70px',
  },
  contentSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
  },
  certificateText: {
    color: '#000',
    fontSize: '80px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    marginBottom: '30px',
  },
  subTitle: {
    color: '#000',
    fontSize: '25px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    marginBottom: '30px',
  },
  name: {
    color: '#FA4098',
    fontSize: '65px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    marginBottom: '30px',
  },
  infoText: {
    width: '600px',
    color: '#000',
    fontSize: '25px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    marginBottom: '50px',
  },
  image: {
    width: '80px',
  },
});

export default function CertificateFile({ username, modality, event, cpf }) {
  function formatarCPF(cpf) {
    const numeros = cpf.replace(/\D/g, '');

    const cpfFormatado = `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9, 11)}`;

    return cpfFormatado;
  }

  function formatarData(dataISO) {
    const data = new Date(dataISO);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.lateralSection}></View>
        <View style={styles.contentSection}>
          <Text style={styles.certificateText}>CERTIFICADO</Text>
          <Text style={styles.subTitle}>Certificamos, para todos os devidos fins, de que a(o):</Text>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.infoText}>
            Com documento {formatarCPF(cpf)} participou do evento {event.event.title}, de forma {modality}, entre os
            dias {formatarData(event.event.startsAt)} e {formatarData(event.event.endsAt)}.
          </Text>
          <Image style={styles.image} src={event.event.logoImageUrl} cache={false} />
        </View>
      </Page>
    </Document>
  );
}
