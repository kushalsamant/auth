import { redirect } from "next/navigation";
import { DEFAULT_RETURN_TO_APP } from "@/lib/constants";

export default function Home() {
  redirect(DEFAULT_RETURN_TO_APP);
}
