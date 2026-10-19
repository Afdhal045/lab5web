// Mini Project — Kalkulator Nilai Mahasiswa

// 1. Fungsi untuk menghitung nilai akhir berdasarkan bobot
function hitungNilaiAkhir(tugas, uts, uas) {
    return tugas * 0.30 + uts * 0.30 + uas * 0.40;
}

// 2. Fungsi untuk menentukan predikat
function tentukanPredikat(nilai) {
    if (nilai >= 85) return "A";
    if (nilai >= 75) return "B";
    if (nilai >= 60) return "C";
    if (nilai >= 50) return "D";
    return "E";
}

// 3. Fungsi untuk menentukan status kelulusan
function tentukanStatus(nilai) {
    return nilai >= 60 ? "Lulus" : "Belum lulus";
}

// 4. Fungsi untuk menampilkan hasil pada halaman HTML
function tampilkanHasil(akhir, predikat, status) {
    document.getElementById("nilaiAkhir").textContent = akhir.toFixed(2);
    document.getElementById("predikat").textContent = predikat;
    document.getElementById("status").textContent = status;
    document.getElementById("hasil").style.display = "block";
}

// 5. Fungsi utama untuk memproses input dari form
function prosesHitung() {
    const inputTugas = document.getElementById("tugas").value;
    const inputUts = document.getElementById("uts").value;
    const inputUas = document.getElementById("uas").value;
    const pesanError = document.getElementById("pesanError");
    const divHasil = document.getElementById("hasil");

    // Bersihkan pesan error sebelumnya
    pesanError.textContent = "";

    // Validasi apakah ada input yang kosong
    if (inputTugas.trim() === "" || inputUts.trim() === "" || inputUas.trim() === "") {
        pesanError.textContent = "Semua nilai (Tugas, UTS, UAS) harus diisi!";
        divHasil.style.display = "none";
        return;
    }

    const tugas = Number(inputTugas);
    const uts = Number(inputUts);
    const uas = Number(inputUas);

    // Validasi agar setiap nilai berada pada rentang 0–100
    if (tugas < 0 || tugas > 100 || uts < 0 || uts > 100 || uas < 0 || uas > 100) {
        pesanError.textContent = "Nilai harus berada pada rentang 0 sampai 100!";
        divHasil.style.display = "none";
        return;
    }

    // Hitung nilai akhir, predikat, dan status menggunakan function
    const akhir = hitungNilaiAkhir(tugas, uts, uas);
    const predikat = tentukanPredikat(akhir);
    const status = tentukanStatus(akhir);

    // Tampilkan di Console
    console.log("Nilai akhir:", akhir.toFixed(2));
    console.log("Predikat:", predikat);
    console.log("Status:", status);

    // Tampilkan di HTML
    tampilkanHasil(akhir, predikat, status);
}

// Fungsi untuk mereset form dan menyembunyikan hasil
function resetForm() {
    document.getElementById("tugas").value = "";
    document.getElementById("uts").value = "";
    document.getElementById("uas").value = "";
    document.getElementById("pesanError").textContent = "";
    document.getElementById("hasil").style.display = "none";
}

// Fungsi tombol cepat untuk menguji skenario nilai
function ujiSkenario(t, u, a) {
    document.getElementById("tugas").value = t;
    document.getElementById("uts").value = u;
    document.getElementById("uas").value = a;
    prosesHitung();
}

// ==========================================
// PENGUJIAN 3 SKENARIO PADA CONSOLE
// ==========================================
console.log("=== Pengujian Skenario 1 ===");
const akhir1 = hitungNilaiAkhir(85, 78, 88);
console.log("Nilai akhir:", akhir1.toFixed(2));
console.log("Predikat:", tentukanPredikat(akhir1));
console.log("Status:", akhir1 >= 60 ? "Lulus" : "Belum lulus");

console.log("=== Pengujian Skenario 2 ===");
const akhir2 = hitungNilaiAkhir(90, 85, 90);
console.log("Nilai akhir:", akhir2.toFixed(2));
console.log("Predikat:", tentukanPredikat(akhir2));
console.log("Status:", akhir2 >= 60 ? "Lulus" : "Belum lulus");

console.log("=== Pengujian Skenario 3 ===");
const akhir3 = hitungNilaiAkhir(50, 45, 55);
console.log("Nilai akhir:", akhir3.toFixed(2));
console.log("Predikat:", tentukanPredikat(akhir3));
console.log("Status:", akhir3 >= 60 ? "Lulus" : "Belum lulus");
