import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";

import "./tailwind.css";
import { Header } from "./components/Header";

export default function App() {
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <Links />
      </head>
      <body className="text-gray-600">
        <Analytics />
        <div className="mb-8">
          <Header />
        </div>
        <div className="max-w-xl mx-auto px-6">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
