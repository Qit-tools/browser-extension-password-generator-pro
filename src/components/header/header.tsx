import Fancy from "~/components/fancy/fancy";

export default function Header() {
  return (
    <>
      <Fancy />
      <div class="divide-slate-300 border-b-2 border-slate-300 p-4 dark:divide-slate-700 dark:border-slate-700">
        <h1 class="title-gradient text-center text-xl font-bold tracking-tighter">
          <a
            href="https://qit.tools/generators/password/"
            target="_blank"
            rel="noreferrer"
          >
            Password Generator ⚡ PRO
          </a>
        </h1>
      </div>
    </>
  );
}
