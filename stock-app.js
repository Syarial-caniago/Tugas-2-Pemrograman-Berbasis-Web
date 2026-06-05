new Vue({
  el: '#app',

  data: {
    upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
    kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],

    filterUpbjj: "",
    filterKategori: "",
    sortBy: "",
    warningOnly: false,

    isEdit: false,
    editIndex: null,

    form: {
      kode: "",
      judul: "",
      kategori: "",
      upbjj: "",
      lokasiRak: "",
      harga: null,
      qty: null,
      safety: null,
      catatanHTML: ""
    },

    stok: [],
    stokAsli: [] // backup data awal
  },

  created() {
    this.stok = [
      {
          kode: "EKMA4116",
          judul: "Pengantar Manajemen",
          kategori: "MK Wajib",
          upbjj: "Jakarta",
          lokasiRak: "R1-A3",
          harga: 65000,
          qty: 28,
          safety: 20,
          catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
        },
        {
          kode: "EKMA4115",
          judul: "Pengantar Akuntansi",
          kategori: "MK Wajib",
          upbjj: "Jakarta",
          lokasiRak: "R1-A4",
          harga: 60000,
          qty: 7,
          safety: 15,
          catatanHTML: "<strong>Cover baru</strong>"
        },
        {
          kode: "BIOL4201",
          judul: "Biologi Umum (Praktikum)",
          kategori: "Praktikum",
          upbjj: "Surabaya",
          lokasiRak: "R3-B2",
          harga: 80000,
          qty: 12,
          safety: 10,
          catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
        },
        {
          kode: "FISIP4001",
          judul: "Dasar-Dasar Sosiologi",
          kategori: "MK Pilihan",
          upbjj: "Makassar",
          lokasiRak: "R2-C1",
          harga: 55000,
          qty: 2,
          safety: 8,
          catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
        }
    ];

    this.stokAsli = JSON.parse(JSON.stringify(this.stok));
  },

  computed: {
    filteredStok() {
      let data = [...this.stok];

      if (this.filterUpbjj) {
        data = data.filter(s => s.upbjj === this.filterUpbjj);
      }

      if (this.filterKategori) {
        data = data.filter(s => s.kategori === this.filterKategori);
      }

      if (this.warningOnly) {
        data = data.filter(s => s.qty <= s.safety);
      }

      if (this.sortBy === "judul") {
        data.sort((a, b) => a.judul.localeCompare(b.judul));
      }

      if (this.sortBy === "qty") {
        data.sort((a, b) => a.qty - b.qty);
      }

      if (this.sortBy === "harga") {
        data.sort((a, b) => a.harga - b.harga);
      }

      return data;
    }
  },

  methods: {

    // ✅ VALIDASI TAMBAH DATA
    tambahData() {
      if (
        !this.form.kode ||
        !this.form.judul ||
        !this.form.kategori ||
        !this.form.upbjj ||
        !this.form.lokasiRak ||
        this.form.harga === null ||
        this.form.qty === null ||
        this.form.safety === null
      ) {
        Swal.fire({
          icon: "warning",
          title: "Data belum lengkap!",
          text: "Silakan isi semua field terlebih dahulu"
        });
        return;
      }

      this.stok.push({ ...this.form });

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil ditambahkan"
      });

      this.resetForm();
    },

    editData(item) {

  this.isEdit = true;

  // cari index asli di array stok
  this.editIndex = this.stok.findIndex(
    s => s.kode === item.kode
  );

  // copy data ke form
  this.form = { ...item };

},
    updateData() {

  this.stok.splice(
    this.editIndex,
    1,
    { ...this.form }
  );

  Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: "Data berhasil diupdate"
  });

  this.resetForm();

},

    hapus(kode) {

  Swal.fire({
    title: "Yakin hapus?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus"
  })

  .then((result) => {

    if(result.isConfirmed){

      this.stok = this.stok.filter(
        item => item.kode !== kode
      );

      Swal.fire(
        "Terhapus!",
        "Data berhasil dihapus",
        "success"
      );

    }

  });

},

    resetForm() {
      this.form = {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: null,
        qty: null,
        safety: null,
        catatanHTML: ""
      };

      this.isEdit = false;
      this.editIndex = null;
    },

    // 🔥 RESET FILTER
    resetFilter() {
      this.stok = JSON.parse(JSON.stringify(this.stokAsli));
      this.filterUpbjj = "";
      this.filterKategori = "";
      this.sortBy = "";
      this.warningOnly = false;
      this.resetForm();
    },

    // 🔥 RESTORE DATA AWAL
    // restoreData() {
    //   this.stok = JSON.parse(JSON.stringify(this.stokAsli));

    //   Swal.fire({
    //     icon: "info",
    //     title: "Data dikembalikan",
    //     text: "Data stok sudah kembali ke awal"
    //   });
    // }
  }
});