import * as React from "react";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
// tslint:disable-next-line:ordered-imports
import FourthPage from "./FourthPage";

export interface ICampaignFormState {
  page: number;
}

class CampaignForm extends React.Component<any, ICampaignFormState> {
  constructor(props: any) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }
  public render() {
    const { onSubmit } = this.props;
    const { page } = this.state;

    return (
      <div>
        {page === 1 && <FirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <SecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <ThirdPage previousPage={this.previousPage} onSubmit={this.nextPage} />
        )}
        {page === 4 && (
          <FourthPage previousPage={this.previousPage} onSubmit={onSubmit} />
        )}
      </div>
    );
  }
  private nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  private previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
}

export default CampaignForm;
