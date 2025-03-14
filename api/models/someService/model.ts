interface ICatFact {
    fact: string;
    length: number;
}

interface IPaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface IResponseModel {
    current_page: number;
    data: ICatFact[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: IPaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}