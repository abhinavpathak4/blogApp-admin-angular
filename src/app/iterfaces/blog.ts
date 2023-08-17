import { Comments } from "./comments";

export interface Blog {
    id?: number,
    title: string,
    description: string,
    category: string,
    comments?: Comments[],
    featured?: boolean
}
