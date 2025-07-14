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
