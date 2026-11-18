// =====================
// DATA PROVIDER & PAKET
// =====================

var PROVIDER = {
  telkomsel: {
    nama: 'Telkomsel',
    logo: 'logos/telkomsel.jpg',
    pulsa: [
      { id: 'ts-5',   nominal: 5000,   keterangan: 'Pulsa reguler' },
      { id: 'ts-10',  nominal: 10000,  keterangan: 'Pulsa reguler' },
      { id: 'ts-20',  nominal: 20000,  keterangan: 'Pulsa reguler' },
      { id: 'ts-25',  nominal: 25000,  keterangan: 'Pulsa reguler' },
      { id: 'ts-50',  nominal: 50000,  keterangan: 'Pulsa reguler' },
      { id: 'ts-100', nominal: 100000, keterangan: 'Pulsa reguler' }
    ],
    data: [
      { id: 'ts-d25',  nominal: 25000,  keterangan: '5GB / 7 hari' },
      { id: 'ts-d50',  nominal: 50000,  keterangan: '12GB / 30 hari' },
      { id: 'ts-d100', nominal: 100000, keterangan: '30GB / 30 hari' },
      { id: 'ts-d150', nominal: 150000, keterangan: '50GB / 30 hari' }
    ]
  },
  indosat: {
    nama: 'Indosat IM3',
    logo: 'logos/indosat.jpg',
    pulsa: [
      { id: 'is-5',   nominal: 5000,   keterangan: 'Pulsa reguler' },
      { id: 'is-10',  nominal: 10000,  keterangan: 'Pulsa reguler' },
      { id: 'is-15',  nominal: 15000,  keterangan: 'Pulsa reguler' },
      { id: 'is-25',  nominal: 25000,  keterangan: 'Pulsa reguler' },
      { id: 'is-50',  nominal: 50000,  keterangan: 'Pulsa reguler' },
      { id: 'is-100', nominal: 100000, keterangan: 'Pulsa reguler' }
    ],
    data: [
      { id: 'is-d20',  nominal: 20000,  keterangan: '4GB / 7 hari' },
      { id: 'is-d30',  nominal: 30000,  keterangan: '8GB / 30 hari' },
      { id: 'is-d50',  nominal: 50000,  keterangan: '14GB / 30 hari' },
      { id: 'is-d100', nominal: 100000, keterangan: '28GB / 30 hari' }
    ]
  },
  xl: {
    nama: 'XL Axiata',
    logo: 'logos/xl.png',
    pulsa: [
      { id: 'xl-5',   nominal: 5000,   keterangan: 'Pulsa reguler' },
      { id: 'xl-10',  nominal: 10000,  keterangan: 'Pulsa reguler' },
      { id: 'xl-20',  nominal: 20000,  keterangan: 'Pulsa reguler' },
      { id: 'xl-25',  nominal: 25000,  keterangan: 'Pulsa reguler' },
      { id: 'xl-50',  nominal: 50000,  keterangan: 'Pulsa reguler' },
      { id: 'xl-100', nominal: 100000, keterangan: 'Pulsa reguler' }
    ],
    data: [
      { id: 'xl-d25',  nominal: 25000,  keterangan: '6GB / 7 hari' },
      { id: 'xl-d40',  nominal: 40000,  keterangan: '10GB / 30 hari' },
      { id: 'xl-d60',  nominal: 60000,  keterangan: '18GB / 30 hari' },
      { id: 'xl-d100', nominal: 100000, keterangan: '32GB / 30 hari' }
    ]
  },
  tri: {
    nama: 'Tri (3)',
    logo: 'logos/tri.jpg',
    pulsa: [
      { id: 'tr-5',  nominal: 5000,  keterangan: 'Pulsa reguler' },
      { id: 'tr-10', nominal: 10000, keterangan: 'Pulsa reguler' },
      { id: 'tr-20', nominal: 20000, keterangan: 'Pulsa reguler' },
      { id: 'tr-25', nominal: 25000, keterangan: 'Pulsa reguler' },
      { id: 'tr-50', nominal: 50000, keterangan: 'Pulsa reguler' }
    ],
    data: [
      { id: 'tr-d20', nominal: 20000, keterangan: '5GB / 7 hari' },
      { id: 'tr-d30', nominal: 30000, keterangan: '9GB / 30 hari' },
      { id: 'tr-d50', nominal: 50000, keterangan: '16GB / 30 hari' },
      { id: 'tr-d75', nominal: 75000, keterangan: '25GB / 30 hari' }
    ]
  },
  smartfren: {
    nama: 'Smartfren',
    logo: 'logos/smartfren.jpg',
    pulsa: [
      { id: 'sf-5',  nominal: 5000,  keterangan: 'Pulsa reguler' },
      { id: 'sf-10', nominal: 10000, keterangan: 'Pulsa reguler' },
      { id: 'sf-15', nominal: 15000, keterangan: 'Pulsa reguler' },
      { id: 'sf-25', nominal: 25000, keterangan: 'Pulsa reguler' },
      { id: 'sf-50', nominal: 50000, keterangan: 'Pulsa reguler' }
    ],
    data: [
      { id: 'sf-d20', nominal: 20000, keterangan: '5GB / 7 hari' },
      { id: 'sf-d35', nominal: 35000, keterangan: '10GB / 30 hari' },
      { id: 'sf-d55', nominal: 55000, keterangan: '18GB / 30 hari' },
      { id: 'sf-d80', nominal: 80000, keterangan: '28GB / 30 hari' }
    ]
  }
};

