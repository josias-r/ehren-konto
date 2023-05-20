import { updateInviteLink } from "@/app/@app/(with-profile)/(profile)/actions";
import QrSheet from "./QrSheet";

async function Qr() {
  const linkId = await updateInviteLink();
  return <QrSheet linkId={linkId} />;
}

export default Qr;
