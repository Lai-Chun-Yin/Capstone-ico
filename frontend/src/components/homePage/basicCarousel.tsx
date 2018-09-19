import * as React from "react";
import {
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem
} from "reactstrap";
import { carousel1, carousel2, carousel3 } from "../ImagesImport";

const items = [
  {
    id: 1,
    altText: "Slide 1",
    caption: "Slide 1",
    src: carousel1
  },
  {
    id: 2,
    altText: "Slide 2",
    caption: "Slide 2",
    src: carousel2
  },
  {
    id: 3,
    altText: "Slide 3",
    caption: "Slide 3",
    src: carousel3
  }
];

// interface IBasicCarouselProps {}

interface IBasicCarouselState {
  activeIndex: number;
}

class BasicCarousel extends React.Component<any, IBasicCarouselState> {
  private animating = false;

  constructor(props: any) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  public render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          key={item.id}
          onExiting={this.onExiting}
          onExited={this.onExited}>
          <img
            src={item.src}
            alt={item.altText}
            className="img-fluid home-carousel"
          />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </Carousel>
    );
  }

  private onExiting() {
    this.animating = true;
  }

  private onExited() {
    this.animating = false;
  }

  private next() {
    if (this.animating) {
      return;
    }
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  private previous() {
    if (this.animating) {
      return;
    }
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  private goToIndex(newIndex: number) {
    if (this.animating) {
      return;
    }
    this.setState({ activeIndex: newIndex });
  }
}

export default BasicCarousel;
