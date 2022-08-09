import fs from "fs/promises";
import fm from "front-matter";
import showdown from "showdown";

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
  const fileContents = await fs.readFile(`${__dirname}/../posts/${slug}.md`);
  const content = fm<PostFrontMatter>(fileContents.toString("utf8"));

  const html = converter.makeHtml(content.body);

  return {
    slug,
    attributes: content.attributes,
    html,
  };
}

export async function listPosts(): Promise<PostData[]> {
  const dir = await fs.readdir(`${__dirname}/../posts`);
  const posts = await Promise.all(
    dir
      .sort()
      .reverse()
      .filter((x) => x.endsWith(".md"))
      .map((x) => x.replace(/\.md$/, ""))
      .map((slug) => {
        return getPost(slug);
      })
  );

  return posts;
}
