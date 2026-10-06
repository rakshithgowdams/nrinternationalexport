"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProductImage } from "@/data/products";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: false });
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const many = images.length > 1;

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setIndex(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  function select(next: number) {
    embla?.scrollTo(next);
    setIndex(next);
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg bg-white" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <div key={image.src} className="min-w-0 flex-[0_0_100%]">
              <button type="button" className="block w-full" onClick={() => setOpen(true)} aria-label={`Enlarge ${name} photograph`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      {many ? (
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex gap-2">
            <button type="button" className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-white" aria-label="Previous photograph" onClick={() => select(Math.max(0, index - 1))}>
              <ChevronLeft className="size-4" />
            </button>
            <button type="button" className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-white" aria-label="Next photograph" onClick={() => select(Math.min(images.length - 1, index + 1))}>
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="flex gap-2">
            {images.map((image, imageIndex) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Show photograph ${imageIndex + 1} of ${name}`}
                onClick={() => select(imageIndex)}
                className={`h-14 w-16 overflow-hidden rounded-md border transition-colors ${imageIndex === index ? "border-olive" : "border-line"}`}
              >
                <img
                  src={image.src}
                  alt=""
                  width={64}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay fixed inset-0 z-50 bg-forest/80" />
          <Dialog.Content className="dialog fixed inset-4 z-50 flex items-center justify-center">
            <Dialog.Title className="sr-only">{name} photograph</Dialog.Title>
            <img
              src={images[index]?.src}
              alt={images[index]?.alt}
              width={1200}
              height={900}
              decoding="async"
              className="max-h-full max-w-full rounded-lg object-contain"
            />
            <Dialog.Close className="absolute top-2 right-2 inline-flex size-11 items-center justify-center rounded-md bg-white" aria-label="Close photograph">
              <X className="size-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
