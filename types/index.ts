export type Section = {
    title: string;
    path: string;
    logo: string;
    resource?: ResourceLink[];
}

export enum Category {
    DOCUMENTATION,
    WEB_APP,
    VIDEO,
    OTHER
}

export type ResourceLink = {
    title: string;
    path: string;
    desc?: string;
    note?: string;
    category?: Category;
}

export type AppAccordionItem = {
    title: string;
    content: React.ReactNode;
}
    
