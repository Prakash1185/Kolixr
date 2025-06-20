import Homepage from "@/components/homepage";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <>
      <Homepage />
      <Analytics />
    </>
  );
}
