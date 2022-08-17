import { Link } from "@remix-run/react";

export function Header() {
  return (
    <div className="px-6 py-4 bg-gray-100 border-t-8 border-emerald-900">
      <div className="flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-serif text-orange-800">Jon Bretman</h1>
        </Link>
        <div>
          <Link to="/about">About</Link>
        </div>
      </div>
    </div>
  );
}
