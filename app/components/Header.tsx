import { Link } from "@remix-run/react";

export function Header() {
  return (
    <div className="p-4 bg-gray-100 border-t-8 border-emerald-900">
      <div className="px-6">
        <Link to="/">
          <h1 className="text-2xl font-serif text-orange-800">Jon Bretman</h1>
        </Link>
      </div>
    </div>
  );
}
