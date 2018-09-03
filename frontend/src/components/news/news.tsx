import * as React from "react";
import { getNews } from "../../services/newsService";
import ContainerHeader from "../common/containerHeader";
import ImageBottomCard from "./imageBottomCard";

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
    const { data } = await getNews();
    const news = data.articles;

    this.setState({ news });
  }

  public render() {
    const { news } = this.state;

    return (
      <React.Fragment>
        <ContainerHeader title="Latest news" />

        <div className="row mb-md-4">
          {news.length > 0 &&
            news.map((element: any) => {
              return (
                <div
                  className="col-md-4 col-sm-6 col-12"
                  key={news.indexOf(element)}
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
      </React.Fragment>
    );
  }
}

export default News;
