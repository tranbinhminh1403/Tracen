import { SECTION } from "@/constant";
import { SectionCard } from "./SectionCard";

export const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            {SECTION.map((section) => (
                <SectionCard key={section.title} section={section} />
            ))}
        </div>
    )
}