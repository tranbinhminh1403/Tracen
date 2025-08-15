import { SectionCard } from "@/components/home/SectionCard";
import { SECTION } from "@/constant";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-6">

      {/* content */}
      <div className="flex flex-col w-full items-center justify-center">
        <div className="text-center h-[60vh]">
          <h1 className="text-2xl font-bold">Tracen Resource</h1>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SECTION.map((section) => (
            <SectionCard key={section.title} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
