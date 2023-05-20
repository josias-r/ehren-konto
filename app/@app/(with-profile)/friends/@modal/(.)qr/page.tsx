import Qr from "../../qr/Qr";

function QrPage() {
  // @ts-expect-error server component
  return <Qr />;
}

export default QrPage;
