"use client";
import { ResourceLink } from "@/types";

export const Displayer = ({
  title,
  resourceLink,
}: {
  title?: string;
  resourceLink: ResourceLink[];
}) => {
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <div>
      <h1>{title || ""}</h1>
      {resourceLink.map((link) => (
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
