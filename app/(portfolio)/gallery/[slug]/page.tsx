import Image from "next/image";
import { notFound } from "next/navigation";
import galleryBg2 from "@/public/gallery-bg-2.svg";
import galleryIcon from "@/public/gallery-avatar.svg";
import { Label } from "@/components/ui/label";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";

const GALLERY_QUERY = `*[_type == "gallery" && (slug.current == $slug || _id == $slug)][0]{
  _id,
  galleryTitle,
  galleryDescription,
  galleryImages[]{

    _key,
    title,
    asset->{
      _ref,
      _id,
      metadata { dimensions { width, height } }
    }
  }
}`;

type SanityImage = {
  _key?: string;
  title?: string;
  asset?: {
    _ref?: string;
    _id?: string;
    metadata?: { dimensions?: { width?: number; height?: number } };
  };
};

type Gallery = {
  galleryTitle?: string;
  galleryDescription?: string;
  galleryImages?: SanityImage[];
};

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: GALLERY_QUERY,
    params: { slug },
  });
  const gallery = data as Gallery | null;

  if (!gallery) {
    notFound();
  }

  return (
    <div>
      <div>
        <div className="relative w-full h-48 sm:h-60 md:h-72">
          <Image
            src={galleryBg2}
            alt="Default Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-40">
          <Image src={galleryIcon} alt="Gallery Icon" width={80} height={80} />

          <div className="mt-10">
            <Label className="text-2xl font-mono">{gallery.galleryTitle}</Label>
          </div>

          {gallery.galleryDescription && (
            <div className="mt-10">
              <Label className="bg-secondary text-xl px-2">Overview</Label>
              <p className="mt-2 text-neutral-700">
                {gallery.galleryDescription}
              </p>
            </div>
          )}

          {gallery.galleryImages && gallery.galleryImages.length > 0 && (
            <div className="mt-10 mb-10">
              <Label className="bg-secondary text-xl px-2">Images</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {gallery.galleryImages.map((image, index) => {
                  if (!image?.asset) return null;
                  const dims = image.asset.metadata?.dimensions;
                  const width = dims?.width ?? 1200;
                  const height = dims?.height ?? 800;
                  const src = urlFor(image).width(1200).url();
                  const imageTitle = image.title?.trim();
                  return (
                    <div
                      key={image._key ?? index}
                      className="overflow-hidden rounded-md border border-neutral-200 bg-neutral-50"
                    >
                      <Image
                        src={src}
                        alt={`${gallery.galleryTitle ?? "Gallery"} image ${index + 1}`}
                        width={width}
                        height={height}
                        className="h-auto w-full object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <Label className="block px-3 py-2 text-sm font-medium text-neutral-700">
                        {imageTitle || `Image ${index + 1}`}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
