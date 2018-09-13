import * as React from "react";
import OwlCarousel from "react-owl-carousel";
import ContainerHeader from "../common/containerHeader";
import { aboutus1 } from "../ImagesImport";
import { aboutus2 } from "../ImagesImport";
import { aboutus3 } from "../ImagesImport";
import {
  benImage,
  ckImage,
  client1,
  client2,
  client3,
  client4,
  client5,
  maxImage,
  tommyImage
} from "../ImagesImport";
import Client from "./componets/client";
import Service from "./componets/service";
import Team from "./componets/team";

const services = [
  {
    id: "Startoken",
    title: "Startoken",
    description:
      "We developed Startoken to bring innovative projects to life with the use of blockchain technology. Startoken is an ecosystem-based platform enabling projects to raise funds via crypto-currency and bridge investors with the projects.",
    image: aboutus1
  },
  {
    id: "box-idea",
    title: "Out of the Box Idea",
    description:
      "The team of Startoken consists of creators, finance experts and blockchain enthuaists who are early adopters of crypto currencies.",
    image: aboutus2
  },
  {
    id: "easy-token",
    title: "Easy ICO platform",
    description:
      "Since the birth of Bitcoin in 2009, cryptocurrency has given us good demonstrations on the applications in terms of cross-broader funding and microfinancing. Startoken aims to promote the adoption of blockchain technology and establish a smarter society.",
    image: aboutus3
  }
];
const teams = [
  {
    name: "Tommy Lai",
    destination: "Team member",
    description: "Frontend / backend developer, blockchain developer",
    image: tommyImage,
    github: "https://github.com/Lai-Chun-Yin"
  },
  {
    name: "CK C",
    destination: "Team member",
    description: "Frontend / backend developer, blockchain developer",
    image: ckImage,
    github: "https://github.com/nerdyckc"
  },
  {
    name: "Benjamin Tin",
    destination: "Team member",
    description:
      "Blockchain expert, frontend / backend developer, web designer, business development",
    image: benImage,
    github: "https://github.com/benjaimess"
  },
  {
    name: "Max Fong",
    destination: "Team member",
    description: "Frontend / backend developer",
    image: maxImage,
    github: "https://github.com/plat123456789"
  }
];

const clients = [
  {
    image: client1
  },
  {
    image: client2
  },
  {
    image: client3
  },
  {
    image: client4
  },
  {
    image: client5
  },
  {
    image: client5
  }
];

const AboutUs = ({ match }: any) => {
  const options = {
    loop: true,
    rewind: true,
    autoplay: true,
    margin: 20,
    responsiveRefreshRate: 100,
    responsive: {
      0: {
        items: 1
      },

      400: {
        items: 2
      },

      600: {
        items: 4
      },
      1000: {
        items: 5
      }
    }
  };

  const options1 = {
    loop: true,
    rewind: true,
    autoplay: true,
    margin: 20,
    responsiveRefreshRate: 100,
    responsive: {
      "0": {
        items: 1
      },

      "650": {
        items: 2
      },
      "950": {
        items: 3
      }
    }
  };

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader title="About Us" />
      <section>
        <OwlCarousel className="owl-theme mb-4" items={1} margin={20}>
          <Service service={services[0]} />
          <Service service={services[1]} />
          <Service service={services[2]} />
        </OwlCarousel>
      </section>

      <OwlCarousel className="owl-theme mb-4" {...options1}>
        <Team team={teams[0]} />
        <Team team={teams[1]} />
        <Team team={teams[2]} />
        <Team team={teams[3]} />
      </OwlCarousel>

      <OwlCarousel className="owl-theme mb-4 owl-app-frame" {...options}>
        <Client client={clients[0]} />
        <Client client={clients[1]} />
        <Client client={clients[2]} />
        <Client client={clients[0]} />
        <Client client={clients[1]} />
        <Client client={clients[2]} />
        <Client client={clients[0]} />
        <Client client={clients[1]} />
        <Client client={clients[2]} />
      </OwlCarousel>
    </div>
  );
};

export default AboutUs;
