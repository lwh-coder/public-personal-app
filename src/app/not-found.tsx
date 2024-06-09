export default function Page() {
    return(
        <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">
          404
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          This post was not found.
        </p>
        <a
          href="/"
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Go back home
        </a>
      </div>
        </>
    )
}