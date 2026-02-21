import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const UploadSchema = z.object({
  file: z
    .file()
    .max(2 * 1024 * 1024, 'Max file size is 2MB')
    .mime(
      ['image/gif', 'image/jpeg', 'image/png'],
      'Only JPG, PNG and GIF are allowed',
    ),
});

export const uploadImage = createServerFn({ method: 'POST' })
  .inputValidator((data) => {
    if (!(data instanceof FormData)) throw new Error('Expected FormData');
    return UploadSchema.parse({ file: data.get('file') });
  })
  .handler(async ({ data }) => {
    const formData = new FormData();
    formData.append('file', data.file);

    const response = await fetch(`${process.env.API_URL}/api/upload`, {
      body: formData,
      headers: { 'x-api-key': process.env.API_KEY! },
      method: 'POST',
    });

    if (!response.ok) throw new Error('Upload failed');
    return response.json() as Promise<Image>;
  });
