import { Timestamp } from 'firebase-admin/firestore';

import { PostsCollection } from '../collections';
import { AppFireDocument } from '../lib';

export interface PostData {
  __id: string;
  title: string;
  body: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
}
export interface PostDoc extends PostData {}
export class PostDoc extends AppFireDocument<PostData> {
  get serialized() {
    return {
      ...this.dataWithId,
      createdAt: this.createdAt.toDate().toISOString(),
      updatedAt: this.updatedAt.toDate().toISOString(),
    };
  }

  static create(
    collection: PostsCollection,
    { title, body, userId }: Pick<PostData, 'title' | 'body' | 'userId'>,
  ) {
    const id = collection.ref.doc().id;
    const createdAt = Timestamp.now();
    return new PostDoc(
      this.makeConstructorInput(collection, id, {
        __id: id,
        title,
        body,
        createdAt,
        updatedAt: createdAt,
        userId,
      }),
    );
  }

  update({ title, body }: Pick<PostData, 'title' | 'body'>) {
    return this.edit({ title, body, updatedAt: Timestamp.now() });
  }
}
