import { redirect } from "next/navigation";

type LocalizedHomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedHome({ params }: LocalizedHomeProps) {
  const { locale } = await params;
  redirect(`/${locale}/our-wedding`);
}
