// Print designs for the café's one QR code (A6 table card, A5 counter / window poster).
// Rendered as pages under /print/* and saved to PDF by `npm run print`.
import { qrSvg } from "../qr";
import { ORDER } from "../menu";

const HEART = "/images/melt/brand/heart-cutout.webp";
const SIGN = "/images/melt/brand/wordmark-sign.webp";
const qr = () => qrSvg(ORDER.menuUrl, { logo: HEART }).svg;
const shortUrl = ORDER.menuUrl.replace(/^https:\/\/(www\.)?/, "");

/** A6 (105 × 148 mm) table card: chocolate, gold double frame, lit heart, big QR on cream. */
export function TableCard() {
  return (
    <div className="pc-card">
      <div className="pc-frame">
        <img src={HEART} alt="" className="pc-heart" />
        <p className="pc-name">Melt House</p>
        <p className="pc-tag">Café · Desserts · Drinks · Treats</p>
        <p className="pc-script">Scan to order</p>
        <div className="pc-qr" dangerouslySetInnerHTML={{ __html: qr() }} />
        <ol className="pc-steps">
          <li>
            <b>1</b> Scan
          </li>
          <li>
            <b>2</b> Pick
          </li>
          <li>
            <b>3</b> Send on WhatsApp
          </li>
        </ol>
        <p className="pc-pay">Pay at the counter</p>
        <p className="pc-url">{shortUrl}</p>
      </div>
    </div>
  );
}

/** A5 (148 × 210 mm) counter / window poster: cream paper, the lit sign, big QR in a chocolate card, three steps, hours band. */
export function Poster() {
  return (
    <div className="pp-sheet">
      <img src={SIGN} alt="Melt House" className="pp-sign" />
      <h1 className="pp-title">
        Scan. Pick. <em>Send.</em>
      </h1>
      <p className="pp-sub">Order from your phone, we&rsquo;ll call your name.</p>
      <div className="pp-qrcard">
        <div className="pp-qr" dangerouslySetInnerHTML={{ __html: qr() }} />
        <p className="pp-url">{shortUrl}</p>
      </div>
      <ol className="pp-steps">
        <li>
          <b>01</b>
          <span>
            <strong>Scan the code</strong>
            with your phone camera
          </span>
        </li>
        <li>
          <b>02</b>
          <span>
            <strong>Pick your treats</strong>
            sizes, flavours &amp; extras
          </span>
        </li>
        <li>
          <b>03</b>
          <span>
            <strong>Send on WhatsApp</strong>
            then pay at the counter
          </span>
        </li>
      </ol>
      <div className="pp-band">
        <span>{ORDER.hours}</span>
        <span>{ORDER.address}</span>
      </div>
    </div>
  );
}
