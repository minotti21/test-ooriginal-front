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
        <header className="container left-0 right-0 mx-auto flex h-32 items-center px-8">
          <Image src="/logo.svg" width={200} height={56} alt="Logo OOriginal" />
        </header>

        <main className="container mx-auto px-8">{children}</main>

        <p className="mb-4 text-center font-medium">
          Desenvolvido por{" "}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/viniciusminotti/"
            className="cursor-pointer text-primary"
          >
            Vinicius Minotti
          </a>
        </p>
      </body>
    </html>
  );
}
