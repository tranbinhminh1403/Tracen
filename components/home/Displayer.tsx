"use client";
import { Category, ResourceLink } from "@/types";
import { BookOpen } from "lucide-react";
import { Video } from "lucide-react";
import {ChevronsLeftRightEllipsis} from "lucide-react";

export const Displayer = ({
  // title,
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
      {/* <h1>{title || ""}</h1> */}
      {resourceLink.map((link) => (
        <div
          key={link.title}
          onClick={() => handleOpenLink(link.path)}
          className="cursor-pointer hover:bg-gray-100 p-2 rounded py-3"
        >
          <div className="flex items-center">
            {link.category === Category.DOCUMENTATION && <BookOpen className="w-4 h-4" />}
            {link.category === Category.VIDEO && <Video className="w-4 h-4" />}
            {link.category === Category.WEB_APP && <ChevronsLeftRightEllipsis className="w-4 h-4" />}
            <h2 className="ml-2">{link.title}</h2>
          </div>
          <p>{link.desc}</p>
        </div>
      ))}
    </div>
  );
};
