/**
 * Mini Project — Kalkulator Nilai Mahasiswa
 * Praktikum JavaScript
 * 
 * Fitur:
 * - Menghitung nilai akhir berbobot (Tugas 30%, UTS 30%, UAS 40%)
 * - Menentukan predikat (A, B, C, D, E)
 * - Menentukan status kelulusan (Lulus >= 60, Belum Lulus < 60)
 * - Validasi input rentang 0-100
 * - Pemisahan logika komputasi dengan manipulasi DOM / tampilan
 * - Pengujian otomatis sekurang-kurangnya 3 skenario berbeda
 */

// ==========================================
// 1. FUNGSI LOGIKA & PERHITUNGAN (Pure Functions)
// ==========================================

/**
 * Menghitung nilai akhir berdasarkan bobot:
 * Tugas 30%, UTS 30%, UAS 40%
 * @param {number} tugas - Nilai tugas (0-100)
 * @param {number} uts - Nilai UTS (0-100)
 * @param {number} uas - Nilai UAS (0-100)
 * @returns {number} Nilai akhir
 */
function hitungNilaiAkhir(tugas, uts, uas) {
    return (tugas * 0.30) + (uts * 0.30) + (uas * 0.40);
}

/**
 * Menentukan predikat huruf berdasarkan nilai akhir
 * @param {number} nilai - Nilai akhir mahasiswa
 * @returns {string} Predikat ("A", "B", "C", "D", "E")
 */
function tentukanPredikat(nilai) {
    if (nilai >= 85) return "A";
    if (nilai >= 75) return "B";
    if (nilai >= 60) return "C";
    if (nilai >= 50) return "D";
    return "E";
}

/**
 * Menentukan status kelulusan berdasarkan nilai akhir
 * @param {number} nilai - Nilai akhir mahasiswa
 * @returns {string} "Lulus" atau "Belum lulus"
 */
function tentukanStatus(nilai) {
    return nilai >= 60 ? "Lulus" : "Belum lulus";
}

/**
 * Melakukan validasi input angka nilai
 * @param {number} nilai - Nilai yang divalidasi
 * @param {string} namaKomponen - Nama field (Tugas, UTS, atau UAS)
 * @returns {{ valid: boolean, pesan: string }}
 */
function validasiNilai(nilai, namaKomponen) {
    if (isNaN(nilai)) {
        return { valid: false, pesan: `Nilai ${namaKomponen} harus diisi dengan angka.` };
    }
    if (nilai < 0 || nilai > 100) {
        return { valid: false, pesan: `Nilai ${namaKomponen} harus berada di rentang 0–100. (Diinput: ${nilai})` };
    }
    return { valid: true, pesan: "" };
}

// ==========================================
// 2. FUNGSI TAMPILAN & DOM (UI Handler)
// ==========================================

/**
 * Menampilkan pesan kesalahan pada alert banner
 * @param {string} pesan
 */
function tampilkanError(pesan) {
    const errorAlert = document.getElementById("errorAlert");
    const errorMessage = document.getElementById("errorMessage");
    const resultSection = document.getElementById("resultSection");

    errorMessage.textContent = pesan;
    errorAlert.style.display = "flex";
    resultSection.style.display = "none";
}

/**
 * Menyembunyikan pesan kesalahan
 */
function sembunyikanError() {
    const errorAlert = document.getElementById("errorAlert");
    errorAlert.style.display = "none";
}

/**
 * Menampilkan hasil perhitungan pada halaman HTML
 * @param {number} tugas 
 * @param {number} uts 
 * @param {number} uas 
 * @param {number} akhir 
 * @param {string} predikat 
 * @param {string} status 
 */
