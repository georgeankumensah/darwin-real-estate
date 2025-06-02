"use client";
import { Star } from "lucide-react";
import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const TestimaonialsData = [
  {
    id: 1,
    name: "Peter Lowe",
    username: "@peterlowex",
    date: "May 19, 2027",
    image: "/images/people/person-1.jpg",
    testimonial:
      "As a founder, having a visually appealing and user-friendly website is essential. This tool not only helped me achieve that but also improved my site's performance and SEO.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    username: "@sarahjohnson",
    date: "June 15, 2027",
    image: "/images/people/person-2.jpg",
    testimonial:
      "I was amazed at how easy it was to create a professional-looking site. The templates are modern and customizable, making it perfect for my startup.",
  },
  {
    id: 3,
    name: "Michael Smith",
    username: "@michaelsmith",
    date: "July 10, 2027",
    image: "/images/people/person-3.jpg",
    testimonial:
      "The customer support is outstanding! They helped me with every question I had during the setup process. Highly recommend this tool for any founder.",
  },
  {
    id: 4,
    name: "Emily Davis",
    username: "@emilydavis",
    date: "August 5, 2027",
    image: "/images/people/person-4.jpg",
    testimonial:
      "This tool has transformed my website. The design is sleek, and the features are exactly what I needed to showcase my startup effectively.",
  },
  {
    id: 5,
    name: "Emily Davis",
    username: "@emilydavis",
    date: "August 5, 2027",
    image: "/images/people/person-4.jpg",
    testimonial:
      "This tool has transformed my website. The design is sleek, and the features are exactly what I needed to showcase my startup effectively.",
  },
];

const Testimonials = () => {
  const autoplayRef = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: false ,playOnInit: true,})
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: true,
      direction: "ltr",
      startIndex: 0,
    },
    [autoplayRef.current]
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section>
      <div className="isolate -z-10 absolute h-full w-full top-0 left-0 bg-primary-2700"></div>

      <div className="pt-12 md:pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-balance font-display tracking-tight text-5xl sm:text-5xl text-primary-0">
              What our customers are saying
            </h2>
          </div>
        </div>
        <div className="relative flex justify-center max-w-[calc(100vw-8rem)] mx-auto">
          <div
            className="overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent_0,black_10%,black_90%,transparent_100%)] py-12"
            ref={emblaRef}
          >
            <div
              // x-ref="testimonials"
              className="flex items-center  px-[5px] w-full"
            >
              {/* <!-- Item #1 --> */}
              {TestimaonialsData.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className={cn("rotate-[-2deg]  h-full min-w-[350px]  bg-[#435468]/40 mx-[10px] text-white backdrop-blur-lg rounded-xl p-5",
                    {"rotate-2": testimonial.id % 2 === 0},
                    // {"rotate-[-2deg]": testimonial.id % 2 !== 0},
                  )}
                >
                  <header className="flex  gap-3 mb-4">
                    <img
                      src={"/placeholder.png"}
                      className="shrink-0  w-12 h-12 object-cover rounded-full"
                      alt={`Testimonial ${testimonial.id}`}
                    /> 
                    <div>
                      <div className="font-body text-balance leading-6 font-semibold text-primary-0">
                        {testimonial.name}
                      </div>
                      <div>
                        <a
                          className="text-balance leading-5 text-sm text-secondary-0/70 transition"
                          href="#0"
                        >
                          {testimonial.username}
                        </a>
                      </div>
                    </div>
                  </header>
                  <div className="grow font-body text-balance text-base leading-6 text-primary-300">
                    {testimonial.testimonial}
                  </div>
                  <footer className="mt-4 flex items-center gap-2.5 opacity-50">
                    <svg
                      className="text-primary-300"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        color="currentColor"
                      >
                        <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                        <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
                      </g>
                    </svg>
                    <div className="font-body text-balance leading-5 text-sm text-primary-300">
                      {testimonial.date}
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
