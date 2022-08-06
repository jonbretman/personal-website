import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { listPosts, PostData } from "../../posts.server";

type LoaderData = {
  posts: PostData[];
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const posts = await listPosts();

  return {
    posts,
  };
};

export default function Post() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <ul>
        {data.posts.map((post, i) => {
          return (
            <li key={i}>
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
