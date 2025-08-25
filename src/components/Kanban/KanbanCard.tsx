import type { cardsProps } from "../../Types/KanbanTypes";
import { useDraggable } from "@dnd-kit/core";
import EditCardPopup from "../Features/EditCardPopup";
import { MdVerified } from "react-icons/md";
import { useState } from "react";

type cardProps = {
  card: cardsProps;
};

const statusColor: Record<string, string> = {
  Critical: "bg-[#b12b26]",
  High: "bg-[#e44542]",
  Medium: "bg-[#df7325]",
  Low: "bg-[#e6ab1d]",
};

const sourceColor: Record<string, string> = {
  Hypejab: "bg-[#f5e8fb] text-[#ab75d2]",
  "Source Code": "bg-[#fbf3ea] text-[#cc974b]",
  Getastra: "bg-[#edeffc] text-[#4871b3]",
};

const KanbanCard = ({ card }: cardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });

  const [verified, setVerified] = useState(false);

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className="rounded-lg p-2 mt-4 border border-gray-300 shadow-sm cursor-pointer"
      >
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <p className="text-gray-500 text-xs">#8793</p>
            <span className="w-1 h-1 bg-gray-400 rounded-full block"></span>
            <p className="text-gray-500 text-xs">{card.date}</p>
          </div>
          <div>
            <img className="w-4 h-4" src="../star.png" alt="" />
          </div>
        </div>
        <div className="mt-1">
          <h2 className="text-[17px] font-[500]">{card.description}</h2>
        </div>
        <div>
          <div className="flex gap-2   w-full mt-3 items-center">
            <span
              className={`flex items-center text-white text-[13px] rounded-2xl px-2 pb-[1px] ${
                statusColor[card.status]
              }`}
            >
              {card.status}
            </span>
            <span
              className={`flex items-center ${
                sourceColor[card.source]
              } text-[13px] pb-[1px] font-[500] rounded-2xl px-2`}
            >
              {card.source}
            </span>
            <span className="font-[500]">{card.rating}</span>
          </div>
        </div>
      </div>
      <div className="absolute top-1.5 right-8">
        <EditCardPopup card={card} />
      </div>
      <div
        onClick={() => setVerified((prev) => !prev)}
        className="absolute bottom-2.5 right-4 cursor-pointer"
      >
        {verified ? (
          <div className="relative">
            <MdVerified className="text-blue-500 w-5 h-6" />
            <p className="absolute -left-10 bottom-6 truncate bg-[#0f2756] text-white px-2 p-1 rounded-lg text-sm">Verified by Sam</p>
          </div>
        ) : (
          <MdVerified className="text-gray-300 w-5 h-6" />
        )}
      </div>
    </div>
  );
};

export default KanbanCard;
