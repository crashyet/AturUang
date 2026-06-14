import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import actorImage from "../assets/image-17.png";
import history from "../assets/ix_history.png";
import report from "../assets/mdi_file-report.png";
import grafik from "../assets/grafik.png";
import ellipsbg from "../assets/ellipse-18.png";

export const HomeScreen = () => {
  const navigate = useNavigate();

  // Parse query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get("name") || "Owner";
  const businessName = queryParams.get("businessName") || "Patra Asri";
  const totalAssetVal = parseFloat(queryParams.get("totalAsset") || "10654258");
  const totalIncomeVal = parseFloat(queryParams.get("totalIncome") || "10654258");
  const totalExpenseVal = parseFloat(queryParams.get("totalExpense") || "10654258");

  let initialAccounts = [];
  try {
    const accountsParam = queryParams.get("accounts");
    if (accountsParam) {
      initialAccounts = JSON.parse(accountsParam);
    }
  } catch (e) {
    console.error("Error parsing accounts parameter:", e);
  }

  if (initialAccounts.length === 0) {
    initialAccounts = [
      { id: "tunai", name: "Tunai", balance: 10654258, income: 10654258, expense: 10654258, isVisible: true },
      { id: "bca", name: "Bank BCA", balance: 10654258, income: 10654258, expense: 10654258, isVisible: true },
      { id: "bni", name: "Bank BNI", balance: 10654258, income: 10654258, expense: 10654258, isVisible: true }
    ];
  }

  // State for visibility and values
  const [totalAssetVisible, setTotalAssetVisible] = useState(true);
  const [accounts, setAccounts] = useState(initialAccounts);

  // Sync accounts from query parameter on change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    try {
      const accParam = params.get("accounts");
      if (accParam) {
        const parsed = JSON.parse(accParam);
        if (parsed && parsed.length > 0) {
          setAccounts(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [window.location.search]);

  // Formatter for Rupiah currency
  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value).replace(/\s/g, '');
  };

  // Helper for message sending
  const handleNavigation = (path) => {
    if (window.FlutterNavigation) {
      window.FlutterNavigation.postMessage(path);
    } else if (window.parent) {
      window.parent.postMessage(path, "*");
    } else {
      console.log("Navigation triggered:", path);
    }
  };

  const toggleBalanceVisibility = (cardId) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === cardId ? { ...acc, isVisible: !acc.isVisible } : acc
      )
    );
    handleNavigation(`toggle_visibility:${cardId}`);
  };

  return (
    <main
      className="relative w-full max-w-[430px] h-full bg-[#f9f9f9] overflow-y-auto no-scrollbar pb-10 select-none flex flex-col font-montserrat"
      data-id="home-screen"
    >
      {/* 2. Header Section */}
      <header className="relative w-full h-[52px] px-[29px] flex items-center justify-between mt-3 flex-shrink-0 z-30">
        {/* Profile Button */}
        <button
          type="button"
          onClick={() => handleNavigation('navigate_to_profile')}
          aria-label="Buka profil"
          className="w-[52px] h-[52px] flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <svg className="w-6 h-6 text-toska" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </button>

        {/* Center Labels */}
        <div className="flex flex-col items-center justify-center">
          <p className="font-medium text-[#696969] text-[14px] leading-tight">
            Halo, {name}
          </p>
          <h1 className="font-bold text-[#000000] text-[16px] leading-tight font-montserrat">
            {businessName}
          </h1>
        </div>

        {/* Bell/Notification Button */}
        <button
          type="button"
          onClick={() => handleNavigation('navigate_to_notification')}
          aria-label="Lihat notifikasi"
          className="w-[52px] h-[52px] flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 relative hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <svg className="w-6 h-6 text-toska" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9z" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {/* Notification Dot */}
          <span className="absolute top-[14px] right-[14px] w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white" />
        </button>
      </header>

      <section aria-label="Ringkasan total aset" className="px-[21px] mt-6 flex-shrink-0 z-20 w-full">
        {/* Assets Gradient Card */}
        <div className="w-full max-w-[388px] h-[160px] rounded-[25px] bg-gradient-to-b from-[#66D8D8] via-[#3B9E9E] to-[#2B8282] relative overflow-hidden shadow-lg p-6 flex flex-col justify-between select-none mx-auto">
          {/* Ellipse background glow */}
          <div className="absolute top-[-50px] right-[-30px] w-[132px] h-[132px] bg-[#f5b95f]/34 rounded-full filter blur-[20px] pointer-events-none" />
          
          {/* Decorative curves SVGs - Circular rings matching Figma */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 388 160" fill="none">
            {/* Bottom Right Thick Dark Circle */}
            <circle cx="390" cy="150" r="85" stroke="rgba(33, 115, 115, 0.35)" strokeWidth="24" />
            {/* Top Right Light Yellowish-Green Circle */}
            <circle cx="350" cy="15" r="45" stroke="rgba(168, 230, 219, 0.25)" strokeWidth="14" />
          </svg>

          {/* Card Content */}
          <div className="relative z-10">
            <h2 className="font-bold text-[18px] text-white tracking-wide">
              Total Aset
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="font-bold text-[28px] text-white tracking-tight">
                {totalAssetVisible ? formatRupiah(totalAssetVal) : "Rp••.•••.•••"}
              </span>
              <button
                type="button"
                onClick={() => setTotalAssetVisible(!totalAssetVisible)}
                className="text-white opacity-85 hover:opacity-100 transition-all cursor-pointer p-1"
                aria-label={totalAssetVisible ? "Sembunyikan total aset" : "Tampilkan total aset"}
              >
                {totalAssetVisible ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Side-by-side Pemasukan & Pengeluaran summary cards - overlapping bottom of total asset card */}
        <div className="w-full max-w-[356px] h-[55px] mx-auto -mt-[28px] flex justify-between gap-[12px] px-2 relative z-25">
          {/* Pemasukan Summary Card */}
          <div className="flex-1 min-w-[140px] h-[55px] bg-white border border-[#9c9c9c] rounded-[14px] flex items-center pl-2.5 gap-2 shadow-sm">
            <div className="w-[28px] h-[28px] bg-[#d9d9d9] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[#02b399]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-black text-[13px] leading-tight font-montserrat">
                {totalAssetVisible ? formatRupiah(totalIncomeVal) : "Rp••.•••.•••"}
              </span>
              <span className="text-black text-[12px] leading-none font-open-sans">
                Pemasukan
              </span>
            </div>
          </div>

          {/* Pengeluaran Summary Card */}
          <div className="flex-1 min-w-[140px] h-[55px] bg-white border border-[#9c9c9c] rounded-[14px] flex items-center pl-2.5 gap-2 shadow-sm">
            <div className="w-[28px] h-[28px] bg-[#d9d9d9] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[#e5423b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-black text-[13px] leading-tight font-montserrat">
                {totalAssetVisible ? formatRupiah(totalExpenseVal) : "Rp••.•••.•••"}
              </span>
              <span className="text-black text-[12px] leading-none font-open-sans">
                Pengeluaran
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Accounts Carousel Header */}
      <section aria-labelledby="kas-dan-aset-kamu" className="px-[29px] mt-8 flex items-center justify-between flex-shrink-0 z-20">
        <h2 id="kas-dan-aset-kamu" className="font-semibold text-[#414040] text-[16px] leading-none font-montserrat">
          Kas dan Aset Kamu
        </h2>
        <button
          type="button"
          onClick={() => handleNavigation('navigate_to_jenis_dana')}
          aria-label="Lihat semua akun"
          className="flex items-center gap-[5px] hover:opacity-80 transition-all cursor-pointer"
        >
          <span className="font-semibold text-[#1f5ba3] text-[12px] leading-none">
            Liat Semua Akun
          </span>
          <svg className="w-[7px] h-3.5 text-[#1f5ba3]" fill="currentColor" viewBox="0 0 7 14">
            <path d="M1 1.5 L5.5 7 L1 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
      </section>

      {/* 5. Account Cards Carousel */}
      <div 
        aria-label="Kartu saldo akun" 
        className="w-full h-44 flex items-center overflow-x-auto no-scrollbar gap-[15px] px-[29px] mt-4 flex-shrink-0 z-10"
      >
        {accounts.map((card) => {
          const isVisible = card.isVisible;
          const displayedBalance = isVisible ? formatRupiah(card.balance) : "Rp••.•••.•••";

          return (
            <article
              key={card.id}
              className="w-[338px] h-[158px] shrink-0 bg-gradient-to-r from-[#2ba697] via-[#1eaea0] to-[#175448] p-[1.5px] rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] relative"
            >
              <div className="w-full h-full bg-white rounded-[15px] p-[21px] flex flex-col justify-between">
                {/* Header & Balance */}
                <div>
                  <h3 className="font-semibold text-black text-[16px] leading-none font-montserrat">
                    {card.name}
                  </h3>
                  <div className="flex items-center gap-[11px] mt-3">
                    <span className="font-bold text-black text-[24px] leading-none tracking-tight">
                      {displayedBalance}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleBalanceVisibility(card.id)}
                      className="text-black/70 hover:text-black transition-all cursor-pointer p-0.5"
                      aria-label={isVisible ? `Sembunyikan saldo ${card.name}` : `Tampilkan saldo ${card.name}`}
                    >
                      {isVisible ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Micro Sub-cards */}
                <div className="flex gap-[16px] mt-4">
                  {/* Sub Pemasukan */}
                  <div className="w-[149px] h-[45px] bg-[#ffffff] border border-[#d9d9d9] rounded-[10px] flex items-center pl-2.5 gap-2 shadow-sm">
                    <div className="w-[27px] h-[27px] bg-[#d9d9d9] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#02b399]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-semibold text-black text-[13px] leading-tight font-montserrat">
                        {isVisible ? formatRupiah(card.income) : "Rp••.•••.•••"}
                      </span>
                      <span className="text-black text-[11px] leading-none font-open-sans">
                        Pemasukan
                      </span>
                    </div>
                  </div>

                  {/* Sub Pengeluaran */}
                  <div className="w-[149px] h-[45px] bg-[#ffffff] border border-[#d9d9d9] rounded-[10px] flex items-center pl-2.5 gap-2 shadow-sm">
                    <div className="w-[27px] h-[27px] bg-[#d9d9d9] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#e5423b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-semibold text-black text-[13px] leading-tight font-montserrat">
                        {isVisible ? formatRupiah(card.expense) : "Rp••.•••.•••"}
                      </span>
                      <span className="text-black text-[11px] leading-none font-open-sans">
                        Pengeluaran
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* 6. Quick Action Shortcuts Section */}
      <section 
        aria-label="Shortcut aksi cepat" 
        className="w-full px-[44px] mt-8 flex justify-between flex-shrink-0 z-20"
      >
        {/* Laporan */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => handleNavigation('navigate_to_laporan')}
            className="w-[70px] h-[70px] bg-[#f5b95f] rounded-[20px] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Buka laporan"
          >
            <img src={report} alt="report" />
          </button>
          <span className="font-semibold text-black text-[12px] font-montserrat">
            Laporan
          </span>
        </div>

        {/* Analisa */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => handleNavigation('navigate_to_analisa')}
            className="w-[70px] h-[70px] bg-[#f5b95f] rounded-[20px] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Buka analisa"
          >
            <img src={grafik} alt="grafik" />
          </button>
          <span className="font-semibold text-black text-[12px] font-montserrat">
            Analisa
          </span>
        </div>

        {/* Riwayat */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => handleNavigation('navigate_to_riwayat')}
            className="w-[70px] h-[70px] bg-[#f5b95f] rounded-[20px] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Buka riwayat"
          >
            <img src={history} alt="history" />
          </button>
          <span className="font-semibold text-black text-[12px] font-montserrat">
            Riwayat
          </span>
        </div>
      </section>

      {/* 7. Transaction Reminder Card */}
      <section 
        aria-label="Pengingat transaksi" 
        className="px-[22px] mt-8 flex-shrink-0 z-20 w-full"
      >
        <div className="w-full max-w-[386px] h-[360px] bg-white rounded-[26px] shadow-md relative overflow-hidden p-6 select-none border border-gray-100 flex flex-col justify-start mx-auto">
          {/* Top text content group to keep title & desc together */}
          <div className="flex flex-col z-20 relative">
            <div className="flex justify-between items-start gap-4">
              <h3 className="font-semibold text-black text-[16px] leading-[20px] font-montserrat w-[197px]">
                Transaksi hari ini belum dicatat?
              </h3>
              <button
                type="button"
                onClick={() => handleNavigation('navigate_to_catat')}
                className="w-[136px] h-[40px] bg-gradient-to-r from-[#37A1A1] to-[#143B3B] text-white font-bold text-[14px] rounded-full flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Catat sekarang
              </button>
            </div>

            {/* Subtitle description */}
            <p className="font-medium text-[#6b7073] text-[14px] leading-[20px] font-montserrat mt-3 w-full max-w-[338px]">
              Jangan sampai ada bon yang hilang. Pembukuan rapi, pantau untung jadi mudah!
            </p>
          </div>

          <img src={ellipsbg} alt="ellipsbg" className="absolute -bottom-10 left-0 object-contain z-10 pointer-events-none" />

          {/* Character Image */}
          <img
            className="absolute -bottom-10 left-[calc(50%-108px)] w-[216px] h-[288px] object-contain z-10 pointer-events-none"
            alt="3D Character Illustration"
            src={actorImage}
          />
        </div>
      </section>

      {/* 8. Bottom Navigation Action */}
      <div className="sticky bottom-0 w-full flex justify-center -mb-30 px-6 flex-shrink-0 z-30">
        <button
          type="button"
          onClick={() => handleNavigation('navigate_to_catat')}
          aria-label="Catat transaksi"
          className="w-2/3 h-[60px] bg-gradient-to-r from-[#2ba697] via-[#1eaea0] to-[#175448] p-[2px] rounded-full shadow-lg hover:scale-102 active:scale-98 transition-all cursor-pointer"
        >
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <span className="text-black text-lg font-semibold font-montserrat">
              Catat Transaksi
            </span>
          </div>
        </button>
      </div>
    </main>
  );
};