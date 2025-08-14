"use client";
import { Section } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SectionCard = ({ section }: { section: Section }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(section.path)}
      className="flex flex-col items-center justify-center cursor-pointer border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {section.logo && (
        <div className="relative w-16 h-16 mb-3">
          <Image
            src={section.logo}
            alt={section.title}
            fill
            className="object-contain"
            sizes="64px"
          />
        </div>
      )}
      <h2 className="text-center text-sm font-medium text-gray-800 line-clamp-2">
        {section.title}
      </h2>
    </div>
  );
};
