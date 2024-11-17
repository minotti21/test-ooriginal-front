"use client";

import qrCodeApi from "@/api/qrCodeApi";
import { QrCodeType } from "@/types/QrCode";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<QrCodeType[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    setIsFetching(true);
    setData([]);

    try {
      const { data } = await qrCodeApi.getQrCodes();

      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="mb-[10%] space-y-8 py-[8%] lg:flex">
        <div className="space-y-6 py-12">
          <div className="space-y-2 text-center md:text-start">
            <h1 className="text-5xl font-black leading-[72px] text-primary">
              SÓ PRA QUEM É ORIGINAL
            </h1>

            <p className="text-lg font-medium text-primary md:w-4/6">
              Esse site foi feito com o intuito de exibir os QR Codes
              cadastrados no aplicativo teste para a empresa OOriginal.
            </p>
          </div>

          <button className="w-full rounded-xl bg-gradient-to-r from-secondary to-primary px-8 py-3 font-semibold text-white lg:w-auto">
            <Link href="#banner">Saiba mais</Link>
          </button>
        </div>

        <div className="relative w-full md:w-1/2">
          <Image
            src="/hero-img.png"
            layout="responsive"
            width={529}
            height={424}
            className="object-contain"
            alt="Logo OOriginal"
          />
        </div>
      </section>

      <section id="banner" className="mb-[10%]">
        <div className="items-center justify-between space-y-12 rounded-3xl bg-gradient-to-r from-secondary to-primary p-12 md:flex">
          <div className="space-y-8 text-center text-white md:text-start">
            <h2 className="text-4xl font-semibold">Como utilizar?</h2>

            <div className="space-y-4 md:w-3/4">
              <p>
                Abra o aplicativo, cadastre um QR Code e então atualize a
                listagem aqui no site.
              </p>

              <p>
                Após seu QR Code ser exibido, você pode ir até a tela “Ler QR
                Code” e então apontar a câmera do seu celular.
              </p>

              <p>
                Voilà! As informações serão exibidas na tela do seu aplicativo.
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-[320px]">
            <Image
              src="/white-logo.png"
              layout="responsive"
              width={529}
              height={424}
              className="object-contain"
              alt="Logo OOriginal"
            />
          </div>
        </div>
      </section>

      <section className="mb-[10%]">
        <h1 className="text-center text-4xl font-black text-primary">
          QR CODES
        </h1>

        <div className="mt-[2%] space-y-20">
          {isFetching && (
            <p className="text-center text-xl font-semibold">Carregando...</p>
          )}

          {data.length == 0 && !isFetching && (
            <p className="text-center text-xl font-semibold">
              Não foi encontrado nenhum QR Code.
            </p>
          )}

          {data.map(({ id, name, qr_code_base64 }) => {
            const imageUrl = `data:image/png;base64,${qr_code_base64}`;

            return (
              <div className="flex justify-center gap-8" key={id}>
                <div className="mt-8 w-1/5 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Nome</h3>
                    <p className="text-xl">{name}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">Código</h3>
                    <p className="text-xl">{id}</p>
                  </div>
                </div>

                <div className="relative w-full md:w-[280px]">
                  <Image
                    src={imageUrl}
                    layout="responsive"
                    width={280}
                    height={280}
                    className="object-contain"
                    alt="Logo OOriginal"
                  />
                </div>
              </div>
            );
          })}

          <div className="mt-[2%] flex justify-center">
            <button
              onClick={fetchData}
              className="w-full rounded-xl bg-gradient-to-r from-secondary to-primary px-8 py-3 font-semibold text-white lg:w-72"
            >
              Recarregar
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
