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
  return (
    <div>
      <h3>{data.post.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: data.post.html }}></div>
    </div>
  );
}
