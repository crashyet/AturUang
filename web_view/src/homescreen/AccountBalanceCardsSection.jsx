import { IconComponentNode } from "./IconComponentNode";
import image from "./image.png";
import { MdiEyeOff } from "./MdiEyeOff";
import mdiEyeOff from "./mdi-eye-off.png";
import mdiEyeOff2 from "./mdi-eye-off-2.png";
import { TypcnArrowUp } from "./TypcnArrowUp";
import typcnArrowUp from "./typcn-arrow-up.png";
import typcnArrowUp2 from "./typcn-arrow-up-2.png";

const cards = [
  {
    id: "tunai",
    name: "Tunai",
    balance: "Rp10.654.258",
    eyeType: "component",
    incomeIconType: "component",
    expenseIconType: "component",
    marginLeftClass: "ml-7",
  },
  {
    id: "bca",
    name: "Bank BCA",
    balance: "Rp10.654.258",
    eyeType: "image",
    eyeSrc: mdiEyeOff2,
    incomeIconType: "component",
    expenseIconType: "image",
    expenseIconSrc: typcnArrowUp2,
    marginLeftClass: "ml-[15px]",
  },
  {
    id: "bni",
    name: "Bank BNI",
    balance: "Rp10.654.258",
    eyeType: "image",
    eyeSrc: mdiEyeOff,
    incomeIconType: "image",
    incomeIconSrc: typcnArrowUp,
    expenseIconType: "image",
    expenseIconSrc: image,
    marginLeftClass: "ml-6",
  },
];

const summaryItems = [
  {
    id: "income",
    value: "Rp10.654.258",
    label: "Pemasukan",
    textWidthClass: "w-[66px]",
  },
  {
    id: "expense",
    value: "Rp10.654.258",
    label: "Pengeluaran",
    textWidthClass: "w-[71px]",
  },
];

const renderEyeIcon = (card, isVisible) => {
  if (isVisible) {
    return (
      <span
        aria-hidden="true"
        className="mt-[4.5px] flex h-5 w-5 items-center justify-center text-[#000000] text-sm leading-none"
      >
        ◉
      </span>
    );
  }

  if (card.eyeType === "component") {
    return (
      <MdiEyeOff className="!mt-[4.5px] !w-5 !h-5 !aspect-[1]" color="black" />
    );
  }

  return (
    <img
      className="mt-[4.5px] w-5 h-5 aspect-[1]"
      alt=""
      aria-hidden="true"
      src={card.eyeSrc}
    />
  );
};

const renderSummaryIcon = (card, item) => {
  if (item.id === "income") {
    if (card.incomeIconType === "component") {
      return <TypcnArrowUp className="!w-[27px] !h-[27px] !aspect-[1]" />;
    }

    return (
      <img
        className="w-[27px] h-[27px] aspect-[1]"
        alt=""
        aria-hidden="true"
        src={card.incomeIconSrc}
      />
    );
  }

  if (card.expenseIconType === "component") {
    return <IconComponentNode className="!w-[27px] !h-[27px] !aspect-[1]" />;
  }

  return (
    <img
      className="w-[27px] h-[27px] aspect-[1]"
      alt=""
      aria-hidden="true"
      src={card.expenseIconSrc}
    />
  );
};

export const AccountBalanceCardsSection = () => {
  const [visibleBalances, setVisibleBalances] = useState(
    cards.reduce((acc, card) => {
      acc[card.id] = true;
      return acc;
    }, {}),
  );

  const toggleBalanceVisibility = (cardId) => {
    setVisibleBalances((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <section
      aria-label="Kartu saldo akun"
      className="absolute top-[428px] left-0 w-[430px] h-40 flex overflow-hidden overflow-x-scroll"
    >
      {cards.map((card) => {
        const isVisible = visibleBalances[card.id];
        const displayedBalance = isVisible ? card.balance : "Rp••.•••.•••";

        return (
          <article
            key={card.id}
            className={`${card.marginLeftClass} w-[338px] h-[158px] relative flex shrink-0 flex-col gap-6 bg-white rounded-2xl border-[none] shadow-[0px_4px_4px_#00000040] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-2xl before:[background:linear-gradient(166deg,rgba(44,166,151,1)_0%,rgba(30,175,158,1)_50%,rgba(23,84,72,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none`}
          >
            <div className="ml-[21px] w-[194px] h-[57px] mt-4 flex flex-col gap-1">
              <h2 className="w-fit h-5 mt-2 [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#000000] text-base tracking-[0] leading-[normal]">
                {card.name}
              </h2>
              <div className="w-[194px] flex gap-[11px]">
                <div
                  aria-live="polite"
                  className="w-[163px] h-[29px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#000000] text-2xl tracking-[0] leading-[normal]"
                >
                  {displayedBalance}
                </div>
                <button
                  type="button"
                  aria-label={
                    isVisible
                      ? `Sembunyikan saldo ${card.name}`
                      : `Tampilkan saldo ${card.name}`
                  }
                  aria-pressed={isVisible}
                  onClick={() => toggleBalanceVisibility(card.id)}
                  className="flex items-start justify-start bg-transparent p-0 border-0 cursor-pointer focus:outline-none"
                >
                  {renderEyeIcon(card, isVisible)}
                </button>
              </div>
            </div>
            <div className="ml-3 w-[314px] flex gap-4">
              {summaryItems.map((item) => (
                <div
                  key={`${card.id}-${item.id}`}
                  className="w-[149px] h-[45px] flex gap-2 bg-[#ffffff] rounded-[10px]"
                >
                  <div className="mt-[9px] w-[27px] ml-2.5 flex bg-[#d9d9d9] rounded-[999px] overflow-hidden">
                    {renderSummaryIcon(card, item)}
                  </div>
                  <div className="mt-1.5 w-[94px] h-[33px] flex flex-col">
                    <div className="h-[17px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#000000] text-sm tracking-[0] leading-[normal]">
                      {item.value}
                    </div>
                    <div
                      className={`${item.textWidthClass} h-4 text-xs [font-family:'Open_Sans-Regular',Helvetica] font-normal text-[#000000] tracking-[0] leading-[normal]`}
                    >
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
};