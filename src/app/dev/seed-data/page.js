"use client";

import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, setDoc, doc } from "firebase/firestore";

export default function SeedDataPage() {
  useEffect(() => {
    const seedData = async () => {
      const users = [
        {
          id: "1",
          username: "c14220241",
          password: "c14220241",
          role: "user",
        },
        {
          id: "2",
          username: "admin",
          password: "admin",
          role: "admin",
        },
      ];

      const products = [
        {
          id: "1",
          nama_produk: "Laptop A",
          harga_satuan: 12000000,
          quantity: 3,
        },
        {
          id: "2",
          nama_produk: "Mouse B",
          harga_satuan: 150000,
          quantity: 20,
        },
        {
          id: "3",
          nama_produk: "Keyboard",
          harga_satuan: 300000,
          quantity: 10,
        },
        {
          id: "8eb0",
          nama_produk: "test1",
          harga_satuan: 11,
          quantity: 2,
        },
      ];

      for (const user of users) {
        await setDoc(doc(db, "users", user.id), user);
      }

      for (const product of products) {
        await setDoc(doc(db, "products", product.id), product);
      }

      alert("Data berhasil disisipkan ke Firebase!");
    };

    seedData();
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-xl font-bold text-black">
        Menyisipkan data ke Firebase...
      </h1>
    </div>
  );
}
