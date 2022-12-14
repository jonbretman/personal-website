import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Header } from "./components/Header";
import tw from "./tailwind.css";
import { inject } from "@vercel/analytics";
import { useEffect } from "react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Jon Bretman",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
    { rel: "stylesheet", href: tw },
  ];
};

export default function App() {
  useEffect(() => {
    inject();
  });

  return (
    <html lang="en">
      <head>
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri&family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body className="text-gray-600">
        <div className="mb-8">
          <Header />
        </div>
        <div className="max-w-xl mx-auto px-6">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
