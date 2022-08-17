import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import { listPosts, PostData } from "../posts.server";

type LoaderData = {
  posts: PostData[];
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const posts = await listPosts();

  return {
    posts,
  };
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  const postsByYear = data.posts.reduce<PostData[][]>((memo, post) => {
    const curr = memo.length > 0 ? memo[0] : null;
    if (curr && curr[0].attributes.year === post.attributes.year) {
      curr.push(post);
    } else {
      memo.push([post]);
    }
    return memo;
  }, []);

  return (
    <div>
      {postsByYear.map((posts, i) => {
        return (
          <div key={i}>
            <h3 className="text-orange-800 font-semibold mb-2">
              {posts[0].attributes.year}
            </h3>
            <ul className="mb-8">
              {posts.map((post, j) => {
                return (
                  <li key={j} className="mb-2">
                    <Link to={`/posts/${post.slug}`}>
                      <span className="uppercase text-xs text-slate-400">
                        {post.attributes.month}
                      </span>
                      <br></br>
                      <span className="text-2xl text-emerald-900 font-serif">
                        {post.attributes.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
