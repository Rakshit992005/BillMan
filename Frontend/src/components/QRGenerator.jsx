import QRCode from 'react-qr-code'

const QRGenerator = ({ value, upiId, payeeName , companyName }) => {
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName || "Biller")}&am=${value?.totalAmount || 0}&cu=INR&tn=Paid to ${companyName}Invoice ${value?.invoiceNumber || ""}`

  // console.log(upiUrl);
  return (
    <div>
        <QRCode value={upiUrl} size={115} />
    </div> 
  )
}

export default QRGenerator
