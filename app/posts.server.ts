import fm from "front-matter";
import showdown from "showdown";
import { basename, extname } from "path";

export type PostData = {
  slug: string;
  html: string;
  attributes: PostFrontMatter;
};

type PostFrontMatter = {
  title: string;
  month: string;
  year: string;
};

const converter = new showdown.Converter();

export async function getPost(slug: string): Promise<PostData> {
  const posts = await listPosts();
  const post = posts.find((x) => x.slug === slug);
  if (!post) {
    throw new Error("not found");
  }

  return post;
}

export async function listPosts(): Promise<PostData[]> {
  const posts: PostData[] = [];
  const ps = import.meta.glob("../posts/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  });
  for (const [k, v] of Object.entries(ps)) {
    const slug = basename(k).replace(extname(k), "");
    const content = fm<PostFrontMatter>(v as string);
    const html = converter.makeHtml(content.body);

    posts.push({
      slug,
      attributes: content.attributes,
      html,
    });
  }

  return posts.sort((x, y) => {
    return x.slug > y.slug ? -1 : 1;
  });
}
