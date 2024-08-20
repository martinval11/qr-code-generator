import QRCode from 'react-qr-code';
import * as htmlToImage from 'html-to-image';
import { useState, useRef } from 'preact/hooks';
import { Footer } from './components/footer/footer';
import styles from './style.module.css';

export function App() {
  const [url, setUrl] = useState('');
  const [qrIsVisible, setQrIsVisible] = useState(false);

  const handleQrCodeGenerator = (event: any) => {
    event.preventDefault();
    if (!url) {
      return;
    }

    setQrIsVisible(true);
  };

  const qrCodeRef: any = useRef<HTMLDivElement>(null);

  const downloadQRCode = async () => {
    try {
      const dataUrl = await htmlToImage.toPng(qrCodeRef.current);

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr-code.png';
      link.click();
    } catch (error) {
      console.error(`Error generating QR code: ${error}`);
    }
  };

  return (
    <main className={styles.container}>
      <h1>QR Code Generator</h1>
      <div className={styles.containerParent}>
        <form
          className={styles.inputContainer}
          onSubmit={handleQrCodeGenerator}
        >
          <input
            className={styles.input}
            type="url"
            placeholder="Enter a URL"
            value={url}
            onChange={(e: any) => setUrl(e.target.value)}
            required
            autoFocus
          />

          <input
            type="submit"
            value="Generate QR Code"
            className={styles.generateQrCodeButton}
          />
        </form>

        {qrIsVisible && (
          <section className={styles.downloadQrContainer}>
            <div className={styles.qrCodeContainer}>
              <QRCode value={url} size={300} ref={qrCodeRef} />
            </div>
            <button
              className={styles.downloadQrCodeButton}
              onClick={downloadQRCode}
            >
              Download QR Code
            </button>
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
