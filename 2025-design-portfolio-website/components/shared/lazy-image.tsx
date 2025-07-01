"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface Props {
  priority?: boolean
}

const LazyImage: React.FC<Props> = ({ priority }) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!imgRef.current || priority) {
      setIsVisible(true)
      return
    }

    const currentImgRef = imgRef.current // Store ref in a variable

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" },
    )

    observer.observe(currentImgRef)

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef)
      }
    }
  }, [priority])

  return <img ref={imgRef} src={isVisible ? "image.jpg" : ""} alt="Content" />
}

export default LazyImage
