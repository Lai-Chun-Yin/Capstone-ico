import { convertToRaw, EditorState } from "draft-js";
// tslint:disable-next-line:no-var-requires
const draftToHtml = require("draftjs-to-html").default;
import * as React from "react";
// tslint:disable-next-line:no-var-requires
const Editor = require("react-draft-wysiwyg").Editor;
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class WYSISWYG extends React.Component {
  public state = {
    editorState: EditorState.createEmpty()
  };

  public render() {
    const { editorState } = this.state;
    return (
      <div>
        <div className="jr-card">
          <Editor
            editorStyle={{
              width: "100%",
              minHeight: 100,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "lightgray"
            }}
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            onEditorStateChange={this.onEditorStateChange}
          />
          <textarea
            style={{ width: "100%", height: 200 }}
            disabled={true}
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          />
        </div>
      </div>
    );
  }

  private onEditorStateChange = (editorState: any) => {
    this.setState({
      editorState
    });
  };
}

export default WYSISWYG;
