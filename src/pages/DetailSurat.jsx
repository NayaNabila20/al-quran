import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import AudioPlayer from "../components/AudioPlayer";

const DetailSurat = () => {
  const { id } = useParams(); // Ambil parameter dari URL
  const [surat, setSurat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);

  const getDetailSurat = (idSurat) => {
    fetch(`https://equran.id/api/v2/surat/${idSurat}`)
      .then((res) => res.json())
      .then((data) => {
        setSurat(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDetailSurat(id);
  }, [id]); // Jalankan useEffect setiap `id` berubah

  if (loading) return <p>Loading...</p>;
  if (!surat) return <p>Surat tidak ditemukan.</p>;

  return (
    <>
      <div className="vh-100 overflow-auto p-4">
        <h2>
          {surat.namaLatin} ({surat.nama})
        </h2>
        <p>Jumlah Ayat: {surat.jumlahAyat}</p>
        <p>Arti: {surat.arti}</p>
        <p>Deskripsi: {parse(surat.deskripsi)}</p>
        <div className="mt-4">
          <ul className="list-group">
            {surat.ayat.map((ayat) => (
              <li key={ayat.nomorAyat} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <div className="arabic-text fs-4 mb-2">{ayat.teksArab}</div>
                    <div className="teks-indonesia fst-italic text-secondary">
                      {ayat.teksIndonesia}
                    </div>
                  </div>
                  <div className="d-flex align-items-center ms-3">
                    <span className="badge text-bg-primary rounded-sm p-2 me-2">
                      {ayat.nomorAyat}
                    </span>
                    <AudioPlayer
                      key={ayat.nomorAyat}
                      url={ayat.audio["05"]}
                      currentAudio={currentAudio}
                      setCurrentAudio={setCurrentAudio}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DetailSurat;
