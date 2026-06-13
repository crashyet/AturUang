import { useId, useState } from "react";
import ellipse28 from "../assets/ellipse-28.png";
import ellipse29 from "../assets/ellipse-29.png";
import ellipse31 from "../assets/ellipse-31.png";
import group26 from "../assets/card_credit.png";
import { useNavigate } from "react-router-dom";

const page3 = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("business");
  const [showAlert, setShowAlert] = useState(false);
  const formId = useId();

  const options = [
    {
      id: "individual",
      value: "individual",
      label: "Individu",
      topClass: "top-[759px]",
      isFilled: false,
      textClass: "text-[#fd9546]",
      extraTextClass: "",
    },
    {
      id: "business",
      value: "business",
      label: "UMKM/Bisnis",
      topClass: "top-[821px]",
      isFilled: true,
      textClass: "text-white",
      extraTextClass: "ml-[-2.00px] mr-[-2.00px]",
    },
  ];

  const pagerDots = [
    {
      widthClass: "w-2.5",
      bgClass: "bg-[#f5b95f80]",
      roundedClass: "rounded-[5px]",
    },
    {
      widthClass: "w-2.5",
      bgClass: "bg-[#f5b95f80]",
      roundedClass: "rounded-[5px]",
    },
    {
      widthClass: "w-9",
      bgClass: "bg-collection-1-2",
      roundedClass: "rounded-[999px]",
    },
  ];

  const decorativeCircles = [
    {
      type: "img",
      className: "absolute top-[328px] left-[281px] w-7 h-7",
      src: ellipse28,
      alt: "",
    },
    {
      type: "img",
      className: "absolute top-[231px] left-0 w-[42px] h-[42px]",
      src: ellipse29,
      alt: "",
    },
    {
      type: "img",
      className: "absolute top-0 left-[38px] w-[37px] h-[37px]",
      src: ellipse31,
      alt: "",
    },
    {
      type: "div",
      className:
        "absolute top-[41px] left-[251px] w-[22px] h-[22px] bg-yellow rounded-[11px] shadow-[0px_1px_4px_#00000040] opacity-40",
    },
    {
      type: "div",
      className:
        "absolute top-[134px] left-[310px] w-[22px] h-[22px] bg-toska rounded-[11px] opacity-40",
    },
    {
      type: "div",
      className:
        "absolute top-[313px] left-[86px] w-[29px] h-[29px] bg-yellow rounded-[14.5px] shadow-[0px_1px_4px_#00000040] opacity-40",
    },
  ];

  const handleOptionSelect = (value) => {
    setSelectedType(value);
    if (value === "individual") {
      setShowAlert(true);
    } else if (value === "business") {
      // Notify Flutter app on mobile (using JavascriptChannel)
      if (window.FlutterOnboarding) {
        window.FlutterOnboarding.postMessage("navigate_to_login");
      }
      // Notify Flutter app on Web (using iframe postMessage)
      if (window.parent) {
        window.parent.postMessage("navigate_to_login", "*");
      }
    }
  };

  return (
    <main
      className="relative w-full h-screen bg-toska overflow-hidden"
      aria-labelledby={`${formId}-title`}
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
      <section
        className="absolute bottom-0 w-full h-[850px] bg-white rounded-[24px_24px_0px_0px]"
        aria-label="Pilih jenis keuangan"
      />
      <div
        className="absolute top-[305px] left-[49px] w-[332px] h-[356px]"
        aria-hidden="true"
      >
        {decorativeCircles.map((item, index) =>
          item.type === "img" ? (
            <img
              key={index}
              className={item.className}
              alt={item.alt}
              src={item.src}
            />
          ) : (
            <div
              key={index}
              className={item.className}
            />
          )
        )}
      </div>
      <div
        className="inline-flex gap-1.5 top-[98px] left-[calc(50.00%_-_34px)] items-center absolute"
        aria-label="Langkah 3 dari 3"
      >
        {pagerDots.map((dot, index) => (
          <div
            key={index}
            className={`relative ${dot.widthClass} h-2.5 ${dot.bgClass} ${dot.roundedClass}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <h1
        id={`${formId}-title`}
        className="absolute top-[163px] left-[calc(50.00%_-_185px)] w-[370px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#000000] text-3xl text-center tracking-[0] leading-[35.0px]"
      >
        Pilih jenis keuangan yang akan kamu kelola
      </h1>
      <img
        className="absolute top-[312px] left-[calc(50.00%_-_145px)] w-[360px] h-[309px]"
        alt="Ilustrasi kartu keuangan"
        src={group26}
      />
      <form
        className="contents"
        aria-labelledby={`${formId}-title`}
      >
        <fieldset className="contents">
          <legend className="sr-only">Jenis keuangan yang akan dikelola</legend>
          {options.map((option) => {
            const checked = selectedType === option.value;

            return (
              <label
                key={option.id}
                onClick={() => handleOptionSelect(option.value)}
                className={`flex w-[350px] h-[50px] justify-center gap-2.5 px-[111px] py-1 left-[calc(50.00%_-_175px)] rounded-[25px] overflow-hidden border-2 border-solid border-yellow items-center absolute cursor-pointer ${option.topClass} ${
                  option.isFilled ? "bg-[#fd9546]" : "bg-transparent"
                }`}
              >
                <input
                  type="radio"
                  name="financialType"
                  value={option.value}
                  checked={checked}
                  onChange={() => {}}
                  className="sr-only"
                  aria-label={option.label}
                />
                <span
                  className={`relative w-fit [font-family:'Poppins-SemiBold',Helvetica] font-semibold ${option.textClass} text-xl text-center tracking-[0] leading-[23.3px] whitespace-nowrap ${option.extraTextClass}`}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </fieldset>
      </form>
      <div className="absolute top-[692px] left-0 w-5 h-5" aria-hidden="true" />

      {/* Styled Premium Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-[340px] flex flex-col items-center shadow-2xl border border-[#fd9546]/10 animate-fade-in transform scale-100 transition-transform duration-300">
            <div className="w-16 h-16 rounded-full bg-[#fd9546]/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#fd9546]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-xl text-black text-center mb-2">
              Segera Hadir!
            </h2>
            <p className="[font-family:'Poppins-Medium',Helvetica] font-medium text-sm text-[#7A7A7A] text-center leading-[20px] mb-6">
              Fitur untuk kategori Individu saat ini sedang dalam tahap pengembangan. Silakan pilih kategori UMKM/Bisnis untuk melanjutkan.
            </p>
            <button
              type="button"
              onClick={() => setShowAlert(false)}
              className="w-full h-12 bg-[#fd9546] hover:bg-[#e07f35] active:scale-[0.98] text-white [font-family:'Poppins-SemiBold',Helvetica] font-semibold rounded-full shadow-lg shadow-[#fd9546]/20 transition-all"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default page3;