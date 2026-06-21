import React from 'react';

export default function PrivacyPolicy() {
  const brandColor = '#FF8E42';
  const tealColor = '#0F9F90';

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      color: '#334155',
      backgroundColor: '#FAFAFA',
      height: '100%',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      padding: '40px 20px',
      lineHeight: '1.6'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        padding: '40px',
        border: '1px solid #E2E8F0'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: `${brandColor}15`,
            color: brandColor,
            borderRadius: '99px',
            fontWeight: '600',
            fontSize: '14px',
            marginBottom: '12px'
          }}>
            Kebijakan Privasi
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#1E293B',
            margin: '0 0 8px 0'
          }}>
            Kebijakan Privasi Atur Uang
          </h1>
          <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
            Terakhir Diperbarui: 22 Mei 2026
          </p>
        </div>

        <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', marginBottom: '32px' }}></div>

        {/* Content Sections */}
        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '12px' }}>
            1. Pendahuluan
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
            Selamat datang di <strong>Atur Uang</strong>. Kami berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat menggunakan aplikasi mobile dan layanan web Atur Uang.
          </p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '12px' }}>
            2. Informasi yang Kami Kumpulkan
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', marginBottom: '12px' }}>
            Untuk memberikan layanan pencatatan keuangan terbaik, kami mengumpulkan beberapa jenis informasi dari Anda:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '15px', color: '#475569', margin: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Informasi Akun:</strong> Nama Lengkap, Alamat Email, Nomor Telepon, Nama Bisnis/UMKM, dan password yang dienkripsi.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Data Transaksi:</strong> Nominal uang, tipe transaksi (pemasukan atau pengeluaran), kategori transaksi, catatan opsional, dan tanggal pencatatan yang Anda masukkan secara manual.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Data Rekening/Dompet:</strong> Nama akun dana (misalnya: BNI, Tunai, BRI) serta saldo awal yang Anda buat.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '12px' }}>
            3. Cara Kami Menggunakan Informasi Anda
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', marginBottom: '12px' }}>
            Informasi yang kami kumpulkan digunakan secara eksklusif untuk:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '15px', color: '#475569', margin: 0 }}>
            <li style={{ marginBottom: '8px' }}>Menyediakan fungsionalitas pencatatan keuangan dan laporan laba-rugi secara real-time.</li>
            <li style={{ marginBottom: '8px' }}>Menampilkan analisis grafik/chart pemasukan dan pengeluaran per bulan.</li>
            <li style={{ marginBottom: '8px' }}>Mengirimkan kode OTP untuk verifikasi akun dan reset password.</li>
            <li style={{ marginBottom: '8px' }}>Meningkatkan kinerja aplikasi dan memperbaiki bug layanan.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '12px' }}>
            4. Keamanan dan Perlindungan Data
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
            Kami sangat memprioritaskan keamanan data Anda. Seluruh komunikasi data antara aplikasi Anda dan server kami dienkripsi menggunakan protokol aman HTTPS. Password Anda disimpan menggunakan enkripsi satu arah (hash). Kami <strong>tidak pernah menjual, menyewakan, atau membagikan</strong> informasi pribadi maupun data transaksi keuangan Anda kepada pihak ketiga mana pun.
          </p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '12px' }}>
            5. Hak Pengguna atas Data
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
            Anda memiliki hak penuh untuk mengubah nama, email, nama bisnis, serta mengedit atau menghapus seluruh catatan transaksi keuangan Anda kapan saja langsung melalui fitur edit profil dan riwayat transaksi di dalam aplikasi.
          </p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '12px' }}>
            6. Hubungi Kami
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', marginBottom: '12px' }}>
            Apabila Anda memiliki pertanyaan, saran, atau keluhan terkait dengan Kebijakan Privasi ini, Anda dapat menghubungi kami melalui:
          </p>
          <div style={{
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            color: '#475569'
          }}>
            <div><strong>Email:</strong> support@aturuang.eyi.my.id</div>
          </div>
        </section>

        <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', marginTop: '42px', marginBottom: '24px' }}></div>

        {/* Footer */}
        <div style={{ textAlign: 'center', fontSize: '13px', color: '#94A3B8' }}>
          &copy; {new Date().getFullYear()} Atur Uang. Hak Cipta Dilindungi Undang-Undang.
        </div>
      </div>
    </div>
  );
}
