import ellipse31 from "../assets/ellipse-311.png";
import ellipse32 from "../assets/ellipse-32.png";
import ellipse33 from "../assets/ellipse-33.png";
import group57 from "../assets/3d_actor.png";
import TypcnArrowUp from "../assets/TypcnArrowUp.png";
import { useNavigate } from "react-router-dom";

const indicatorDots = [
  { id: 1, className: "w-2.5 h-2.5 bg-[#f5b95f80] rounded-[5px]" },
  { id: 2, className: "w-9 h-2.5 bg-collection-1-2 rounded-[999px]" },
  { id: 3, className: "w-2.5 h-2.5 bg-[#f5b95f80] rounded-[5px]" },
];

const decorativeEllipses = [
  {
    id: 1,
    src: ellipse31,
    alt: "",
    className: "absolute top-0 left-[39px] w-[45px] h-[45px]",
  },
  {
    id: 2,
    src: ellipse33,
    alt: "",
    className: "absolute top-[152px] left-[325px] w-[45px] h-[45px]",
  },
  {
    id: 3,
    src: ellipse32,
    alt: "",
    className: "absolute top-[43px] left-[298px] w-[31px] h-[30px]",
  },
];

const page2 = () => {
  const navigate = useNavigate();
  return (
    <main
      className="relative w-full h-screen bg-toska overflow-hidden"
      aria-label="Informasi aplikasi"
    >
      <div
        className="absolute top-[-323px] left-[calc(50.00%_-_67px)] w-[535px] h-[698px] rotate-[-153.36deg]"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-[calc(50.00%_-_267px)] w-[535px] h-[453px] bg-[#6dd0d01a] rounded-[267.5px/226.5px]" />
        <div className="absolute top-[172px] left-[calc(50.00%_-_267px)] w-[535px] h-[453px] bg-[#6dd0d066] rounded-[267.5px/226.5px]" />
        <div className="absolute top-[79px] left-[calc(50.00%_-_267px)] w-[535px] h-[453px] bg-[#6dd0d033] rounded-[267.5px/226.5px]" />
        <div className="absolute top-[245px] left-[calc(50.00%_-_267px)] w-[535px] h-[453px] bg-[#6cd0d0] rounded-[267.5px/226.5px]" />
      </div>
      <div
        className="absolute top-[74px] left-[39px] w-[370px] h-[293px] opacity-80"
        aria-hidden="true"
      >
        <div className="absolute top-[251px] left-0 w-[42px] h-[42px] bg-yellow rounded-[21px] opacity-30" />
        {decorativeEllipses.map((ellipse) => (
          <img
            key={ellipse.id}
            className={ellipse.className}
            alt={ellipse.alt}
            src={ellipse.src}
          />
        ))}
      </div>
      <img
        className="absolute top-[53px] left-0 w-full h-[465px]"
        alt=""
        src={group57}
        aria-hidden="true"
      />
      <section
        className="absolute top-[492px] left-0 w-full h-[440px] bg-white rounded-[24px_24px_0px_0px]"
        aria-labelledby="informasi-title"
      />
      <div
        className="absolute top-[518px] left-1/2 -translate-x-1/2 w-[68px] h-2.5 flex gap-1.5"
        aria-label="Indikator halaman"
      >
        {indicatorDots.map((dot) => (
          <div key={dot.id} className={dot.className} />
        ))}
      </div>
      <h1
        id="informasi-title"
        className="absolute top-[578px] left-[calc(50.00%_-_168px)] w-[335px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#000000] text-4xl text-center tracking-[0] leading-[42.0px]"
      >
        Satu Aplikasi, Dua Fungsi
      </h1>
      <p className="absolute top-[685px] left-[calc(50.00%_-_147px)] w-[293px] opacity-80 [font-family:'Poppins-Medium',Helvetica] font-medium text-[#7a7a7a] text-base text-center tracking-[0] leading-[normal]">
        Kelola dompet bisnis dan uang jajan harian di tempat terpisah.
      </p>
      <button
        onClick={() => navigate("/page3")}
        type="button"
        aria-label="Lanjut"
        className="absolute top-[790px] left-[calc(50.00%_-_40px)] w-20 h-20 flex bg-[#fd9546] rounded-[40px] shadow-[0px_21px_28.8px_#ff8d2833,inset_0px_0px_7.1px_#ff8d28] items-center justify-center cursor-pointer"
      >
        <img src={TypcnArrowUp} alt="" />
      </button>
    </main>
  );
};

export default page2;
