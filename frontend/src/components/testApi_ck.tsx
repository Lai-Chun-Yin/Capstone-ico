import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../reducers';
import { loadCampaignsThunk } from '../reducers/campaigns/actions';
import { loadCommentsThunk } from '../reducers/comments/actions';
import { loadTokensThunk } from '../reducers/tokens/actions';
import { loadTransactionsThunk } from '../reducers/transactions/actions';
import { loadWatchlistsThunk } from '../reducers/watchlists/actions';

interface ITestApiProps {
  campaigns: CapstoneICO.ICampaign[];
  comments: CapstoneICO.IComment[];
  tokens: CapstoneICO.IToken[];
  transactions: CapstoneICO.ITransaction[];
  watchlists: CapstoneICO.ICampaign[];
  isAuthenticated: boolean;
  user: {
    [key: string]: any;
  };
  reloadCampaign: () => void;
  reloadComment: () => void;
  reloadToken: () => void;
  reloadTransaction: () => void;
  reloadWatchlist: () => void;
}

class PureTestApi extends React.Component<ITestApiProps> {
  public componentWillMount() {
    this.props.reloadCampaign();
    this.props.reloadComment();
    this.props.reloadToken();
    this.props.reloadTransaction();
    this.props.reloadWatchlist();
  }

  public render() {
    return (
      <div>
        <div>
          <h3>Welcome, {this.props.user.alias}</h3>
          <h4>Campaigns</h4>
          {this.props.campaigns.map(campaign => (
            <ul className="list-campaign" key={campaign.id}>
              <li className="list-campaign-item">{campaign.title}</li>
              <li className="list-campaign-item">{campaign.short_description}</li>
              <li className="list-campaign-item">{campaign.start_date}</li>
              <li className="list-campaign-item">{campaign.end_date}</li>
              <li className="list-campaign-item">{campaign.soft_cap}</li>
              <li className="list-campaign-item">{campaign.hard_cap}</li>
            </ul>
          ))}
        </div>
        <div>
          <h4>Comments</h4>
          {this.props.comments.map(comment => (
            <ul className="list-comment" key={comment.id}>
              <li className="list-comment-item">{comment.user_id}</li>
              <li className="list-comment-item">{comment.content}</li>
              <li className="list-comment-item">{comment.created_at}</li>
              <li className="list-comment-item">{comment.updated_at}</li>
            </ul>
          ))}
        </div>
        <div>
          <h4>Tokens</h4>
          {this.props.tokens.map(token => (
            <ul className="list-token" key={token.id}>
              <li className="list-token-item">{token.user_id}</li>
              <li className="list-token-item">{token.name}</li>
              <li className="list-token-item">{token.symbol}</li>
              <li className="list-token-item">{token.token_decimal_place}</li>
            </ul>
          ))}
        </div>
        <div>
          <h4>Displaying Logged-In User's Transactions only</h4>
          {this.props.transactions.map(transaction => (
            <ul className="list-transaction" key={transaction.id}>
              <li className="list-transaction-item">{transaction.date}</li>
              <li className="list-transaction-item">{transaction.amount}</li>
              <li className="list-transaction-item">{transaction.tx_hash}</li>
              <li className="list-transaction-item">{transaction.campaign_id}</li>
            </ul>
          ))}
        </div>
        <div>
          <h4>Campaigns in User Watchlist</h4>
          {this.props.watchlists.map(watchlist => (
            <ul className="list-watchlist" key={watchlist.id}>
              <li className="list-watchlist-item">{watchlist.title}</li>
              <li className="list-watchlist-item">{watchlist.short_description}</li>
              <li className="list-watchlist-item">{watchlist.start_date}</li>
              <li className="list-watchlist-item">{watchlist.end_date}</li>
              <li className="list-watchlist-item">{watchlist.soft_cap}</li>
              <li className="list-watchlist-item">{watchlist.hard_cap}</li>
            </ul>
          ))}
        </div>
      </div>
    );
  }
}

export const TestApi = connect(
  (state: IRootState) => ({
    campaigns: state.campaign.campaigns,
    comments: state.comment.comments,
    tokens: state.token.tokens,
    transactions: state.transaction.transactions,
    watchlists: state.watchlist.watchlists,
    user: state.auth.user
  }),
  (dispatch: any) => ({
    reloadCampaign: () => dispatch(loadCampaignsThunk()),
    reloadComment: () => dispatch(loadCommentsThunk()),
    reloadToken: () => dispatch(loadTokensThunk()),
    reloadTransaction: () => dispatch(loadTransactionsThunk()),
    reloadWatchlist: () => dispatch(loadWatchlistsThunk())
  })
)(PureTestApi);