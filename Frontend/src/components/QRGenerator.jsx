import QRCode from 'react-qr-code'

const QRGenerator = ({value}) => {
  return (
    <div>
        <QRCode value={value} size={115} />
    </div> 
  )
}

export default QRGenerator