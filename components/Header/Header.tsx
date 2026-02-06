import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        NoteHub
      </Link>
<ul>
  <AuthNavigation />
</ul>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link className={css.headerLink} href="/">Home</Link>
          </li>
          <li>
            <Link className={css.headerLink} href="/notes/filter/all">Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
