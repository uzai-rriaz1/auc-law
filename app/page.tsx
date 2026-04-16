import Image from "next/image";
import Dashboard from "./dashboard/dashboard/page";
import Button from "./components/ui/buttons/Addoffice";
import Signin from "./auth/signin/page";
import HomePage from "./components/layout/Home";

import { Satellite } from "lucide-react";
export default function Home() {
  return (
    <div className="">
      <main>
        <HomePage />
      </main>
    </div>
  );
}
