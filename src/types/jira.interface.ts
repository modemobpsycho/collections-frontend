export interface IJira {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    priority: string;
    type: string;
}

export interface IJiraTicket {
    id: number;
    key: string;
    url: string;
    summary: string;
    status: string;
    description: string;
    issueType: string;
    issueIconUrl: string;
    priority: string;
    priorityIconUrl: string;
    created: string;
    updated: string;
}

export interface IJiraCreate {
    title: string;
    description: string;
    type: string;
    url: string;
}
