'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {
    const [nama, setNama] = useState('');
    const [kategori_id, setKategoriId] = useState('');
    const [author, setAuthor] = useState('');
    const [tanggal_rilis, setTanggalRilis] = useState('');
    const [publisher, setPublisher] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/buku', { nama, kategori_id, author, tanggal_rilis, publisher});
            router.push('/buku');
        } catch (error) {
            console.error('Error creating buku:', error);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Tambah Buku</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nama" className="block text-gray-700 font-medium mb-1">Nama Buku</label>
                        <input
                            id="nama"
                            type="text"
                            value={nama}
                            onChange={e => setNama(e.target.value)}
                            placeholder="Nama Buku"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="kategori_id" className="block text-gray-700 font-medium mb-1">Kategori</label>
                        <input
                            id="kategori_id"
                            type="text"
                            value={kategori_id}
                            onChange={e => setKategoriId(e.target.value)}
                            placeholder="Kategori"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="author" className="block text-gray-700 font-medium mb-1">Author</label>
                        <input
                            id="author"
                            type="text"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            placeholder="Author"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="tanggal_rilis" className="block text-gray-700 font-medium mb-1">Tanggal Rilis</label>
                        <input
                            id="tanggal_rilis"
                            type="date"
                            value={tanggal_rilis}
                            onChange={e => setTanggalRilis(e.target.value)}
                            placeholder="Tanggal Rilis"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="publisher" className="block text-gray-700 font-medium mb-1">Publisher</label>
                        <input
                            id="publisher"
                            type="text"
                            value={publisher}
                            onChange={e => setPublisher(e.target.value)}
                            placeholder="Publisher"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Tambah
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;