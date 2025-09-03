"use client";
import { Section } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SectionCard = ({ section }: { section: Section }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(section.path)}
      className="flex flex-col items-center justify-center cursor-pointer 
                 bg-white/10 backdrop-blur-sm border border-white/20 
                 rounded-lg p-4 shadow-lg 
                 hover:bg-white/15 hover:border-white/30 hover:shadow-xl 
                 transition-all duration-300 hover:scale-105"
    >
      {section.logo && (
        <div className="relative w-full h-24 mb-3">
          <Image
            src={section.logo}
            alt={section.title}
            fill
            className="object-contain"
          />
        </div>
      )}
      {/* Uncomment if you want to show the title with appropriate text color */}
      {/* <h2 className="text-center text-sm font-medium text-white/90 line-clamp-2">
        {section.title}
      </h2> */}
    </div>
  );
};