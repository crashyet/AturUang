import { React, useState } from "react";
import ellipse31 from "../assets/ellipse-311.png";
import ellipse32 from "../assets/ellipse-32.png";
import ellipse33 from "../assets/ellipse-33.png";
import group21 from "../assets/group-21.png";
import TypcnArrowUp from "../assets/TypcnArrowUp.png";
import { useNavigate } from "react-router-dom";

const page1 = () => {
  const navigate = useNavigate();
  const [currentSlide] = useState(0);

  const indicators = [
    { id: 0, active: true },
    { id: 1, active: false },
    { id: 2, active: false },
  ];

  const decorativeEllipses = [
    {
      id: "ellipse-31",
      src: ellipse31,
      alt: "",
      className: "absolute top-0 left-[39px] w-[45px] h-[45px]",
    },
    {
      id: "ellipse-33",
      src: ellipse33,
      alt: "",
      className: "absolute top-[152px] left-[325px] w-[45px] h-[45px]",
    },
    {
      id: "ellipse-32",
      src: ellipse32,
      alt: "",
      className: "absolute top-[43px] left-[298px] w-[31px] h-[30px]",
    },
  ];

  return (
    <main
      className="relative flex flex-col justify-between w-full h-screen bg-toska overflow-hidden"
      aria-label="Halaman informasi pembuka aplikasi"
    >
      {/* Decorative background shapes */}
      <div
        className="absolute top-[-323px] left-[calc(50.00%_-_67px)] w-[535px] h-[698px] rotate-[-153.36deg] z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-px left-[calc(50.00%_-_267px)] w-[535px] h-[453px] bg-[#6dd0d01a] rounded-[267.5px/226.5px]" />
        <div className="absolute top-[172px] left-[calc(50.00%_-_267px)] w-[535px] h-[453px] bg-[#6dd0d066] rounded-[267.5px/226.5px]" />
        <div className="absolute top-[79px] left-[calc(50.00%_-_267px)] w-[535px] h-[453px] bg-[#6dd0d033] rounded-[267.5px/226.5px]" />
        <div className="absolute top-[245px] left-[calc(50.00%_-_267px)] w-[535px] h-[453px] bg-[#6cd0d0] rounded-[267.5px/226.5px]" />
      </div>
      
      <div
        className="absolute top-[74px] left-[39px] w-[370px] h-[293px] opacity-80 z-0 pointer-events-none"
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

      {/* Top illustration container */}
      <div className="relative flex-grow flex items-end justify-center z-10 w-full min-h-[35vh] px-6 pt-12">
        <img
          className="w-auto h-[48vh] max-h-[380px] object-contain mb-[-3vh]"
          alt="Ilustrasi tampilan aplikasi keuangan"
          src={group21}
        />
      </div>

      <div className="absolute z-10 bottom-[25vh] left-0 w-full h-[25vh] bg-gradient-to-b from-transparent to-[#37A1A1]"></div>

      {/* Bottom white card container */}
      <section
        className="relative bg-white rounded-t-[24px] flex flex-col items-center w-full px-6 pt-6 pb-10 z-20 flex-shrink-0"
        aria-label="Konten pengenalan aplikasi"
      >
        {/* Indicators */}
        <div
          className="w-[68px] h-2.5 flex gap-1.5 mb-6"
          role="tablist"
          aria-label="Indikator slide onboarding"
        >
          {indicators.map((indicator) => (
            <button
              key={indicator.id}
              type="button"
              role="tab"
              aria-selected={currentSlide === indicator.id}
              aria-label={`Slide ${indicator.id + 1}`}
              className={
                indicator.active
                  ? "w-9 h-2.5 bg-collection-1-2 rounded-[999px]"
                  : "w-2.5 h-2.5 bg-[#f5b95f80] rounded-[5px]"
              }
            />
          ))}
        </div>

        {/* Title */}
        <h1 className="w-full [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#000000] text-3xl md:text-4xl text-center tracking-[0] leading-tight mb-4">
          Selamat Datang Di Atur Uang
        </h1>

        {/* Subtitle */}
        <p className="w-full max-w-[450px] opacity-80 [font-family:'Poppins-Medium',Helvetica] font-medium text-[#7a7a7a] text-sm md:text-base text-center tracking-[0] leading-normal mb-8">
          Yuk mulai kelola keuanganmu dengan lebih bijak dan teratur dari sekarang.
        </p>

        {/* Next Button */}
        <button
          onClick={() => navigate("/page2")}
          type="button"
          aria-label="Lanjut ke langkah berikutnya"
          className="w-16 h-16 md:w-20 md:h-20 flex bg-[#fd9546] rounded-full shadow-[0px_12px_20px_#ff8d2833,inset_0px_0px_7.1px_#ff8d28] items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <img src={TypcnArrowUp} alt="" className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </section>
    </main>
  );
};

export default page1