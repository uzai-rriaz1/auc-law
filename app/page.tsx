import Image from "next/image";
import Dashboard from "./dashboard/page";
import Button from "./components/ui/button/Button";

export default function Home() {
  return (
    <div className="">
      <main>
        <Dashboard />
      </main>
    </div>
  );
}