// =====================
// STATE APLIKASI
// =====================

var riwayat = JSON.parse(localStorage.getItem('riwayatTopUp')) || [];
var pilihan = null;        // paket yang dipilih, menunggu konfirmasi
var providerAktif = 'telkomsel';
var jenisAktif = 'pulsa';
var timerNotifikasi;

// =====================
// FUNGSI PEMBANTU
// =====================

function formatRupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}

function formatWaktu(timestamp) {
  var tanggal = new Date(timestamp);
  var opsi = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
  return tanggal.toLocaleString('id-ID', opsi);
}

function nomorValid(nomor) {
  // harus diawali 08, panjang 10-13 digit
  if (nomor.length < 10 || nomor.length > 13) return false;
  if (nomor.startsWith('08')) return true;
  return false;
}

function cariLogoProvider(namaProvider) {
  var kunci;
  for (kunci in PROVIDER) {
    if (PROVIDER[kunci].nama === namaProvider) {
      return PROVIDER[kunci].logo;
    }
  }
  return 'logos/telkomsel.jpg';
}

// =====================
// NOTIFIKASI
// =====================

function tampilkanNotifikasi(pesan) {
  var el = document.getElementById('notifikasi');
  el.textContent = pesan;
  el.classList.remove('tersembunyi');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  clearTimeout(timerNotifikasi);
  timerNotifikasi = setTimeout(function() {
    el.classList.add('tersembunyi');
  }, 2200);
}

// =====================
// TAMPILKAN RINGKASAN ATAS
// =====================

function tampilkanRingkasan() {
  var total = 0;
  var i;
  for (i = 0; i < riwayat.length; i++) {
    total = total + riwayat[i].nominal;
  }

  document.getElementById('total-nominal').textContent = formatRupiah(total);
  document.getElementById('total-transaksi').textContent = riwayat.length;

  if (riwayat.length > 0) {
    var terakhir = riwayat[riwayat.length - 1];
    document.getElementById('nominal-terakhir').textContent = formatRupiah(terakhir.nominal);
  } else {
    document.getElementById('nominal-terakhir').textContent = 'Rp 0';
  }
}

// =====================
// TAMPILKAN PROVIDER
// =====================

function tampilkanProvider() {
  var html = '';
  var kunci;

  for (kunci in PROVIDER) {
    var item = PROVIDER[kunci];
    var kelasAktif = '';
    if (kunci === providerAktif) {
      kelasAktif = 'aktif';
    }

    html = html + '<button type="button" class="pilihan-provider ' + kelasAktif + '" data-provider="' + kunci + '">';
    html = html + '<img class="logo-provider" src="' + item.logo + '" alt="" />';
    html = html + '<span class="nama-provider">' + item.nama + '</span>';
    html = html + '</button>';
  }

  document.getElementById('daftar-provider').innerHTML = html;
}

// =====================
// TAMPILKAN PAKET
// =====================

function tampilkanPaket() {
  var daftarPaket = PROVIDER[providerAktif][jenisAktif];
  var logoProvider = PROVIDER[providerAktif].logo;
  var html = '';
  var i;

  for (i = 0; i < daftarPaket.length; i++) {
    var paket = daftarPaket[i];

    html = html + '<article class="kartu-paket">';
    html = html + '<img class="ikon-paket" src="' + logoProvider + '" alt="" />';
    html = html + '<span class="nominal-paket">' + formatRupiah(paket.nominal) + '</span>';
    html = html + '<span class="keterangan-paket">' + paket.keterangan + '</span>';
    html = html + '<button type="button" class="tombol-topup" data-id="' + paket.id + '">Top Up</button>';
    html = html + '</article>';
  }

  document.getElementById('daftar-paket').innerHTML = html;
}

// =====================
// TAMPILKAN RINGKASAN PILIHAN
// =====================

