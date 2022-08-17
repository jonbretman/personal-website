import { LoaderFunction, Response } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost, PostData } from "../../posts.server";

type LoaderData = {
  post: PostData;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const slug = params.slug;
  if (!slug) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  let post: PostData;

  try {
    post = await getPost(slug);
  } catch (err) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return {
    post,
  };
};

export default function Post() {
  const data = useLoaderData<LoaderData>();
  const { post } = data;
  return (
    <div>
      <h2 className="text-4xl mb-2 font-serif text-emerald-900">
        {post.attributes.title}
      </h2>
      <p className="font-sans font-semibold mb-4">
        {post.attributes.month} {post.attributes.year}
      </p>
      <hr className="mb-8" />
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
        className="prose pb-16 prose-a:text-orange-800"
      ></div>
    </div>
  );
}
