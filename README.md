# README — Nana Cake & Cookies (Panduan Singkat)

Ini panduan sederhana untuk menambah, mengubah, dan menghapus produk di website ini, lalu cara mengirim (deploy) perubahan ke GitHub agar terlihat online.

Ringkas: file yang sering diubah ada di `index.html`, gambar produk di folder `gambar/BOLUFINAL/`, dan ada daftar produk sederhana di bagian JavaScript (`popularProducts`).

1. Lokasi penting
- Tampilan toko: buka `index.html` → cari `<div class="products-grid">`.
- Gambar produk: simpan di `gambar/BOLUFINAL/`.
- Data produk untuk modal/detail ada di array `popularProducts` di bawah file `index.html`.

2. Cara menambahkan produk (langkah gampang)
- Upload gambar ke folder `gambar/BOLUFINAL/` (gunakan nama file tanpa spasi, huruf kecil lebih aman).
- Tambah HTML kartu produk di `index.html` di dalam `<div class="products-grid">`. Contoh pendek:
  - Gunakan pola yang sudah ada:
    - `<div class="product-card"> ... <img src="gambar/BOLUFINAL/nama-file.jpg" alt="Nama Produk"> ... </div>`
- Tambah data ke JavaScript (supaya modal/detail bekerja). Di `index.html`, temukan `popularProducts` lalu tambahkan objek baru:
  - Contoh:
    ```
    { id: 4, name: 'Nama Produk', price: 30000, image: 'gambar/BOLUFINAL/nama-file.jpg', description: 'Deskripsi singkat' }
    ```
  - Pastikan `id` unik (tidak sama dengan produk lain).

3. Cara mengubah produk
- Ganti gambar: upload gambar baru ke folder yang sama dan ubah `src` di `<img>` dan/atau properti `image` di `popularProducts`.
- Ubah nama/harga/deskripsi: edit teks di kartu `.product-card` untuk yang tampil, dan di `popularProducts` untuk detail/modal.
- Jika hanya mau ganti harga tampil, ubah teks di elemen `<div class="product-price">RpXX.XXX</div>`.

4. Cara menghapus produk
- Hapus blok HTML `.product-card` dari `index.html`.
- Hapus objek yang sesuai di array `popularProducts`.
- (Opsional) Hapus file gambar dari folder `gambar/BOLUFINAL/` bila sudah tidak dipakai.

5. Pemeriksaan singkat sebelum push
- Pastikan path gambar benar (tidak ada spasi, ejaan tepat).
- Jika menambahkan `data-product-id` di HTML, cocokkan dengan `id` di `popularProducts`.
- Buka browser, refresh (Ctrl+F5) untuk melihat perubahan.

6. Cara deploy ke GitHub (supaya link GitHub Pages terupdate)
- Di komputer lokal (folder proyek), jalankan:
  - `git add .`
  - `git commit -m "Update produk: [keterangan singkat]"`
  - `git push origin main`
- Jika belum pakai GitHub Pages:
  - Buat repo di GitHub dan push kode.
  - Di GitHub → Settings → Pages: pilih branch `main` dan folder `root` lalu simpan.
  - Tunggu beberapa menit sampai halaman ter-update.
- Setiap kali Anda tambah/ubah/hapus produk, ulangi: commit → push. Perubahan akan muncul setelah GitHub Pages build selesai.

7. Tips sederhana
- Nama file gambar: gunakan format `nama-produk.jpg` (huruf kecil, tanpa spasi).
- Backup sebelum menghapus gambar.
- Kalau punya banyak produk, pertimbangkan menyimpan data di `data/products.json` dan buat script untuk memuatnya (bantu kalau nanti ingin editing via file yang rapi).

Butuh contoh file JSON atau script untuk memuat `products.json`? Beri tahu, saya siapkan contoh singkat.