function tampilkanRingkasanPilihan() {
  var area = document.getElementById('area-ringkasan');
  var isi = document.getElementById('isi-ringkasan');

  if (pilihan === null) {
    area.classList.add('tersembunyi');
    return;
  }

  var jenisTeks = 'Pulsa';
  if (pilihan.jenis === 'data') {
    jenisTeks = 'Paket Data';
  }

  var html = '';
  html = html + '<div class="baris-ringkasan">';
  html = html + '<span class="label-ringkasan-detail">Provider</span>';
  html = html + '<span class="nilai-ringkasan-detail">';
  html = html + '<img class="logo-provider" src="' + pilihan.logo + '" alt="" /> ';
  html = html + pilihan.provider;
  html = html + '</span>';
  html = html + '</div>';

  html = html + '<div class="baris-ringkasan">';
  html = html + '<span class="label-ringkasan-detail">Nomor Tujuan</span>';
  html = html + '<span class="nilai-ringkasan-detail">' + pilihan.nomor + '</span>';
  html = html + '</div>';

  html = html + '<div class="baris-ringkasan">';
  html = html + '<span class="label-ringkasan-detail">Paket</span>';
  html = html + '<span class="nilai-ringkasan-detail">' + jenisTeks + ' - ' + pilihan.keterangan + '</span>';
  html = html + '</div>';

  html = html + '<div class="baris-ringkasan baris-total">';
  html = html + '<span class="label-ringkasan-detail">Total Bayar</span>';
  html = html + '<span class="nilai-ringkasan-detail">' + formatRupiah(pilihan.nominal) + '</span>';
  html = html + '</div>';

  isi.innerHTML = html;
  area.classList.remove('tersembunyi');
}

// =====================
// TAMPILKAN RIWAYAT
// =====================

function tampilkanRiwayat() {
  var elRiwayat = document.getElementById('daftar-riwayat');
  var tombolBersihkan = document.getElementById('tombol-bersihkan');

  if (riwayat.length === 0) {
    tombolBersihkan.classList.add('tersembunyi');
    elRiwayat.innerHTML = '<p class="teks-kosong">Belum ada riwayat</p>';
    return;
  }

  tombolBersihkan.classList.remove('tersembunyi');

  var html = '';
  var i;

  // tampilkan dari yang paling baru
  for (i = riwayat.length - 1; i >= 0; i--) {
    var transaksi = riwayat[i];
    var logo = transaksi.logo || cariLogoProvider(transaksi.provider);
    var badgeKelas = 'badge-jenis';
    var badgeTeks = 'Pulsa';

    if (transaksi.jenis === 'data') {
      badgeKelas = 'badge-jenis data';
      badgeTeks = 'Paket Data';
    }

    var detail = transaksi.provider + ' - ' + transaksi.nomor + ' - ' + transaksi.keterangan;

    html = html + '<div class="baris-riwayat">';
    html = html + '<img class="ikon-paket" src="' + logo + '" alt="" />';
    html = html + '<div class="rincian-riwayat">';
    html = html + '<span class="nominal-riwayat">' + formatRupiah(transaksi.nominal) + '</span>';
    html = html + '<span class="keterangan-riwayat">' + detail + '</span>';
    html = html + '</div>';
    html = html + '<span class="' + badgeKelas + '">' + badgeTeks + '</span>';
    html = html + '<span class="waktu-riwayat">' + formatWaktu(transaksi.waktu) + '</span>';
    html = html + '<button type="button" class="tombol-hapus" data-hapus="' + transaksi.id + '">Hapus</button>';
    html = html + '</div>';
  }

  elRiwayat.innerHTML = html;
}

// =====================
// FUNGSI UTAMA
// =====================

function tampilkanSemua() {
  tampilkanRingkasan();
  tampilkanPaket();
  tampilkanRingkasanPilihan();
  tampilkanRiwayat();
}

