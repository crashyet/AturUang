import { AccountBalanceCardsSection } from "./AccountBalanceCardsSection";
import image from "./image.svg";
import { QuickActionShortcutsSection } from "./QuickActionShortcutsSection";
import statusBar from "./status-bar.svg";
import { TotalAssetOverviewSection } from "./TotalAssetOverviewSection";
import { TransactionReminderSection } from "./TransactionReminderSection";
import vector from "./vector.svg";
import vector5 from "./vector-5.svg";

export const HomeScreen = () => {
  return (
    <main
      className="relative w-[430px] h-[1218px] bg-[#f9f9f9] overflow-hidden"
      data-id="home-screen"
    >
      <img
        className="absolute top-0 left-0 w-[430px] h-[1218px] pointer-events-none select-none"
        alt="Status bar"
        src={statusBar}
      />
      <header className="absolute top-[76px] left-0 w-full h-[52px]">
        <button
          type="button"
          aria-label="Buka profil"
          className="absolute top-0 left-[29px] w-[52px] h-[52px] flex items-center justify-center bg-[#ffffff] rounded-[26px]"
        >
          <span className="w-6 h-6 flex items-center justify-center relative aspect-[1]">
            <img
              className="w-[18px] h-auto"
              alt=""
              src={image}
              aria-hidden="true"
            />
          </span>
        </button>
        <div className="absolute top-[6px] left-[calc(50.00%_-_44px)] w-[92px] h-10 flex flex-col items-center gap-[3px]">
          <p className="-ml-1 h-[17px] w-[88px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#696969] text-sm tracking-[0] leading-[normal]">
            Halo, Owner
          </p>
          <h1 className="-ml-1 h-5 w-[82px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#000000] text-base text-center tracking-[0] leading-[normal]">
            Patra Asri
          </h1>
        </div>
        <button
          type="button"
          aria-label="Lihat notifikasi"
          className="absolute top-0 left-[349px] w-[52px] h-[52px] flex items-center justify-center bg-white rounded-[26px]"
        >
          <span className="w-6 h-6 relative aspect-[1]">
            <img
              className="absolute w-[87.50%] h-[91.67%] top-[8.33%] left-[12.50%]"
              alt=""
              src={vector}
              aria-hidden="true"
            />
            <span
              className="absolute w-[33.33%] h-[33.33%] top-0 left-[58.33%] bg-[#ff0000] rounded-full"
              aria-hidden="true"
            />
          </span>
        </button>
      </header>
      <section
        aria-label="Ringkasan total aset"
        className="absolute top-[148px] left-0 w-full"
      >
        <TotalAssetOverviewSection />
      </section>
      <section
        className="absolute top-[383px] left-0 w-full"
        aria-labelledby="kas-dan-aset-kamu"
      >
        <div className="absolute top-0 left-[calc(50.00%_-_186px)] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#414040] text-base tracking-[0] leading-[normal]">
          <h2 id="kas-dan-aset-kamu">Kas dan Aset Kamu</h2>
        </div>
        <button
          type="button"
          aria-label="Lihat semua akun"
          className="inline-flex items-center gap-[5px] absolute top-[2px] left-[291px]"
        >
          <span className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#1f5ba3] text-xs tracking-[0] leading-[normal]">
            Liat Semua Akun
          </span>
          <span className="relative w-[7px] h-3.5 aspect-[0.5]">
            <img
              className="absolute w-[74.28%] h-[76.53%] top-[23.47%] left-[25.72%]"
              alt=""
              src={vector5}
              aria-hidden="true"
            />
          </span>
        </button>
      </section>
      <section
        aria-label="Kartu saldo akun"
        className="absolute top-[430px] left-0 w-full"
      >
        <AccountBalanceCardsSection />
      </section>
      <section
        aria-label="Shortcut aksi cepat"
        className="absolute top-[650px] left-0 w-full"
      >
        <QuickActionShortcutsSection />
      </section>
      <section
        aria-label="Pengingat transaksi"
        className="absolute top-[767px] left-0 w-full"
      >
        <TransactionReminderSection />
      </section>
      <div className="absolute top-[1070px] left-[calc(50.00%_-_144px)]">
        <button
          type="button"
          aria-label="Catat transaksi"
          className="relative flex w-[300px] h-[60px] items-center justify-center gap-2.5 px-[52px] py-[18px] bg-[#ffffff] rounded-[999px] border-[none] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[999px] before:[background:linear-gradient(166deg,rgba(44,166,151,1)_0%,rgba(30,175,158,1)_50%,rgba(23,84,72,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none"
        >
          <span className="mt-[-1.00px] text-[#000000] text-xl whitespace-nowrap relative w-fit [font-family:'Montserrat-Bold',Helvetica] font-bold tracking-[0] leading-[normal]">
            Catat Transaksi
          </span>
        </button>
      </div>
    </main>
  );
};