import { SimplePost } from "@/model/post";
import { client, urlFor } from "./sanity";

const simplePostProjection = `
...,
'username': author->username,
'userImage': author->image,
'image': photo,
'likes': likes[]->username,
'text': comments[0].comment,
'comments': count(comments),
'id': _id,
'createdAt': _createdAt
`;
// 'username': author->username,
// => post.author.username ~> post.username

// ! 'image': photo->asset.url
// => url of a full size unoptimized image

export async function getFollowingPostsOf(username: string) {
  return (
    client
      .fetch(
        `*[_type == 'post' && author->username == '${username}'
        || author._ref in *[_type == 'user' && username == '${username}'].following[]._ref]
        | order(_createdAt desc){${simplePostProjection}}`,
      )
      // @sanity/image-url 사용하여 외부 url도 최적화하여 가져오게끔
      .then((posts) =>
        posts.map((post: SimplePost) => ({
          ...post,
          image: urlFor(post.image),
        })),
      )
  );
}
/*
*[_type == 'post' && author->username == '${username}'
=> 전체 데이터 중에 [타입이 post이고 author 레퍼런스 중에 username이 매개변수와 같은 애

|| author._ref in *[_type == 'user' && username == '${username}'].following[]._ref]
=> 혹은 author의 레퍼런스 id가 *[타입이 user이고 username이 매개변수와 같은 데이터 중에 following 배열의 id]랑 동일한 애

| order(_createdAt desc){${simplePostProjection}}
=> 정렬할건데 _createdAt을 기준으로 최신 것이 위로 올라오도록, 그리고 명시한 프로젝션에 따라서 데이터를 가공할거야
*/

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == 'post' && _id == '${id}'][0]{
      ...,
      'username':author->username,
      'userImage':author->image,
      'image': photo,
      'likes': likes[]->username,
      'id':_id, 
      'createdAt': _createdAt,
      comments[]{
        comment, 
        'username': author->username, 
        'userImage': author->image, 
      }
    }
    `,
    )
    .then((post) => ({
      ...post,
      image: urlFor(post.image),
    }));
}
