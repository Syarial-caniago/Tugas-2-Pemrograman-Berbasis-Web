new Vue({

  el: '#trackingApp',

  data: {

    pengirimanList: [
      { kode: "REG", nama: "JNE Regular" },
      { kode: "EXP", nama: "JNE Express" }
    ],

    paket: [
      {
        kode: "PAKET-UT-001",
        nama: "PAKET IPS Dasar",
        isi: ["EKMA4116","EKMA4115"],
        harga: 120000
      },

      {
        kode: "PAKET-UT-002",
        nama: "PAKET IPA Dasar",
        isi: ["BIOL4201","FISIP4001"],
        harga: 140000
      }
    ],

    tracking: {

      "DO2025-0001": {

        nim: "123456789",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "PAKET-UT-001",
        total: 120000,

        perjalanan: [

          {
            waktu: "2025-08-25 10:12:20",
            keterangan: "Penerimaan di Loket"
          },

          {
            waktu: "2025-08-25 14:07:56",
            keterangan: "Tiba di Hub"
          }

        ]

      }

    },

    form: {
      nim: "",
      nama: "",
      ekspedisi: "",
      tanggalKirim: ""
    },

    selectedPaketKode: ""

  },

  computed: {

    nomorDO(){

      let total = Object.keys(this.tracking).length + 1;

      return "DO2026-" +
      String(total).padStart(3,'0');

    },

    selectedPaket(){

      return this.paket.find(
        p => p.kode == this.selectedPaketKode
      );

    }

  },

  methods: {

    tambahDO(){

  if(
    this.form.nim == "" ||
    this.form.nama == "" ||
    this.form.ekspedisi == "" ||
    this.selectedPaketKode == ""
  ){

    Swal.fire({
      icon: 'warning',
      title: 'Data Belum Lengkap',
      text: 'Lengkapi data terlebih dahulu',
      confirmButtonColor: '#6366f1'
    });

    return;
  }

  this.$set(this.tracking, this.nomorDO, {

    nim: this.form.nim,
    nama: this.form.nama,
    status: "Diproses",
    ekspedisi: this.form.ekspedisi,
    tanggalKirim: this.form.tanggalKirim,
    paket: this.selectedPaket.kode,
    total: this.selectedPaket.harga,

    perjalanan: [
      {
        waktu: new Date().toLocaleString(),
        keterangan: "Pesanan dibuat"
      }
    ]

  });

  Swal.fire({
    icon: 'success',
    title: 'Berhasil',
    text: 'Delivery Order berhasil dibuat',
    confirmButtonColor: '#6366f1',
    timer: 2000,
    showConfirmButton: true
  });

  this.form = {
    nim: "",
    nama: "",
    ekspedisi: "",
    tanggalKirim: ""
  };

  this.selectedPaketKode = "";

    }

  },

  watch: {

    selectedPaketKode(newValue){
      console.log("Paket dipilih:", newValue);
    },

    'form.ekspedisi'(newValue){
      console.log("Ekspedisi:", newValue);
    }

  }

});