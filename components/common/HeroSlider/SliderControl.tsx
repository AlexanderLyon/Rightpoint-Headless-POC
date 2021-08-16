import { FC, MouseEventHandler, memo } from 'react'
import cn from 'classnames'
import s from './SliderControl.module.css'
import { ArrowLeft, ArrowRight } from '@components/icons'

interface SliderControl {
  onPrev: MouseEventHandler<HTMLButtonElement>
  onNext: MouseEventHandler<HTMLButtonElement>
}

const SliderControl: FC<SliderControl> = ({ onPrev, onNext }) => (
  <div className={s.control}>
    <button
      className={cn(s.leftControl)}
      onClick={onPrev}
      aria-label="Previous Image"
    >
      <ArrowLeft />
    </button>
    <button
      className={cn(s.rightControl)}
      onClick={onNext}
      aria-label="Next Image"
    >
      <ArrowRight />
    </button>
  </div>
)

export default memo(SliderControl)
