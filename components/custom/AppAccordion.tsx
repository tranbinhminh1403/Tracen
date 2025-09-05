import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { AppAccordionItem } from "@/types";
  
  interface AppAccordionProps {
    data: AppAccordionItem[];
  }
  
  export const AppAccordion = ({ data }: AppAccordionProps) => {
    return (
      <Accordion type="multiple" className="w-full" defaultValue={["item-0"]}>
        {data.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index} className="hover:bg-secondary">
            <AccordionTrigger className="px-2 cursor-pointer bg-primary text-primary-foreground">{item.title}</AccordionTrigger>
            <AccordionContent className="bg-secondary">{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };