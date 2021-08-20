import { useKeenSlider } from 'keen-slider/react'
import React, {
  Children,
  isValidElement,
  useState,
  useRef,
  useEffect,
} from 'react'
import cn from 'classnames'
import s from './HeroSlider.module.css'
import SliderControl from './SliderControl'

interface HeroSliderProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  height?: number
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  children,
  className = '',
  height = 600,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const sliderContainerRef = useRef<HTMLDivElement>(null)

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slidesPerView: 1,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      const slideNumber = s.details().relativeSlide
      setCurrentSlide(slideNumber)
    },
  })

  // Stop the history navigation gesture on touch devices
  useEffect(() => {
    const preventNavigation = (event: TouchEvent) => {
      // Center point of the touch area
      const touchXPosition = event.touches[0].pageX
      // Size of the touch area
      const touchXRadius = event.touches[0].radiusX || 0

      // We set a threshold (10px) on both sizes of the screen,
      // if the touch area overlaps with the screen edges
      // it's likely to trigger the navigation. We prevent the
      // touchstart event in that case.
      if (
        touchXPosition - touchXRadius < 10 ||
        touchXPosition + touchXRadius > window.innerWidth - 10
      )
        event.preventDefault()
    }

    const slider = sliderContainerRef.current!

    slider.addEventListener('touchstart', preventNavigation)

    return () => {
      if (slider) {
        slider.removeEventListener('touchstart', preventNavigation)
      }
    }
  }, [])

  const onPrev = React.useCallback(() => slider.prev(), [slider])
  const onNext = React.useCallback(() => slider.next(), [slider])

  return (
    <div
      className={cn(s.root, className)}
      style={{
        height: `${height}px`,
      }}
      ref={sliderContainerRef}
    >
      <div
        ref={ref}
        className={cn(s.slider, { [s.show]: isMounted }, 'keen-slider')}
      >
        {slider && <SliderControl onPrev={onPrev} onNext={onNext} />}
        {children}
      </div>
    </div>
  )
}

export default HeroSlider
