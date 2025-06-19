export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-green-600 text-white py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold">Welcome to My Home Page</h1>
      </header>

      <main className="max-w-3xl mx-auto py-12 px-6">
        <p className="text-lg">
          Hello! This is a simple home page created with <strong>Next.js</strong> and <strong>Tailwind CSS</strong>.
          You can customize this section with your own content, add links, and more.
        </p>
      </main>

      <footer className="text-center text-sm text-gray-500 py-6 border-t">
        &copy; 2025 My Website
      </footer>
    </div>
  );
}
