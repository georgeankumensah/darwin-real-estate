"use client"

import { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type ImageCarouselProps = {
  images: {
    src: string
    alt: string
  }[]
  options?: any
  showPagination?: boolean
  showThumbnails?: boolean
}

export default function ImageCarousel({
  images = [
    { src: "/placeholder.png?height=600&width=800", alt: "Gallery image 1" },
    { src: "/placeholder2.png?height=600&width=800", alt: "Gallery image 2" },
    { src: "/placeholder3.png?height=600&width=800", alt: "Gallery image 3" },
    { src: "/placeholder2.png?height=600&width=800", alt: "Gallery image 4" },
    { src: "/placeholder3.png?height=600&width=800", alt: "Gallery image 5" },
  ],
  options = { loop: true },
  showPagination = true,
  showThumbnails = false,
}: ImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  // Main carousel
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)

  // Thumbnail carousel
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  })

  const scrollPrev = useCallback(() => emblaMainApi && emblaMainApi.scrollPrev(), [emblaMainApi])
  const scrollNext = useCallback(() => emblaMainApi && emblaMainApi.scrollNext(), [emblaMainApi])

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return

    const newIndex = emblaMainApi.selectedScrollSnap()
    setSelectedIndex(newIndex)
    emblaThumbsApi.scrollTo(newIndex)

    setPrevBtnDisabled(!emblaMainApi.canScrollPrev())
    setNextBtnDisabled(!emblaMainApi.canScrollNext())
  }, [emblaMainApi, emblaThumbsApi])

  useEffect(() => {
    if (!emblaMainApi) return

    onSelect()
    emblaMainApi.on("select", onSelect)
    emblaMainApi.on("reInit", onSelect)

    return () => {
      emblaMainApi.off("select", onSelect)
      emblaMainApi.off("reInit", onSelect)
    }
  }, [emblaMainApi, onSelect])

  return (
    <div className="relative w-full">
      {/* Main carousel */}
      <div className="overflow-hidden rounded-lg" ref={emblaMainRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative" key={index}>
              <div className="h-[400px] md:h-[400px] relative overflow-hidden">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        {/* Navigation buttons */}
      <button
        className="absolute left-4 top-[200px] flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-all hover:bg-white disabled:opacity-50"
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        className="absolute right-4 top-[200px] flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-all hover:bg-white disabled:opacity-50"
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      </div>

      

      {/* Pagination dots (optional, can be removed if thumbnails are sufficient) */}
      {showPagination && (
        <div className="flex justify-center gap-2 mt-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full bg-gray-300 transition-all",
                selectedIndex === index && "bg-gray-800 scale-125",
              )}
              onClick={() => onThumbClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail carousel */}
      {showThumbnails && (
        <div className="mt-2 flex justify-start">
          <div className="overflow-hidden" ref={emblaThumbsRef}>
            <div className="flex gap-2 py-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => onThumbClick(index)}
                  className={cn(
                    "relative flex-0-0-auto min-w-0 w-20 h-20 cursor-pointer overflow-hidden rounded border-2 transition-all",
                    selectedIndex === index
                      ? "border-primary opacity-100"
                      : "border-transparent opacity-70 hover:opacity-100",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