function pilihPaket(idPaket) {
  var nomor = document.getElementById('nomor-hp').value.trim();

  if (!nomorValid(nomor)) {
    document.getElementById('nomor-hp').focus();
    tampilkanNotifikasi('Nomor HP tidak valid. Gunakan format 08xxxxxxxxxx.');
    return;
  }

  // cari paket yang dipilih berdasarkan id
  var daftarPaket = PROVIDER[providerAktif][jenisAktif];
  var paketDipilih = null;
  var i;

  for (i = 0; i < daftarPaket.length; i++) {
    if (daftarPaket[i].id === idPaket) {
      paketDipilih = daftarPaket[i];
      break;
    }
  }

  if (paketDipilih === null) return;

  // simpan ke variabel pilihan (belum ke riwayat)
  pilihan = {
    provider: PROVIDER[providerAktif].nama,
    logo: PROVIDER[providerAktif].logo,
    nomor: nomor,
    jenis: jenisAktif,
    nominal: paketDipilih.nominal,
    keterangan: paketDipilih.keterangan
  };

  tampilkanRingkasanPilihan();
  document.getElementById('area-ringkasan').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function konfirmasiTopUp() {
  if (pilihan === null) return;

  // buat objek transaksi baru
  var transaksi = {
    id: Date.now(),
    provider: pilihan.provider,
    logo: pilihan.logo,
    nomor: pilihan.nomor,
    jenis: pilihan.jenis,
    nominal: pilihan.nominal,
    keterangan: pilihan.keterangan,
    waktu: Date.now()
  };

  riwayat.push(transaksi);
  localStorage.setItem('riwayatTopUp', JSON.stringify(riwayat));

  var pesan = 'Top up ' + pilihan.provider + ' ' + formatRupiah(pilihan.nominal) + ' berhasil';
  pilihan = null;

  tampilkanSemua();
  tampilkanNotifikasi(pesan);
}

function batalkanPilihan() {
  pilihan = null;
  tampilkanRingkasanPilihan();
}

// =====================
// EVENT LISTENERS
// =====================

// klik provider
document.getElementById('daftar-provider').addEventListener('click', function(event) {
  var tombol = event.target.closest('button[data-provider]');
  if (tombol === null) return;
  if (tombol.dataset.provider === providerAktif) return;

  providerAktif = tombol.dataset.provider;
  pilihan = null;
  tampilkanProvider();
  tampilkanPaket();
  tampilkanRingkasanPilihan();
});

// klik tab Pulsa / Paket Data
document.querySelector('.pilih-jenis').addEventListener('click', function(event) {
  var tombol = event.target.closest('button[data-jenis]');
  if (tombol === null) return;
  if (tombol.dataset.jenis === jenisAktif) return;

  jenisAktif = tombol.dataset.jenis;
  pilihan = null;

  // ubah tampilan tombol aktif
  var semuaTombol = document.querySelectorAll('.jenis');
  var i;
  for (i = 0; i < semuaTombol.length; i++) {
    semuaTombol[i].classList.remove('aktif');
  }
  tombol.classList.add('aktif');

  tampilkanPaket();
  tampilkanRingkasanPilihan();
});

// klik tombol Top Up di kartu paket
document.getElementById('daftar-paket').addEventListener('click', function(event) {
  var tombol = event.target.closest('button[data-id]');
  if (tombol !== null) {
    pilihPaket(tombol.dataset.id);
  }
});

// konfirmasi top up
document.getElementById('tombol-konfirmasi').addEventListener('click', function() {
  konfirmasiTopUp();
});

// batal pilihan
document.getElementById('tombol-batal-pilihan').addEventListener('click', function() {
  batalkanPilihan();
});

// input nomor HP: hanya angka, maks 15 digit
document.getElementById('nomor-hp').addEventListener('input', function() {
  var nilai = this.value;
  var hanyaAngka = '';
  var i;

  for (i = 0; i < nilai.length; i++) {
    if (nilai[i] >= '0' && nilai[i] <= '9') {
      hanyaAngka = hanyaAngka + nilai[i];
    }
  }

  if (hanyaAngka.length > 15) {
    hanyaAngka = hanyaAngka.slice(0, 15);
  }

  this.value = hanyaAngka;
  localStorage.setItem('nomorHp', hanyaAngka);

  if (pilihan !== null) {
    batalkanPilihan();
  }
});

// hapus satu riwayat
document.getElementById('daftar-riwayat').addEventListener('click', function(event) {
  var tombol = event.target.closest('button[data-hapus]');
  if (tombol === null) return;

  var idHapus = Number(tombol.dataset.hapus);
  var riwayatBaru = [];
  var i;

  for (i = 0; i < riwayat.length; i++) {
    if (riwayat[i].id !== idHapus) {
      riwayatBaru.push(riwayat[i]);
    }
  }

  riwayat = riwayatBaru;
  localStorage.setItem('riwayatTopUp', JSON.stringify(riwayat));
  tampilkanSemua();
});

// bersihkan semua riwayat
document.getElementById('tombol-bersihkan').addEventListener('click', function() {
  var yakin = confirm('Bersihkan seluruh riwayat top up?');
  if (yakin) {
    riwayat = [];
    localStorage.setItem('riwayatTopUp', JSON.stringify(riwayat));
    tampilkanSemua();
  }
});

// =====================
// INISIALISASI
// =====================

// pulihkan nomor HP yang terakhir diisi
var nomorTersimpan = localStorage.getItem('nomorHp');
if (nomorTersimpan !== null) {
  document.getElementById('nomor-hp').value = nomorTersimpan;
}

// jalankan tampilan awal
tampilkanProvider();
tampilkanSemua();
