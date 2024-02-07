import React from "react";
import DefaultCardLogo from "assests/card/default_card_logo.svg";

function Component({ card }) {
  return (
    <div
      className="flex h-[176px] w-[280px] flex-col space-y-3 rounded-lg px-[30px] py-5"
      style={
        card.backgroundImage
          ? {
              alignItems: card.alignment || "center",
              justifyContent:
                card.alignment === "end" || card.alignment === "start"
                  ? "end"
                  : "center",
              backgroundImage: `url('${card.backgroundImage}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }
          : {
              background: card.backgroundColor || "#091323",
              alignItems: card.alignment || "center",
              justifyContent:
                card.alignment === "end" || card.alignment === "start"
                  ? "end"
                  : "center",
            }
      }
    >
      {card.enableLogo && (
        <img
          src={card.logo || DefaultCardLogo}
          alt="card_logo"
          className="!h-[68px] !w-[68px]"
        />
      )}
      {card.enableFrontText && (
        <div
          className="w-[max-content] text-center text-white"
          style={{
            fontFamily: card.fontFamily || "Montserrat",
            color: card.frontTextColor || "white",
          }}
        >
          {card.frontText || "Your name here"}
        </div>
      )}
    </div>
  );
}

export default Component;
