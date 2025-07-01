// /components/layout/footer.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Footer({ routes }: { routes: { name: string, path: string }[] }) {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route changes
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <footer>
      <div>
        <div>
          {/* Logo and description */}
          <div>
            <Link href="/">
              <span>
                Coriyon&rsquo;s <span>Studio</span>
              </span>
            </Link>
            <p>
              Senior Product Designer with a biomedical engineering background. I specialize in creating seamless
              customer experiences for tech startups and enterprises.
            </p>
          </div>

          {/* Navigation columns */}
          <div>
            <div>
              <h3>Main</h3>
              <ul>
                {routes.map(({ name, path }) => (
                  <li key={path}>
                    <Link href={path}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            <p>
              &copy; {new Date().getFullYear()} Coriyon&rsquo;s Studio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
