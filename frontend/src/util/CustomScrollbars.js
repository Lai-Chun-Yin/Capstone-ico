import React from 'react'
import {Scrollbars} from 'react-custom-scrollbars';

const CustomScrollbars = (props) => <Scrollbars  {...props} autoHide
/* tslint:disable-next-line */
                                                 renderTrackHorizontal={props => <div {...props}
                                                                                      style={{display: 'none'}}
                                                                                      className="track-horizontal"/>}/>;

export default CustomScrollbars;