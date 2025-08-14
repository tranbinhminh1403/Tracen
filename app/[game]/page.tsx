"use client";
import { Displayer } from "@/components/home/Displayer";
import { SECTION } from "@/constant";
import { use } from "react";

export default function Game({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game } = use(params);
  const gameTitle =
    SECTION.find((section) => section.path === game)?.title || "";
  const resourceLink =
    SECTION.find((section) => section.path === game)?.resource || [];
  console.log(resourceLink);
  return (
    <div>
      <h1>{gameTitle}</h1>
      <Displayer title="Global Server Resource" resourceLink={resourceLink} />
    </div>
  );
}
