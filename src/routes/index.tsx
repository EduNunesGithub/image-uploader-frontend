import { createFileRoute } from '@tanstack/react-router';
import { ImageDropZone } from '@/components/image-drop-zone';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return (
    <main className="flex flex-col min-h-full w-full">
      <section className="flex h-full items-center justify-center p-6 sm:p-8 w-full">
        <div className="flex items-center justify-center max-w-page-container w-full">
          <ImageDropZone />
        </div>
      </section>
    </main>
  );
}
