"use client";
import { Displayer } from "@/components/home/Displayer";
import { SECTION } from "@/constant";
import { use } from "react";
import { Section } from "@/types";

export default function Game({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game } = use(params);
  const gameSection: Section | undefined = SECTION.find((section) => section.path === game);
  const gameTitle = gameSection?.title || "";
  const resourceLink = gameSection?.resource || [];
  return (
    <div>
      <h1>{gameTitle}</h1>
      <Displayer title="Global Server Resource" resourceLink={resourceLink} />
    </div>
  );
}
