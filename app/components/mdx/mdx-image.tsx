import Image from "next/image";
import { getLocalImage } from "@/lib/images";

interface MdxImageProps {
  src: string;
  alt: string;
  border?: boolean;
  caption?: string;
}

export default async function MdxImage({
  src,
  alt,
  border = false,
  caption,
}: MdxImageProps) {
  const { base64, img } = await getLocalImage(src);

  // Calculate aspect ratio
  const aspectRatio = img.height / img.width;

  return (
    <figure className="mx-auto mb-10 w-full max-w-[672px] sm:mb-16">
      <div
        className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl ${
          border ? "border border-border/60" : ""
        }`}
        style={{ paddingBottom: `${aspectRatio * 100}%` }}
      >
        <Image
          src={img.src}
          alt={alt}
          fill
          sizes="(max-width: 480px) 200vw, (max-width: 672px) 100vw, 200vw" //Fight me
          className="object-cover"
          placeholder="blur"
          blurDataURL={base64}
          quality={100}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-pretty px-1 text-center text-sm text-muted sm:text-base md:mt-4">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
