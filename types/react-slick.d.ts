declare module 'react-slick' {
  import { Component } from 'react';

  export interface Settings {
    infinite?: boolean;
    slidesToShow?: number;
    slidesToScroll?: number;
    dots?: boolean;
    arrows?: boolean;
    autoplay?: boolean;
    autoplaySpeed?: number;
    pauseOnHover?: boolean;
    swipe?: boolean;
    swipeToSlide?: boolean;
    draggable?: boolean;
    responsive?: Array<{
      breakpoint: number;
      settings: Settings;
    }>;
  }

  export interface SliderProps {
    children?: React.ReactNode;
    className?: string;
  }

  export default class Slider extends Component<SliderProps & Settings> {
    slickNext(): void;
    slickPrev(): void;
    slickGoTo(slideNumber: number): void;
  }
}
