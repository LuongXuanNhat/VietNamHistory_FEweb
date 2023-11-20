export interface Result {
  isSuccessed: boolean;
  message: string;
  resultObj: any;
}
export interface Category {
    categoryname: string;
    url: string;
}
export interface AccountList {
    categoryname: string;
    url: string;
}
export interface Topic {
    id: string;
    title: string;
}
export interface CreatePostRequest {
  Title: string | null |undefined;
  Content: string | null |undefined;
  Image: File | null |undefined;
  TopicId: string | null |undefined;
  Tag: string[]  | null |undefined;
}
export interface PostResponse {
    id: string;
    title: string;
    subId: string;
    content: string;
    image: string;
    createdAt: string ;
    updatedAt: string | null;
    topicName: string;
    tags: TagDto[];
    userShort: UserShortDto;
    viewNumber: number;
    commentNumber: number;
    likeNumber: number;
    saveNumber: number;
  }
  export interface TagDto {
    id: string;
    name: string;
  }
  export interface UserShortDto {
    id: string;
    fullName: string;
    image?: string;
  }
  export interface ReportPost {
    id: string;
    title: string;
    description: string;
  }

  export interface CommentPostDto {
    id?: string;
    userId?: string;
    postId: string;
    userShort?: UserShortDto | null;
    content: string;
    createdAt: Date | string;
    updatedAt?: Date | string | null;
    subComment?: SubCommentDto[] | null;
  }

  export interface SubCommentDto {
    id: string;
    content?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    userShort?: UserShortDto | null;
  }
 
  