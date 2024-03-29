import { SimplePost } from "@/model/post";
import { assetsURL, client, urlFor } from "./sanity";

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
  return client
    .fetch(
      `*[_type == 'post' && author->username == '${username}'
        || author._ref in *[_type == 'user' && username == '${username}'].following[]._ref]
        | order(_createdAt desc){${simplePostProjection}}`,
    )
    .then(mapPosts);
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

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `
  *[_type == 'post' && author->username == '${username}']
  | order(_createdAt desc){
    ${simplePostProjection}
  }
  `,
    )
    .then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `
  *[_type == 'post' && '${username}' in likes[]->username]
  | order(_createdAt desc){
    ${simplePostProjection}
  }
  `,
    )
    .then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `
  *[_type == 'post' && _id in *[_type == 'user' && username == '${username}'].bookmarks[]._ref]
  | order(_createdAt desc){
    ${simplePostProjection}
  }
  `,
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  // @sanity/image-url 사용하여 외부 url도 최적화하여 가져오게끔
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
  }));
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId) // postId에 해당하는 데이터를 수정하기 위해 patch를 수행
    .setIfMissing({ likes: [] }) // 'likes' 필드가 없으면 빈 배열로 설정
    .append("likes", [
      // 'likes' 배열에 새 요소 추가
      {
        _ref: userId,
        _type: "reference",
      },
    ]) // -> 쿼리문 완성
    .commit({ autoGenerateArrayKeys: true }); // 변경사항을 적용하고 배열 키를 자동으로 생성하여 커밋 (sanity에 전송하는 단계)
}

export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}

export async function addComment(
  postId: string,
  userId: string,
  comment: string,
) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        comment,
        author: {
          _ref: userId,
          _type: "reference",
        },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function createPost(userId: string, text: string, file: Blob) {
  console.log(userId, text, "create post");
  return fetch(assetsURL, {
    method: "POST",
    headers: {
      "content-type": file.type,
      authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`,
    },
    body: file,
  })
    .then((res) => res.json())
    .then((result) => {
      return client.create(
        {
          _type: "post",
          author: { _ref: userId },
          photo: { asset: { _ref: result.document._id } },
          comments: [
            {
              comment: text,
              author: { _ref: userId, _type: "reference" },
            },
          ],
          likes: [],
        },
        { autoGenerateArrayKeys: true },
      );
    });
  // return client.assets //
  //   .upload("image", file)
  //   .then((result) => {
  //     return client.create(
  //       {
  //         _type: "post",
  //         author: { _ref: userId },
  //         photo: { asset: { _ref: result._id } },
  //         comments: [
  //           {
  //             comment: text,
  //             author: { _ref: userId, _type: "reference" },
  //           },
  //         ],
  //         likes: [],
  //       },
  //       { autoGenerateArrayKeys: true },
  //     );
  //   });
}
