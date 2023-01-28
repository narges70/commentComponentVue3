interface IUser {
    name: string;
    avatar?: string;
}
interface IComment {
    id: number;
    date: number; // unix timestamp in milliseconds.
    user: IUser;
    text: string;
    likes: number;
    iLikedIt: boolean;
    showReplySection?: boolean|undefined;
}
interface IDiscussion extends IComment {
    replies: IComment[];
}
interface IProps {
    comments: IComment[];
}
export enum textType {
    'COMMENT',
    'REPLY'
}

export {
    IUser,
    IComment,
    IDiscussion,
    IProps,
}