import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ellipse28 from "../assets/ellipse-28.png";
import ellipse29 from "../assets/ellipse-29.png";
import ellipse31 from "../assets/ellipse-31.png";
import logo from "../assets/logo_apps.png";

const imageDecorations = [
  {
    src: ellipse28,
    alt: "",
    className: "absolute top-[401px] left-[282px] w-7 h-7",
  },
  {
    src: ellipse29,
    alt: "",
    className: "absolute top-[280px] left-0 w-[42px] h-[42px]",
  },
  {
    src: ellipse31,
    alt: "",
    className: "absolute top-[22px] left-6 w-[37px] h-[37px]",
  },
];

const shapeDecorations = [
  {
    className:
      "absolute top-[308px] left-[209px] w-[27px] h-[27px] bg-toska rounded-[13.5px] opacity-20",
  },
  {
    className:
      "absolute top-0 left-[277px] w-[22px] h-[22px] bg-yellow rounded-[11px] shadow-[0px_1px_4px_#00000040] opacity-20",
  },
  {
    className:
      "absolute top-[116px] left-32 w-[22px] h-[22px] bg-yellow rounded-[11px] shadow-[0px_1px_4px_#00000040] opacity-20",
  },
  {
    className:
      "absolute top-[183px] left-[310px] w-[22px] h-[22px] bg-toska rounded-[11px] opacity-20",
  },
  {
    className:
      "absolute top-[442px] left-[75px] w-[29px] h-[29px] bg-yellow rounded-[14.5px] shadow-[0px_1px_4px_#00000040] opacity-20",
  },
];

const arcLayers = [
  {
    className:
      "absolute top-0 left-[calc(50.00%_-_268px)] w-[535px] h-[453px] bg-[#37a1a11a] rounded-[267.5px/226.5px]",
  },
  {
    className:
      "absolute top-[79px] left-[calc(50.00%_-_268px)] w-[535px] h-[453px] bg-[#37a1a133] rounded-[267.5px/226.5px]",
  },
  {
    className:
      "absolute top-[172px] left-[calc(50.00%_-_268px)] w-[535px] h-[453px] bg-[#37a1a166] rounded-[267.5px/226.5px]",
  },
  {
    className:
      "absolute top-[245px] left-[calc(50.00%_-_268px)] w-[535px] h-[453px] bg-[#37a1a1] rounded-[267.5px/226.5px]",
  },
];

const splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/page1');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <main className="relative w-full h-screen bg-collection-1-color overflow-hidden">
      <section
        aria-hidden="true"
        className="absolute top-[529px] left-[calc(50.00%_-_268px)] w-[535px] h-[698px]"
      >
        {arcLayers.map((layer, index) => (
          <div key={index} className={layer.className} />
        ))}
      </section>
      <section
        aria-hidden="true"
        className="absolute top-[37px] left-[53px] w-[332px] h-[471px]"
      >
        {imageDecorations.map((item, index) => (
          <img
            key={index}
            className={item.className}
            alt={item.alt}
            src={item.src}
          />
        ))}

        {shapeDecorations.map((item, index) => (
          <div key={index} className={item.className} />
        ))}
      </section>
      <div className="flex flex-col absolute top-[200px] left-[calc(50.00%_-_168px)] w-[335px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#000000] text-[32px] text-center tracking-[0] leading-[37.3px]">
        <img src={logo} alt="" className="w-[166px] mx-auto" />
      </div>
    </main>
  );
};

export default splash
