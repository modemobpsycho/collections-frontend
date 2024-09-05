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
    assignee: string;
    priority: string;
    comments: IJiraComment[];
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

export interface IJiraComment {
    id: number;
    author: {
        avatarUrls: {
            '48x48': string;
        };
        displayName: string;
    };
    body: CommentBody;
    created: string;
}

interface CommentBody {
    content: {
        content: {
            text: string;
        }[];
    }[];
}
