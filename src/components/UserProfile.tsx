import { ProfileUser } from "@/model/user";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { image, username, name, followers, following, posts } = user;
  const info = [
    { title: "posts", data: posts },
    { title: "followers", data: followers },
    { title: "following", data: following },
  ];
  return (
    <section className="flex w-full flex-col items-center justify-center border-b border-neutral-300 py-12 md:flex-row">
      <Avatar image={image} highlight size="xlarge" />
      <div className="basis-1/3 md:ml-10">
        <div className="flex flex-col items-center md:flex-row">
          <h1 className="my-2 text-2xl md:mb-0 md:mr-8">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="my-4 flex gap-4">
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span className="mr-1 font-bold">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-center text-xl font-bold md:text-start">{name}</p>
      </div>
    </section>
  );
}
