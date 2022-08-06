import fs from "fs/promises";
import fm from "front-matter";
import showdown from "showdown";

export type PostData = {
  slug: string;
  title: string;
  html: string;
};

type PostFrontMatter = {
  title: string;
};

const converter = new showdown.Converter();

export async function getPost(slug: string): Promise<PostData> {
  const fileContents = await fs.readFile(`${__dirname}/../posts/${slug}.md`);
  const content = fm<PostFrontMatter>(fileContents.toString("utf8"));

  const html = converter.makeHtml(content.body);

  return {
    slug,
    title: content.attributes.title,
    html,
  };
}

export async function listPosts(): Promise<PostData[]> {
  const dir = await fs.readdir(`${__dirname}/../posts`);
  const posts = await Promise.all(
    dir
      .filter((x) => x.endsWith(".md"))
      .map((x) => x.replace(/\.md$/, ""))
      .map((slug) => {
        return getPost(slug);
      })
  );

  return posts;
}
