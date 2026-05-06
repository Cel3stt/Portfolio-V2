import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import galleryBg2 from "@/public/gallery-bg-2.svg";
import galleryIcon from "@/public/gallery-avatar.svg";
import { Label } from "@/components/ui/label";
import { sanityFetch } from "@/sanity/lib/live";
import GalleryImageGroup from "@/components/sections/gallery-image-group";

const GALLERY_QUERY = `*[_type == "gallery" && (slug.current == $slug || _id == $slug)][0]{
  _id,
  galleryTitle,
  galleryDescription,
  galleryImages[]{
    _key,
    imageTitle,
    images[]{
      _key,
      asset->{
        _ref,
        _id,
        metadata { dimensions { width, height } }
      }
    }
  }
}`;

type SanityImage = {
  _key?: string;
  asset?: {
    _ref?: string;
    _id?: string;
    metadata?: { dimensions?: { width?: number; height?: number } };
  };
};

type ImageGroup = {
  _key?: string;
  imageTitle?: string;
  images?: SanityImage[];
};

type Gallery = {
  galleryTitle?: string;
  galleryDescription?: PortableTextBlock[];
  galleryImages?: ImageGroup[];
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
        <div className="relative w-full h-40 sm:h-52 md:h-60">
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

          {gallery.galleryDescription &&
            gallery.galleryDescription.length > 0 && (
              <div className="mt-10">
                <Label className="bg-secondary text-xl px-2">Overview</Label>
                <div className="mt-2 text-neutral-700">
                  <PortableText value={gallery.galleryDescription} />
                </div>
              </div>
            )}

          {gallery.galleryImages && gallery.galleryImages.length > 0 && (
            <div className="mt-10 mb-10 space-y-8">
              <Label className="bg-secondary text-3xl px-2">Images</Label>

              {gallery.galleryImages.map((group, groupIndex) => (
                <GalleryImageGroup
                  key={group._key ?? groupIndex}
                  imageTitle={group.imageTitle}
                  images={group.images}
                  groupAlt={gallery.galleryTitle}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
