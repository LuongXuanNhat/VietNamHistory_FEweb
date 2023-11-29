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
    isSaved: boolean;
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

  export interface PostFpk {
    postId: string;
    userId: string;
  }
 
  // export class QuestionResponseDto {
  //   id: string = '';
  //   title: string = '';
  //   content: string = '';
  //   createAt?: Date | null;
  //   updateAt?: Date | null;
  //   tags?: TagDto[] = [];
  //   userShort?: UserShortDto | null;
  //   viewNumber: number = 0;
  //   commentNumber: number = 0;
  //   saveNumber: number = 0;
  // }
  