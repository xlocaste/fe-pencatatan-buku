'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Kategori {
    id: number;
    nama: string;
    deskripsi: string;
}

const Kategori = () => {

    const [kategoris, setKategoris] = useState<Kategori[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/kategori')
            .then(response => setKategoris(response.data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const deleteKategori = (id: number) => {
        axios.delete(`http://localhost:8000/api/kategori/${id}`)
            .then(() => setKategoris(kategoris.filter(produk => produk.id !== id)))
            .catch(error => console.error('Error deleting produk:', error));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Kategori Buku</h1>
                    <div className="mb-6">
                        <Link href="/kategori/create">
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Tambah Kategori Buku</button>
                        </Link>
                    </div>
                    <ul>
                        {kategoris.map(Kategori => (
                            <li key={Kategori.id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-medium text-gray-900">Nama Kategori:{Kategori.nama}</h2>
                                    <p className="text-gray-600">Deskripsi: {Kategori.deskripsi}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link href={`/kategori/${Kategori.id}/edit`}>
                                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Edit</button>
                                    </Link>
                                    <button
                                        onClick={() => deleteKategori(Kategori.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Kategori;
