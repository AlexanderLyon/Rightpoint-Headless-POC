import React from 'react'
import cn from 'classnames'

interface SlideProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

const Slide: React.FC<SlideProps> = ({ children, className = '' }) => (
  <>
    <div className={`${className ? `${className} ` : ''}keen-slider__slide`}>
      {children}
    </div>
  </>
)

export default Slide
