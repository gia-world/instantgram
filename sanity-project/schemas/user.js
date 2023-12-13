export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'UserName',
      name: 'username',
      type: 'string',
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'string',
    },
    {
      title: 'Following',
      name: 'following',
      type: 'array',
      of: [
        // 어떤 어레이 타입 이냐면
        {
          type: 'reference', // 참고를 할건데
          to: [{type: 'user'}], // user 타입의 스키마를 가져와서 참고할거야
        },
      ],
      validation: (Rule) => Rule.unique(), // 중복된 데이터 금지
    },
    {
      title: 'Followers',
      name: 'followers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'Bookmarks',
      name: 'bookmarks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'username',
    },
  },
}
