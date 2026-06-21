import React, { useState } from 'react';

export default function DeleteAccount() {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const brandColor = '#FF8E42';
  const redColor = '#EF4444';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !confirmed) return;

    // Construct pre-filled email
    const subject = encodeURIComponent('Permintaan Penghapusan Akun Atur Uang');
    const body = encodeURIComponent(
      `Halo Tim Dukungan Atur Uang,\n\nSaya ingin mengajukan permohonan penghapusan akun beserta seluruh data terkait.\n\nDetail Akun:\n- Email: ${email}\n- Alasan: ${reason || 'Tidak disebutkan'}\n\nSaya mengerti bahwa setelah proses ini selesai, semua data saya akan dihapus secara permanen dan tidak dapat dipulihkan.\n\nTerima kasih.`
    );
    
    // Redirect to mailto link
    window.location.href = `mailto:adhitya.pan@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

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
        maxWidth: '550px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        padding: '32px',
        border: '1px solid #E2E8F0'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 12px',
            backgroundColor: `${redColor}15`,
            color: redColor,
            borderRadius: '99px',
            fontWeight: '600',
            fontSize: '13px',
            marginBottom: '12px'
          }}>
            Hapus Akun & Data
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#1E293B',
            margin: '0 0 8px 0'
          }}>
            Permohonan Penghapusan Akun
          </h1>
          <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
            Hapus akun Atur Uang Anda secara permanen beserta seluruh data terkait.
          </p>
        </div>

        <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', marginBottom: '24px' }}></div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#10B98115',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              margin: '0 auto 16px auto'
            }}>
              ✓
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>
              Permintaan Terkirim!
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>
              Kami telah membuka aplikasi email Anda untuk mengirim permintaan penghapusan akun untuk <strong>{email}</strong>. Tim kami akan memproses dan menghapus data Anda dalam waktu 24-48 jam setelah email terkirim.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              style={{
                backgroundColor: brandColor,
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Kembali
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Warning Alert */}
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FEE2E2',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px',
              color: '#991B1B',
              fontSize: '14px'
            }}>
              <strong>PENTING:</strong> Tindakan ini bersifat permanen. Seluruh data profil, rekening/dompet, serta riwayat transaksi keuangan Anda akan dihapus secara total dari database kami dan tidak dapat dipulihkan kembali.
            </div>

            {/* Email Input */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                Alamat Email Akun Anda *
              </label>
              <input
                type="email"
                required
                placeholder="Masukkan email yang terdaftar di Atur Uang"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Reason Input */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                Alasan Penghapusan (Opsional)
              </label>
              <textarea
                placeholder="Tulis alasan Anda menghapus akun..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{
                  width: '100%',
                  height: '80px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Confirmation Checkbox */}
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '24px' }}>
              <input
                type="checkbox"
                id="confirm"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                style={{ marginTop: '4px', marginRight: '10px', cursor: 'pointer' }}
              />
              <label htmlFor="confirm" style={{ fontSize: '13px', color: '#64748B', cursor: 'pointer', userSelect: 'none' }}>
                Saya mengerti dan menyetujui bahwa seluruh akun dan data terkait saya akan dihapus secara permanen tanpa opsi pemulihan.
              </label>
            </div>

            {/* Action Buttons */}
            <button
              type="submit"
              disabled={!email || !confirmed}
              style={{
                width: '100%',
                backgroundColor: (!email || !confirmed) ? '#E2E8F0' : redColor,
                color: (!email || !confirmed) ? '#94A3B8' : '#FFFFFF',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: (!email || !confirmed) ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                transition: 'background-color 0.2s'
              }}
            >
              Kirim Permintaan Penghapusan
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
