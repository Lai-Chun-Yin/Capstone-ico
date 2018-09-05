import * as Nprogress from "nprogress";
import "nprogress/nprogress.css";
import * as React from "react";
import { getNews } from "../../services/newsService";
import ContainerHeader from "../common/containerHeader";
import ImageBottomCard from "./newsList";

interface Iarticle {
  author: string | null;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

interface INewsState {
  news: Iarticle[];
}

class News extends React.Component<any, INewsState> {
  constructor(props: any) {
    super(props);
    this.state = { news: [] };
  }

  public async componentDidMount() {
    Nprogress.start();

    const { data } = await getNews();
    const news = data.articles;

    this.setState({ news });

    Nprogress.done();
  }

  public render() {
    const { news } = this.state;

    return (
      <div>
        <ContainerHeader title="Latest news" />

        <div className="row mb-md-4">
          {news.length > 0 &&
            news.map((element: any, i: number) => {
              return (
                <div
                  className="col-md-4 col-sm-6 col-12 mb-4 animated slideInUpTiny animation-duration-3"
                  key={i}
                >
                  <ImageBottomCard
                    title={element.title}
                    url={element.url}
                    img={element.urlToImage}
                    author={element.author}
                    date={element.publishedAt}
                    description={element.description}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default News;
