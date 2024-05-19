import browser from "webextension-polyfill";
import { getBrowserExtUrl } from "~/libs/addons";

export default function Footer() {
  return (
    <div
      id="footer"
      class="grid grid-cols-2 justify-center gap-x-2 divide-x divide-slate-300 border-t-2 border-slate-300 py-4 text-sm font-semibold dark:divide-slate-700 dark:border-slate-700"
    >
      <div class="flex items-center justify-center">
        <a
          href="https://qit.tools/"
          rel="noopener noreferrer"
          target="_blank"
          class="group flex items-center text-slate-600 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            class="mr-2 h-4 w-4 duration-300 ease-in-out group-hover:scale-125 rtl:ml-2"
            viewBox="0 0 36 36"
          >
            <path
              fill="#292F33"
              d="M3.651 29.852L29.926 3.576c.391-.391 2.888 2.107 2.497 2.497L6.148 32.349c-.39.391-2.888-2.107-2.497-2.497"
            />
            <path
              fill="#66757F"
              d="M30.442 4.051L4.146 30.347l.883.883L31.325 4.934z"
            />
            <path
              fill="#E1E8ED"
              d="m34.546 2.537l-.412-.412l-.671-.671a.967.967 0 0 0-.255-.169a.988.988 0 0 0-1.159.169l-2.102 2.102l.495.495l.883.883l1.119 1.119l2.102-2.102a.999.999 0 0 0 0-1.414M5.029 31.23l-.883-.883l-.495-.495l-2.209 2.208a.988.988 0 0 0-.169 1.159c.046.09.094.18.169.255l.671.671l.412.412a.999.999 0 0 0 1.414 0l2.208-2.208z"
            />
            <path
              fill="#F5F8FA"
              d="m31.325 4.934l2.809-2.809l-.671-.671a.967.967 0 0 0-.255-.169l-2.767 2.767zM4.146 30.347L1.273 33.22c.046.09.094.18.169.255l.671.671l2.916-2.916z"
            />
            <path
              fill="#FFAC33"
              d="m28.897 14.913l1.542-.571l.6-2.2a.667.667 0 0 1 1.287 0l.6 2.2l1.542.571a.665.665 0 0 1 0 1.25l-1.534.568l-.605 2.415a.667.667 0 0 1-1.293 0l-.605-2.415l-1.534-.568a.665.665 0 0 1 0-1.25M11.961 5.285l2.61-.966l.966-2.61a1.103 1.103 0 0 1 2.07 0l.966 2.61l2.609.966a1.103 1.103 0 0 1 0 2.07l-2.609.966l-.966 2.61a1.105 1.105 0 0 1-2.07 0l-.966-2.61l-2.61-.966a1.104 1.104 0 0 1 0-2.07M24.13 20.772l1.383-.512l.512-1.382a.585.585 0 0 1 1.096 0l.512 1.382l1.382.512a.584.584 0 0 1 0 1.096l-1.382.512l-.512 1.382a.585.585 0 0 1-1.096 0l-.512-1.382l-1.383-.512a.585.585 0 0 1 0-1.096"
            />
          </svg>{" "}
          Qit.tools
        </a>
      </div>
      <div class="flex items-center justify-center">
        <a
          href={getBrowserExtUrl()}
          rel="noopener noreferrer"
          target="_blank"
          class="group flex items-center text-slate-600 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            class="mr-2 h-4 w-4 fill-slate-700 duration-300 ease-in-out group-hover:scale-125 group-hover:fill-red-600 dark:fill-slate-300 dark:group-hover:fill-red-500 rtl:ml-2"
            viewBox="0 0 36 36"
          >
            <path d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242" />
          </svg>
          {browser.i18n.getMessage("link_like")}
        </a>
      </div>
    </div>
  );
}
