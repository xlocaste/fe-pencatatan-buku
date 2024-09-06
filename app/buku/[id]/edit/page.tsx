'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation";

const Edit = () => {
    const [nama, setNama] = useState('');
    const [kategori_id, setKategoriId] = useState('');
    const [author, setAuthor] = useState('');
    const [tanggal_rilis, setTanggalRilis] = useState('');
    const [publisher, setPublisher] = useState('');
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const id = params.id;
        if (id) {
            axios.get(`http://localhost:8000/api/buku/${id}`)
                .then(response => {
                    const kategori = response.data.data;
                    setNama(kategori.nama);
                    setKategoriId(kategori.kategori_id);
                    setAuthor(kategori.author);
                    setTanggalRilis(kategori.tanggal_rilis);
                    setPublisher(kategori.publisher);
                })
                .catch(error => console.error('Error fetching buku:', error));
        }
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = params.id;
        if (id) {
            try {
                await axios.put(`http://localhost:8000/api/buku/${id}`, { nama, kategori_id, author, tanggal_rilis, publisher});
                router.push('/buku');
            } catch (error) {
                console.error('Error updating buku:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Buku</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="nama">Nama Buku</label>
                            <input
                                id="nama"
                                type="text"
                                value={nama}
                                onChange={e => setNama(e.target.value)}
                                placeholder="Nama Buku"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Kategori</label>
                            <input
                                id="kategori_id"
                                type="text"
                                value={kategori_id}
                                onChange={e => setKategoriId(e.target.value)}
                                placeholder="Kategori"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Author</label>
                            <input
                                id="author"
                                type="text"
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
                                placeholder="Author"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Tanggal Rilis</label>
                            <input
                                id="tanggal_rilis"
                                type="date"
                                value={tanggal_rilis}
                                onChange={e => setTanggalRilis(e.target.value)}
                                placeholder="Tanggal Rilis"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Publisher</label>
                            <input
                                id="publisher"
                                type="text"
                                value={publisher}
                                onChange={e => setPublisher(e.target.value)}
                                placeholder="Publisher"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Edit;