import React from 'react';
import ReactPDF, { Document, Page, Text, View, StyleSheet, BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import { Row, Table } from 'react-bootstrap';

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontSize: 12
  },
  company_name: {
    fontSize: 24,
    textAlign: 'center',
  },
  company_details: {
    fontSize: 12,
    textAlign: 'center',
  }
});

// Create Document Component
export function InvoicePdf() {
  return <Document>
    <Page size="A4" style={styles.body}>
        <Text style={styles.company_name}>My Choice</Text>
        <Text style={styles.company_details}>Shop No 4, Block No 1, Kalimati Road, Sakchi</Text>
        <Text style={styles.company_details}>Jamshedpur, Jharkhand, India - 831001</Text>
        <Text style={styles.company_details}>GST No: 20AEYPA0067P1ZB</Text>
        <Text style={styles.company_details}>Email id: mychoice_jamshedpur@rediffmail.com</Text>
        <Text style={styles.company_details}>Phone No: 7979888545, 9334638328</Text>
    </Page>

  </Document>
}