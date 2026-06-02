'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';

// Shared Embla carousel controls + a drag guard for clickable slides (so a
// swipe doesn't trigger the slide's link). Used by the services & blog carousels.
export function useCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({align: 'start', loop: false});
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const downX = useRef(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Spread on each clickable slide: suppresses navigation when the pointer was
  // dragged rather than clicked.
  const slideProps = {
    onPointerDown: (e: React.PointerEvent) => {
      downX.current = e.clientX;
    },
    onClick: (e: React.MouseEvent) => {
      if (Math.abs(e.clientX - downX.current) > 8) e.preventDefault();
    },
  };

  return {
    emblaRef,
    prev: () => emblaApi?.scrollPrev(),
    next: () => emblaApi?.scrollNext(),
    canPrev,
    canNext,
    slideProps,
  };
}
