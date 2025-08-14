import { Section, ResourceLink, Category } from "@/types"

export const WARFRAME_RESOURCE_LINK: ResourceLink[] = [
    {
        title: "Warframe global reference docs",
        path: "",
        desc: "Overall guide",
        category: Category.DOCUMENTATION
    }
]

export const UMA_MUSUME_RESOURCE_LINK: ResourceLink[] = [
    {
        title: "Uma Musume global reference docs",
        path: "https://docs.google.com/document/d/11X2P7pLuh-k9E7PhRiD20nDX22rNWtCpC1S4IMx_8pQ/edit?tab=t.0",
        desc: "Overall guide",
        category: Category.DOCUMENTATION
    },
    {
        title: "Global breeding guide",
        path: "https://docs.google.com/document/d/1Q3IJKbtkplmuY-PAJMNjYiLtasv0eU0aIBEqp8_C3tg/edit?tab=t.0",
        desc: "Learn how to breed properly (with \"U\"mage)",
        category: Category.DOCUMENTATION
    },
    {
        title: "Pure-DB Followers searcher",
        path: "https://uma-global.pure-db.com/",
        desc: "Looking for who to sucks easier",
        category: Category.WEB_APP
    },
    {
        title: "gametora",
        path: "https://gametora.com/umamusume",
        desc: "Tools such as compatibility, race planner,..",
        category: Category.WEB_APP
    },
    {
        title: "uma.moe",
        path: "https://uma.moe/",
        desc: "Banner approximate, tools,... new app with fewer features",
        category: Category.WEB_APP
    }
]

export const GFL2_RESOURCE_LINK: ResourceLink[] = [
    {
        title: "Girls' Frontline 2: Exilium global reference docs",
        path: "",
        desc: "Overall guide",
        category: Category.DOCUMENTATION
    }
]

export const NIGHTREIGN_RESOURCE_LINK: ResourceLink[] = [
    {
        title: "Elden Ring Nightreign global reference docs",
        path: "",
        desc: "Overall guide",
        category: Category.DOCUMENTATION
    }
]

export const SECTION: Section[] = [
    {
        title: "Warframe",
        path: "warframe",
        logo: "",
        resource: WARFRAME_RESOURCE_LINK,
    },
    {
        title: "Uma Musume",
        path: "uma-musume",
        logo: "/logo/uma_logo.png",
        resource: UMA_MUSUME_RESOURCE_LINK,
    },
    {
        title: "Girls' Frontline 2: Exilium",
        path: "gfl2",
        logo: "",
        resource: GFL2_RESOURCE_LINK,
    },
    {
        title: "Elden Ring Nightreign",
        path: "nightreign",
        logo: "",
        resource: NIGHTREIGN_RESOURCE_LINK,
    }
]