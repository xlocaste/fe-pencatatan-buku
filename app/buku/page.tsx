'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface BukuItem {
    id: number;
    nama: string;
    kategori_id: string;
    author: string;
    tanggal_rilis: string;
    publisher: string;
    kategori: {
        id:number
        nama:string
        deskripsi:string
        created_at:string
        updated_at:string
    };
}

const Buku = () => {

    const [buku, setBuku] = useState<BukuItem[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/buku`)
            .then(response => {
                setBuku(response.data.data);
            })
            .catch(error => console.error('Error fetching buku items:', error));
    }, []);

    const deleteBuku = (id: number) => {
        axios.delete(`http://localhost:8000/api/kategori/${id}`)
            .then(() => setBuku(buku.filter(produk => produk.id !== id)))
            .catch(error => console.error('Error deleting produk:', error));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Pencatatan Buku</h1>
                    <div className="mb-6">
                        <Link href="/buku/create">
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Tambah Buku</button>
                        </Link>
                    </div>
                    {buku.length > 0 ? (
                        <ul>
                            {buku.map(item => (
                                <li key={item.id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-medium text-gray-900">{item.nama}</h2>
                                        <p className="text-gray-600">Kategori: {item.kategori.nama}</p>
                                        <p className="text-gray-600">Author: {item.author}</p>
                                        <p className="text-gray-600">Tanggal Rilis: {item.tanggal_rilis}</p>
                                        <p className="text-gray-600">Publisher: {item.publisher}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                    <Link href={`/buku/${item.id}/edit`}>
                                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Edit</button>
                                    </Link>
                                        <button
                                            onClick={() => deleteBuku(item.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Hapus dari Daftar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Daftar Buku kosong.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Buku;