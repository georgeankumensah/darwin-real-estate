"use client"

import {useState, useCallback, useEffect} from "react"
import useEmblaCarousel from "embla-carousel-react"
import {ChevronLeft, ChevronRight} from "lucide-react"
import {cn} from "@/lib/utils"

type MediaItem = {
    src: string
    alt: string
    type?: "image" | "video" | "auto" // auto will detect based on file extension
}

type MediaCarouselProps = {
    media?: MediaItem[]
    options?: any
    showPagination?: boolean
    showThumbnails?: boolean
}

// Function to detect media type based on file extension
const getMediaType = (src: string, type?: string): "image" | "video" => {
    if (type === "image" || type === "video") return type

    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"]
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"]

    const extension = src.toLowerCase().split(".").pop() || ""

    if (videoExtensions.some((ext) => src.toLowerCase().includes(ext))) {
        return "video"
    }
    if (imageExtensions.some((ext) => src.toLowerCase().includes(ext))) {
        return "image"
    }

    // Default to image for placeholder URLs
    return "image"
}

export default function MediaCarousel(
    {
        media = [
            {src: "/placeholder.svg?height=600&width=800", alt: "Gallery image 1"},
            {src: "/placeholder.svg?height=600&width=800", alt: "Gallery image 2"},
            {src: "/placeholder.svg?height=600&width=800", alt: "Gallery image 3"},
            {src: "/placeholder.svg?height=600&width=800", alt: "Gallery image 4"},
            {src: "/placeholder.svg?height=600&width=800", alt: "Gallery image 5"},
        ],
        options = {loop: true},
        showPagination = true,
        showThumbnails = false,
    }: MediaCarouselProps) {
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

    const renderMediaItem = (item: MediaItem, index: number, isMain = true) => {
        const mediaType = getMediaType(item.src, item.type)
        const className = isMain
            ? "absolute inset-0 w-full h-full object-cover"
            : "absolute inset-0 h-full w-full object-cover"

        if (mediaType === "video") {
            return (
                <video
                    key={`${mediaType}-${index}`}
                    src={item.src}
                    className={className}
                    controls={isMain}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={item.alt}
                >
                    Your browser does not support the video tag.
                </video>
            )
        }

        return (
            <img key={`${mediaType}-${index}`} src={item.src || "/placeholder.svg"} alt={item.alt}
                 className={className}/>
        )
    }

    return (
        <div className="relative w-full">
            {/* Main carousel */}
            <div className="overflow-hidden rounded-lg" ref={emblaMainRef}>
                <div className="flex">
                    {media.map((item, index) => (
                        <div className="flex-[0_0_100%] min-w-0 relative" key={index}>
                            <div className="h-[400px] md:h-[400px] relative overflow-hidden">
                                {renderMediaItem(item, index, true)}
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
                    <ChevronLeft className="h-6 w-6"/>
                </button>

                <button
                    className="absolute right-4 top-[200px] flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-all hover:bg-white disabled:opacity-50"
                    onClick={scrollNext}
                    disabled={nextBtnDisabled}
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-6 w-6"/>
                </button>
            </div>

            {/* Pagination dots */}
            {showPagination && (
                <div className="flex justify-center gap-2 mt-2">
                    {media.map((_, index) => (
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
                            {media.map((item, index) => (
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
                                    {renderMediaItem(item, index, false)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
