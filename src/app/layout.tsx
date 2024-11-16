import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "OOriginal",
  description: "Front-end do teste da empresa OOriginal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased ${poppins.className}`}>
        <header className="h-32 left-0 px-8 right-0 container mx-auto items-center flex">
          <Image src="/logo.svg" width={200} height={56} alt="Logo OOriginal" />
        </header>

        <main className="mx-auto container px-8">{children}</main>

        <p className="text-center mb-4 font-medium">
          Desenvolvido por{" "}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/viniciusminotti/"
            className="text-primary cursor-pointer"
          >
            Vinicius Minotti
          </a>
        </p>
      </body>
    </html>
  );
}
