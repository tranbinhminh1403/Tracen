"use client";
import Link from "next/link";
import { UMA_MUSUME_RESOURCE_LINK } from "@/constant";

export const GlobalResource = () => {
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <div>
      <h1>Global Resource</h1>
      {UMA_MUSUME_RESOURCE_LINK.map((link) => (
        <div
          key={link.title}
          onClick={() => handleOpenLink(link.path)}
          className="cursor-pointer hover:bg-gray-100 p-2 rounded mb-2"
        >
          <h2>{link.title}</h2>
          <p>{link.desc}</p>
        </div>
      ))}
    </div>
  );
};
