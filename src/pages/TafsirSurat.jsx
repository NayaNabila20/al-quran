import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

const TafsirSurat = () => {
  const { id } = useParams(); // Ambil ID surat dari URL
  const [tafsirData, setTafsirData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi fetch data tafsir
  const getTafsirSurat = (idSurat) => {
    fetch(`https://equran.id/api/v2/tafsir/${idSurat}`)
      .then((res) => res.json())
      .then((data) => {
        setTafsirData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil tafsir:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTafsirSurat(id);
  }, [id]); // Panggil fungsi saat ID berubah

  if (loading) return <p>Memuat tafsir...</p>;
  if (!tafsirData) return <p>Tafsir tidak ditemukan.</p>;

  return (
    <div className="vh-100 overflow-auto p-4">
      <h2>
        Tafsir Surah {tafsirData.namaLatin} ({tafsirData.nama})
      </h2>
      <p>Jumlah Ayat: {tafsirData.jumlahAyat}</p>
      <hr />

      {/* Menampilkan tafsir per ayat */}
      <ul className="list-group">
        {tafsirData.tafsir.map((ayat) => (
          <li key={ayat.ayat} className="list-group-item">
            <h5 className="fw-semibold">
              Ayat {ayat.ayat}
            </h5>
            <p className="mb-1">
              {parse(ayat.teks)} {/* Render HTML dari API */}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TafsirSurat;