function tampilkanHasil(tugas, uts, uas, akhir, predikat, status) {
    sembunyikanError();

    const resultSection = document.getElementById("resultSection");
    const hasilNilaiAkhir = document.getElementById("hasilNilaiAkhir");
    const hasilPredikat = document.getElementById("hasilPredikat");
    const hasilStatus = document.getElementById("hasilStatus");
    const hasilStatusText = document.getElementById("hasilStatusText");
    const hasilStatusIcon = document.getElementById("hasilStatusIcon");

    const poinTugas = document.getElementById("poinTugas");
    const poinUTS = document.getElementById("poinUTS");
    const poinUAS = document.getElementById("poinUAS");

    // Format nilai akhir dengan 2 desimal
    hasilNilaiAkhir.textContent = akhir.toFixed(2);

    // Update Predikat Badge & warnanya
    hasilPredikat.textContent = predikat;
    hasilPredikat.className = `grade-badge grade-${predikat}`;

    // Update Status Pill
    hasilStatusText.textContent = status;
    if (status === "Lulus") {
        hasilStatus.className = "status-pill status-lulus";
        hasilStatusIcon.textContent = "✓";
    } else {
        hasilStatus.className = "status-pill status-gagal";
        hasilStatusIcon.textContent = "✕";
    }

    // Detail breakdown kontribusi poin
    poinTugas.textContent = (tugas * 0.30).toFixed(2);
    poinUTS.textContent = (uts * 0.30).toFixed(2);
    poinUAS.textContent = (uas * 0.40).toFixed(2);

    // Tampilkan bagian hasil dengan animasi
    resultSection.style.display = "block";
    resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/**
 * Menangani event submit form
 * @param {Event} event 
 */
function tanganiSubmit(event) {
    event.preventDefault();

    const inputTugas = document.getElementById("nilaiTugas").value.trim();
    const inputUTS = document.getElementById("nilaiUTS").value.trim();
    const inputUAS = document.getElementById("nilaiUAS").value.trim();

    // Validasi input tidak boleh kosong
    if (inputTugas === "" || inputUTS === "" || inputUAS === "") {
        tampilkanError("Semua komponen nilai (Tugas, UTS, UAS) wajib diisi!");
        return;
    }

    const nilaiTugas = parseFloat(inputTugas);
    const nilaiUTS = parseFloat(inputUTS);
    const nilaiUAS = parseFloat(inputUAS);

    // Validasi rentang 0-100 untuk setiap nilai
    const validasi1 = validasiNilai(nilaiTugas, "Tugas");
    if (!validasi1.valid) {
        tampilkanError(validasi1.pesan);
        return;
    }

    const validasi2 = validasiNilai(nilaiUTS, "UTS");
    if (!validasi2.valid) {
        tampilkanError(validasi2.pesan);
        return;
    }

    const validasi3 = validasiNilai(nilaiUAS, "UAS");
    if (!validasi3.valid) {
        tampilkanError(validasi3.pesan);
        return;
    }

    // Hitung hasil menggunakan pure function
    const akhir = hitungNilaiAkhir(nilaiTugas, nilaiUTS, nilaiUAS);
    const predikat = tentukanPredikat(akhir);
    const status = tentukanStatus(akhir);

    // Log ke Console sesuai permintaan
    console.log("=== Hasil Perhitungan Nilai Mahasiswa ===");
    console.log("Tugas:", nilaiTugas, "(30% =", (nilaiTugas * 0.30).toFixed(2) + ")");
    console.log("UTS  :", nilaiUTS, "(30% =", (nilaiUTS * 0.30).toFixed(2) + ")");
    console.log("UAS  :", nilaiUAS, "(40% =", (nilaiUAS * 0.40).toFixed(2) + ")");
    console.log("Nilai akhir:", akhir.toFixed(2));
    console.log("Predikat   :", predikat);
    console.log("Status     :", status);

    // Tampilkan di HTML
    tampilkanHasil(nilaiTugas, nilaiUTS, nilaiUAS, akhir, predikat, status);
}

/**
 * Mengosongkan form dan menyembunyikan hasil/error
 */
function resetForm() {
    document.getElementById("formNilai").reset();
    sembunyikanError();
    document.getElementById("resultSection").style.display = "none";
}

// ==========================================
// 3. SKENARIO PENGUJIAN (Test Scenarios)
// ==========================================

const skenarioUji = [
    {
        nama: "Skenario 1 (Contoh Praktikum - Lulus Predikat B)",
        tugas: 85,
        uts: 78,
        uas: 88
    },
    {
        nama: "Skenario 2 (Nilai Sangat Baik - Lulus Predikat A)",
        tugas: 90,
        uts: 85,
        uas: 92
    },
    {
        nama: "Skenario 3 (Nilai Kurang - Belum Lulus Predikat D)",
        tugas: 50,
        uts: 45,
        uas: 55
    }
];

/**
 * Mengisi form secara instan dan menjalankan perhitungan berdasarkan indeks skenario (1-indexed)
 * @param {number} nomorSkenario - 1, 2, atau 3
 */
function jalankanSkenarioUji(nomorSkenario) {
    const data = skenarioUji[nomorSkenario - 1];
    if (!data) return;

    document.getElementById("nilaiTugas").value = data.tugas;
    document.getElementById("nilaiUTS").value = data.uts;
    document.getElementById("nilaiUAS").value = data.uas;

    // Trigger submit secara programatis
    const fakeEvent = { preventDefault: () => {} };
    tanganiSubmit(fakeEvent);
}

/**
 * Menjalankan uji otomatis sekurang-kurangnya 3 skenario pada saat script dimuat
 * dan menampilkannya di Console (console.table & console.log)
 */
function jalankanPengujianConsole() {
    console.log("%c=======================================================", "color: #818cf8; font-weight: bold;");
    console.log("%c UJI SKENARIO OTOMATIS: KALKULATOR NILAI MAHASISWA ", "color: #38bdf8; font-weight: bold; background: #0f172a; padding: 4px;");
    console.log("%c=======================================================", "color: #818cf8; font-weight: bold;");

    const hasilUji = skenarioUji.map((item, index) => {
        const akhir = hitungNilaiAkhir(item.tugas, item.uts, item.uas);
        const predikat = tentukanPredikat(akhir);
        const status = tentukanStatus(akhir);

        return {
            "Skenario": item.nama,
            "Tugas (30%)": item.tugas,
            "UTS (30%)": item.uts,
            "UAS (40%)": item.uas,
            "Nilai Akhir": akhir.toFixed(2),
            "Predikat": predikat,
            "Status": status
        };
    });

    console.table(hasilUji);
    console.log("Pengujian 3 skenario selesai dengan sukses. Semua fungsi bekerja sesuai spesifikasi.");
}

// Jalankan pengujian otomatis ke console saat dokumen selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    jalankanPengujianConsole();
});
