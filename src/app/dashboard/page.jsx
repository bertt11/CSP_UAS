"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nama_produk: "",
    harga_satuan: "",
    quantity: "",
  });
  const [editProduct, setEditProduct] = useState(null);

  //mengembalikan URL ke signin jika ingin menembus secara ilegal
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      router.push("/signin");
    } else {
      const userObj = JSON.parse(savedUser);
      setUser(userObj);
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    const data = await res.json();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    if (
      !newProduct.nama_produk ||
      !newProduct.harga_satuan ||
      !newProduct.quantity
    ) {
      alert("Semua field harus diisi.");
      return;
    }

    const res = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newProduct,
        harga_satuan: Number(newProduct.harga_satuan),
        quantity: Number(newProduct.quantity),
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setProducts([...products, data]);
      setShowForm(false);
      setNewProduct({ nama_produk: "", harga_satuan: "", quantity: "" });
    } else {
      alert("Gagal menambahkan produk.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus produk ini?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setProducts(products.filter((p) => p.id !== id));
    } else {
      alert("Gagal menghapus produk.");
    }
  };

  const handleEditSave = async () => {
    const res = await fetch(`http://localhost:3001/products/${editProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editProduct,
        harga_satuan: Number(editProduct.harga_satuan),
        quantity: Number(editProduct.quantity),
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      setProducts(
        products.map((p) => (p.id === updated.id ? updated : p))
      );
      setEditProduct(null);
    } else {
      alert("Gagal menyimpan perubahan.");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">
            Welcome, {user.username}
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              router.push("/signin");
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Tambah Produk */}
        {user.role === "admin" && !editProduct && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Tambah Produk
          </button>
        )}

        {showForm && (
          <div className="bg-gray-100 p-4 rounded mb-6">
            <h3 className="text-lg text-black font-semibold mb-2">Tambah Produk Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <input
                type="text"
                placeholder="Nama Produk"
                className="p-2 border rounded text-black"
                value={newProduct.nama_produk}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, nama_produk: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Harga Satuan"
                className="p-2 border rounded text-black"
                value={newProduct.harga_satuan}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    harga_satuan: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Quantity"
                className="p-2 border rounded text-black"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, quantity: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleAddProduct}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Simpan
            </button>
          </div>
        )}

        {/* Edit Produk */}
        {editProduct && (
          <div className="bg-yellow-100 p-4 rounded mb-6">
            <h3 className="text-lg text-black font-semibold mb-2">Edit Produk</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <input
                type="text"
                className="p-2 border rounded text-black"
                value={editProduct.nama_produk}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    nama_produk: e.target.value,
                  })
                }
              />
              <input
                type="number"
                className="p-2 border rounded text-black"
                value={editProduct.harga_satuan}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    harga_satuan: e.target.value,
                  })
                }
              />
              <input
                type="number"
                className="p-2 border rounded text-black"
                value={editProduct.quantity}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    quantity: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-x-2">
              <button
                onClick={handleEditSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Simpan Perubahan
              </button>
              <button
                onClick={() => setEditProduct(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Tabel Produk */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-xl overflow-hidden">
            <thead className="bg-gray-200 text-black font-semibold">
              <tr>
                <th className="px-6 py-3 border">Nama Produk</th>
                <th className="px-6 py-3 border">Harga</th>
                <th className="px-6 py-3 border">Qty</th>
                {user.role === "admin" && (
                  <th className="px-6 py-3 border">Aksi</th>
                )}
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => (
                <tr key={p.id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-3 border text-black">{p.nama_produk}</td>
                  <td className="px-6 py-3 border text-black">Rp {p.harga_satuan.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-3 border text-black">{p.quantity}</td>
                  {user.role === "admin" && (
                    <td className="px-6 py-3 border space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        onClick={() => {
                          setShowForm(false);
                          setEditProduct(p);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
