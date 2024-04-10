import Link from "next/link";

function Header() {
  return (
    <nav className="sticky h-16 inset-x-0 top-0 z-30 w-full bg-transparent backdrop-blur-lg transition-all">
      <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div className="md:px-10 px-2.5">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex z-40 font-semibold items-center gap-2"
            >
              <div className="text-xl">
                <span>Storycraft AI</span>
              </div>
            </Link>
            <div className="hidden items-center space-x-4 sm:flex"></div>
            <div className="flex justify-center items-center flex-row space-x-4">
              <Link href="https://tduiazaqph.ap-south-1.awsapprunner.com/story?id=66db181a-95de-4fce-a94b-dd4876b536c4">
                <button
                  type="button"
                  className="mt-6 rounded-full bg-amber-600 py-2 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                  Sample Story
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
