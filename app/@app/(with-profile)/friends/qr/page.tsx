import Qr from "./Qr";

export const metadata = {
  title: "Friend QR Code",
  description: "Share your friend QR code with others",
};

function QrPage() {
  // @ts-expect-error server component
  return <Qr />;
}

export default QrPage;
