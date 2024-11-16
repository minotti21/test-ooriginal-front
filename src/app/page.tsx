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
      <section className="py-[8%] flex mb-[10%]">
        <div className="py-12 space-y-6">
          <div className="space-y-2">
            <h1 className="font-black leading-[72px] text-primary text-5xl">
              SÓ PRA QUEM É ORIGINAL
            </h1>

            <p className="font-medium text-lg text-primary w-4/6">
              Esse site foi feito com o intuito de exibir os QR Codes
              cadastrados no aplicativo teste para a empresa OOriginal.
            </p>
          </div>

          <button className="bg-gradient-to-r from-secondary to-primary rounded-xl font-semibold text-white py-3 px-8">
            <Link href="#banner">Saiba mais</Link>
          </button>
        </div>

        <Image
          src="/hero-img.png"
          width={529}
          height={424}
          alt="Logo OOriginal"
        />
      </section>

      <section id="banner" className="mb-[10%]">
        <div className="bg-gradient-to-r from-secondary to-primary rounded-3xl p-12 flex">
          <div className="space-y-8 text-white">
            <h2 className="text-4xl font-semibold">Como utilizar?</h2>

            <div className="space-y-4 w-3/4">
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

          <div className="relative w-[400px] h-auto">
            <Image
              src="/white-logo.png"
              fill
              alt="Logo OOriginal"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </section>

      <section className="mb-[10%]">
        <h1 className="font-black text-primary text-4xl text-center">
          QR CODES
        </h1>

        <div className="mt-[2%]">
          {isFetching && (
            <p className="font-semibold text-center text-xl">Carregando...</p>
          )}

          {data.length == 0 && !isFetching && (
            <p className="font-semibold text-center text-xl">
              Não foi encontrado nenhum QR Code.
            </p>
          )}

          {data.map(({ id, name, qr_code_base64 }) => {
            const imageUrl = `data:image/png;base64,${qr_code_base64}`;

            return (
              <div className="flex justify-center gap-8" key={id}>
                <div className="space-y-4 mt-8 w-1/5">
                  <div>
                    <h3 className="font-semibold text-xl">Nome</h3>
                    <p className="text-xl">{name}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-xl">Código</h3>
                    <p className="text-xl">{id}</p>
                  </div>
                </div>

                <Image
                  src={imageUrl}
                  width={280}
                  height={280}
                  alt={`qrcode ${id}`}
                />
              </div>
            );
          })}

          <div className="flex justify-center mt-[2%]">
            <button
              onClick={fetchData}
              className="bg-gradient-to-r from-secondary to-primary rounded-xl w-60 font-semibold text-white py-3 px-8"
            >
              Recarregar
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
