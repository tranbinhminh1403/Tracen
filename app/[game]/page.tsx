"use client";
import { Displayer } from "@/components/home/Displayer";
import { SECTION } from "@/constant";
import { use } from "react";
import { Section } from "@/types";
import { AppAccordion } from "@/components/custom/AppAccordion";

export default function Game({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game } = use(params);
  const gameSection: Section | undefined = SECTION.find((section) => section.path === game);
  const gameTitle = gameSection?.title || "";
  const resourceLink = gameSection?.resource || [];
  const accordionData = [
    {
      title: "Global Server Resource",
      content: <Displayer resourceLink={resourceLink} />
    }
  ]

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center my-5">{gameTitle}</h1>

      <div className="w-1/3">
        <AppAccordion data={accordionData} />
      </div>
    </div>
  );
}
