import { useId, useState } from "react";
import ellipse28 from "../assets/ellipse-28.png";
import ellipse29 from "../assets/ellipse-29.png";
import ellipse31 from "../assets/ellipse-31.png";
import group26 from "../assets/card_credit.png";
import { useNavigate } from "react-router-dom";

const page3 = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("business");
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
    // Notify Flutter app on mobile (using JavascriptChannel)
    if (window.FlutterOnboarding) {
      window.FlutterOnboarding.postMessage("navigate_to_login");
    }
    // Notify Flutter app on Web (using iframe postMessage)
    if (window.parent) {
      window.parent.postMessage("navigate_to_login", "*");
    }
  };

  return (
    <main
      className="relative flex flex-col justify-between w-full h-screen bg-toska overflow-hidden"
      aria-labelledby={`${formId}-title`}
    >
      {/* Decorative background shapes */}
      <div
        className="absolute top-[-323px] left-[calc(50.00%_-_67px)] w-[535px] h-[698px] rotate-[-153.36deg] z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-[calc(50.00%_-_267px)] w-[535px] h-[453px] bg-[#6dd0d01a] rounded-[267.5px/226.5px]" />
        <div className="absolute top-[172px] left-[calc(50.00%_-_267px)] w-[535px] h-[453px] bg-[#6dd0d066] rounded-[267.5px/226.5px]" />
        <div className="absolute top-[79px] left-[calc(50.00%_-_267px)] w-[535px] h-[453px] bg-[#6dd0d033] rounded-[267.5px/226.5px]" />
        <div className="absolute top-[245px] left-[calc(50.00%_-_267px)] w-[535px] h-[453px] bg-[#6cd0d0] rounded-[267.5px/226.5px]" />
      </div>

      {/* White content card */}
      <section
        className="relative bg-white rounded-t-[24px] flex flex-col items-center justify-between w-full px-6 pt-6 pb-10 z-10 flex-grow mt-10"
        aria-label="Pilih jenis keuangan"
      >
        {/* Indicators */}
        <div
          className="inline-flex gap-1.5 mb-6"
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

        {/* Title */}
        <h1
          id={`${formId}-title`}
          className="w-full [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#000000] text-[2rem] md:text-4xl text-center tracking-[0] leading-tight mb-2"
        >
          Pilih jenis keuangan yang akan kamu kelola
        </h1>

        {/* Decorative elements behind image */}
        <div className="relative w-full flex-1 flex items-center justify-center min-h-[250px]">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden max-w-[340px] mx-auto">
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
          
          <img
            className="w-auto h-[34vh] max-h-[310px] object-contain z-10"
            alt="Ilustrasi kartu keuangan"
            src={group26}
          />
        </div>

        {/* Form selection */}
        <form
          className="w-full flex flex-col items-center gap-3 mt-4"
          aria-labelledby={`${formId}-title`}
          onSubmit={(e) => e.preventDefault()}
        >
          <fieldset className="w-full flex flex-col items-center gap-3">
            <legend className="sr-only">Jenis keuangan yang akan dikelola</legend>
            {options.map((option) => {
              const checked = selectedType === option.value;

              return (
                <label
                  key={option.id}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`flex w-full max-w-[340px] h-[50px] justify-center items-center rounded-full border-2 border-solid border-[#fd9546] cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] ${
                    checked ? "bg-[#fd9546]" : "bg-transparent"
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
                    className={`[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-lg text-center tracking-[0] leading-normal whitespace-nowrap ${
                      checked ? "text-white" : "text-[#fd9546]"
                    }`}
                  >
                    {option.label}
                  </span>
                </label>
              );
            })}
          </fieldset>
        </form>
      </section>
      
    </main>
  );
};

export default page3;