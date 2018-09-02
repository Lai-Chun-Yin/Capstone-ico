/* tslint:disable */
import * as React from 'react';

interface IYoutubeProps {
    videoId: string;
}

class Youtube extends React.Component<IYoutubeProps,{}>{

    public render(){
        return (
            <div className="embed-responsive embed-responsive-16by9">
            <iframe width="560" height="315" className="embed-responsive-item"
            src={"https://www.youtube.com/embed/"+this.props.videoId}
            frameBorder="0" allowFullScreen></iframe>
            </div>
        )
    }
}

export default Youtube;