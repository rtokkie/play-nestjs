import { PostData, UserData } from '../fire/documents';

type WithId<T> = T & { id: string };

export type User = WithId<UserData>;
export type Post = WithId<PostData>;