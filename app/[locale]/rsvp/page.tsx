import { redirect } from "next/navigation";
import { RSVP_FORM_URL } from "@/lib/external-links";

export default async function RsvpPage() {
  // Keep legacy /rsvp routes working by forwarding to the external form.
  redirect(RSVP_FORM_URL);
}
