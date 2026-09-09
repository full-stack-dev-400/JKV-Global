'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Highlighter, { HighlighterItem } from '../highlighter'

// Icons (keep your existing ones)
import CarouselImg01 from '@/public/images/carousel-icon-01.svg'
import CarouselImg02 from '@/public/images/carousel-icon-02.svg'
import CarouselImg03 from '@/public/images/carousel-icon-03.svg'
import CarouselImg04 from '@/public/images/carousel-icon-04.svg'
import CarouselImg05 from '@/public/images/carousel-icon-05.svg'

// 🔽 Backgrounds
import BgForex from '@/public/images/goldbar.jpg'
import BgCrypto from '@/public/images/goldchart1.jpg'
import BgCommodities from '@/public/images/metals1.jpg'
import BgEtfs from '@/public/images/stoneB.jpg'
import BgMetals from '@/public/images/carouselfive.jpg'

// Swiper
import Swiper, { Navigation } from 'swiper'
import 'swiper/swiper.min.css'
Swiper.use([Navigation])

export default function TestimonialsCarousel() {
  const [swiperInitialized, setSwiperInitialized] = useState<boolean>(false)

  useEffect(() => {
    const carousel = new Swiper('.stellar-carousel', {
      breakpoints: { 320: { slidesPerView: 1 }, 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
      grabCursor: true,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      spaceBetween: 24,
      navigation: { nextEl: '.carousel-next', prevEl: '.carousel-prev' },
    })
    setSwiperInitialized(true)
  }, [])

  // Card data
  const cards = [
    {
      title: 'Forex',
      image: BgForex,
      icon: CarouselImg01,
      text: `Forex is not a traditional exchange but a global over-the-counter (OTC) market with no central location. It operates virtually, enabling traders worldwide to buy and sell currencies anytime through a decentralized network of banks and brokers.`,
    },
    {
      title: 'Crypto',
      image: BgCrypto,
      icon: CarouselImg02,
      text: `Stonefort Securities lets you trade CFDs on Bitcoin, Ethereum, and other top cryptocurrencies with speed, precision, and reliability.`,
    },
    {
      title: 'Commodities',
      image: BgCommodities,
      icon: CarouselImg03,
      text: `Trading commodities including energy, metals, and agricultural products connects investors worldwide and offers opportunities to diversify and profit from global market movement.`,
    },
    {
      title: 'ETFs',
      image: BgEtfs,
      icon: CarouselImg04,
      text: `An ETF (Exchange-Traded Fund) is a pooled investment that trades like a stock, tracking assets such as commodities or indices. It offers diversification, low costs, and flexible trading during market hours.`,
    },
    {
      title: 'Metals',
      image: BgMetals,
      icon: CarouselImg05,
      text: `Trade CFDs on gold, silver, platinum, and palladium with Stonefort Securities using live charts and advanced tools giving you flexibility to seize every market opportunity.`,
    },
    {
      title: 'Stocks',
      image: BgMetals,
      icon: CarouselImg05,
      text: `Trade CFDs on leading global stocks such as Amazon, Apple, Microsoft, and more, without owning the shares. Speculate on price movements with leverage and take advantage of advanced trading tools to maximize your market potential.`,
    },
  ]

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-8 md:pt-16">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-8 md:pb-12">
            <div>
              <div className="inline-flex font-medium bg-clip-text text-transparent bg-linear-to-r from-[#4D6E55] to-[#87AB93] pb-3">
                What can you trade with Stonefort Securities
              </div>
            </div>
            <h2 className="h2 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              Explore Diverse Market Opportunities
            </h2>
            <p className="text-lg text-slate-400">
              Access global markets with the reliability and innovation of Stonefort Securities.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative before:absolute before:inset-0 before:-translate-x-full before:z-20 before:bg-linear-to-l before:from-transparent before:to-slate-900 before:to-20% after:absolute after:inset-0 after:translate-x-full after:z-20 after:bg-linear-to-r after:from-transparent after:to-slate-900 after:to-20%">
            <div className="stellar-carousel swiper-container group">
              <Highlighter className="swiper-wrapper w-fit" refresh={swiperInitialized}>
                {cards.map((card, i) => (
                  <HighlighterItem key={i} className="swiper-slide h-auto group/slide">
  <article className="relative h-[260px] sm:h-[300px] md:h-[420px] rounded-[inherit] overflow-hidden isolate">
    {/* BG image (behind everything) */}
    <Image
      src={card.image}
      alt={card.title}
      fill
      priority
      className="object-cover z-0"
      sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, 50vw"
    />

    {/* Overlay (middle layer) */}
    <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-black/40 via-black/20 to-transparent" />

    {/* Optional glow */}
    <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none z-10 w-1/3 aspect-square">
      <div className="absolute inset-0 rounded-full bg-slate-800/40 group-[.swiper-slide-active]/slide:bg-[#4D6E55] transition-colors duration-500 blur-[60px]" />
    </div>

    {/* Content (top layer) */}
    <div className="relative z-20 h-full p-4 md:p-6 flex flex-col justify-between text-[#fff]">
      <Image className="mb-3" src={card.icon} width={56} height={56} alt={card.title} />
      <div className="grow">
        <h3 className="font-semibold text-2xl drop-shadow">{card.title}</h3>
        <p className="mt-4 max-w-xs text-[#fff]  drop-shadow">{card.text}</p>
      </div>
      <div className="text-right">
        <a className="text-sm font-medium text-[#fff] bg-[#4D6E55] rounded-50 hover:text-white inline-flex items-center transition duration-150 ease-in-out group" href="#0">
          Learn More
          <span className="ml-1 text-[#4D6E55] group-hover:translate-x-0.5 transition-transform duration-150">-&gt;</span>
        </a>
      </div>
    </div>
  </article>
</HighlighterItem>

                ))}
              </Highlighter>
            </div>
          </div>

          {/* Arrows */}
          <div className="flex mt-8 justify-end">
            <button className="carousel-prev relative z-20 w-12 h-12 flex items-center justify-center group">
              <span className="sr-only">Previous</span>
              <svg
                className="w-4 h-4 fill-slate-500 group-hover:fill-[#4D6E55] transition duration-150 ease-in-out"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
              </svg>
            </button>
            <button className="carousel-next relative z-20 w-12 h-12 flex items-center justify-center group">
              <span className="sr-only">Next</span>
              <svg
                className="w-4 h-4 fill-slate-500 group-hover:fill-[#4D6E55] transition duration-150 ease-in-out"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
