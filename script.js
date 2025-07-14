// function preview img
function previewImage(element) {
    const mainImage = document.getElementById("mainImage");
    mainImage.src = element.src;
}

// function handle sbmit dan sweetalert
function handleSubmit(e) {
    e.preventDefault(); //stop reload
    const checkinDate = document.getElementById("checkinDate").value;
    if (!checkinDate) {
        Swal.fire({
            icon: "warning",
            title: "Tanggal belum dipilih!",
            text: "Yuk pilih dulu tanggal check-in-nya!",
        });
        return;
    }

    // konfirmasi dulu sebelum lanjut
    Swal.fire({
        title: "Konfirmasi Pesanan",
        text: `Pesan kost dengan tanggal check-in: ${checkinDate}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, pesan sekarang!",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (result.isConfirmed) {
            // jika user yakin => kirim pesanan
            Swal.fire({
                title: "Pesanan Terkirim!",
                text: "Kami akan segera menghubungi kamu.",
                icon: "success",
                confirmButtonText: "Cek Pesanan",
            }).then(() => {
                //arahkan ke halaman pesanan
                window.location.href = "order.html";
            });

            // opsional reset form
            document.getElementById("formPesan").reset();
        }
    });
}

// function untuk menampilkan detail pesanan di modal
function lihatDetail(nama, tanggal, alamat, status, kode) {
    document.getElementById("modalNamaKost").textContent = nama;
    document.getElementById("modalTanggal").textContent = tanggal;
    document.getElementById("modalAlamat").textContent = alamat;
    document.getElementById("modalStatus").textContent = status;
    document.getElementById("modalKode").textContent = kode;

    const modal =  new bootstrap.Modal(document.getElementById("detailModal"));
    modal.show();
}

// untuk menyalin kodde ke clipboard
function salinKode () {
    const kode = document.getElementById("modalKode").textContent;
    navigator.clipboard.writeText(kode).then(() => {
        Swal.fire({
            icon: "success",
            title: "Kode disalin",
            text: `Kode booking ${kode} sudah disalin`,
            timer: 1500,
            showConfirmButton: false
        });
    });
}

// simulasi kirim form
let currentRowButton = null; // untuk menyimpan tombol bayar yang terakhir di klik

// function untuk upload bukti bayar di modal
function bukaUploadModal() {
    const modal = new bootstrap.Modal(document.getElementById("uploadModal"));
    modal.show();
}

// event submit form upload
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("uploadForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const file = document.getElementById("buktiBayar").isDefaultNamespace[0];

        if (!file) {
            Swal.fire("Oops!", "Harap pilih file bukti bayar!", "warning");
            return;
        }

        // simulasi pengiriman berhasil 
        Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Bukti pembayaran telah terkirim",
            timer: 2000,
            showConfirmButton: false 
        });

        // tutup modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("uploadModal"));
        modal.hide();

        // reset form
        this.reset();

        // ubah status dan hapus tombol bayar
        if (currentRowButton) {
            const row = currentRowButton.closeset("tr"); // cari <tr>
            const statusCell = row.querySelector("td:nth-child(5)"); //kolom status

            statusCell.innerHTML = `<span class="badge bg-info text-dark">Dalam Proses</span>`

            currentRowButton.remove(); // hapus tombol bayar
            currentRowButton = null; // reset variabel
        }
    });
});

// function batalkan pesanan
function batalkanPesanan(btn) {
    Swal.fire({
        title: "Yakin ingin batalkan pesanan?",
        tetx: "Tindakan ini tidak bisa dibatalkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, batalkan!",
        cancelButtonText: "Batal",
        reverseButton: true
    }).then((result) => {
        if(result.isConfirmed) {
            // ganti status jadi 'Dibatalkan'
            const row = btn.closest("tr");
            const statusCell = row.querySelector("td:nth-child(5)");
            statusCell.innerHTML = `<span class="badge bg-danger">Dibatalkan</span>`;

            // hapus semua tombol aksi biar tidak bisa diklik bayar/lihat detail lagi
            const aksiCell = row.querySelector("td:nth-child(6)");
            aksiCell.innerHTML = `<button class="btn btn-secondary btn-sm disabled">Dibatalkan</button>`;

            //konfirmasi sukses dibatalkan
            Swal.fire({
                icon: "success",
                title: "Dibatalkan",
                text: "pesananmu telah dibatalkan.",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}