'use client'
import { Section } from "@/types";
import { useRouter } from "next/navigation";


export const SectionCard = ({section}: {section: Section}) => {
    const router = useRouter();
    return (
        <div onClick={() => router.push(section.path)} className="flex flex-col items-center justify-center cursor-pointer">
            <h2>{section.title}</h2>
            {/* <p>{section.path}</p>
            <p>{section.logo}</p> */}
        </div>
    )
}