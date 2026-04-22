import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getRsvpFormUrl } from "@/lib/external-links";

export default async function RsvpPage() {
  const locale = await getLocale();
  // Keep legacy /rsvp routes working by forwarding to the external form.
  redirect(getRsvpFormUrl(locale));
}
