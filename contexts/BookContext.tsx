import { createContext } from "react";

export interface BookSection {
    id: string;
    title: string;
    order: number;
    content: string;
    isRead: boolean;
}

interface Props {
    sections: BookSection[];
}

export const BookContext = createContext<Props>({
    sections: []
});