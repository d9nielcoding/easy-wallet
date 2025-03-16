import "@/app/globals.css";
import { Middleware } from "@/app/middleware";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Middleware />
      <Header />
      <main className="mt-[59px] w-full max-w-[540px] px-4 pb-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
