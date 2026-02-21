import { createFileRoute, notFound } from '@tanstack/react-router';
import { ImageZone } from '@/components/image-zone';
import { getImage } from '@/server/image';

export const Route = createFileRoute('/images/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      return await getImage({ data: { id: Number(params.id) } });
    } catch {
      throw notFound();
    }
  },
});

function RouteComponent() {
  const image = Route.useLoaderData();

  return (
    <main className="flex flex-col min-h-full w-full">
      <section className="flex h-full items-center justify-center p-6 sm:p-8 w-full">
        <div className="flex items-center justify-center max-w-page-container w-full">
          <ImageZone image={image} />
        </div>
      </section>
    </main>
  );
}
