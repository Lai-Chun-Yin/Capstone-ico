import { ContentState, convertToRaw, EditorState } from "draft-js";
import * as React from "react";
import renderField from "./renderField";
// tslint:disable-next-line:no-var-requires
const draftToHtml = require("draftjs-to-html").default;
// tslint:disable-next-line:no-var-requires
const Editor = require("react-draft-wysiwyg").Editor;
// tslint:disable-next-line:no-var-requires
const htmlToDraft = require("html-to-draftjs");
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface ITheFieldState {
  editorState: any;
}

class TheField extends React.Component<any, ITheFieldState> {
  constructor(props: any) {
    super(props);
    const editorState = this.initEditorState();
    this.state = {
      editorState
    };
    this.changeValue(editorState);
  }

  public render() {
    const { editorState } = this.state;
    return (
      <div id="react-wysiwyg" className="col-xs-12">
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          // tslint:disable-next-line:jsx-no-lambda no-shadowed-variable
          onEditorStateChange={(editorState: any) =>
            this.handleChange(editorState)
          }
        />
      </div>
    );
  }

  /**
   * Initialising the value for <Editor />
   */
  private initEditorState() {
    const html = "<p>Your content</p>";
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    return EditorState.createWithContent(contentState);
  }

  /**
   * This is used by <Editor /> to handle change
   */
  private handleChange(editorState: any) {
    this.setState({ editorState });
    this.changeValue(editorState);
  }

  /**
   * This updates the redux-form wrapper
   */
  private changeValue(editorState: any) {
    const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.props.input.onChange(value);
  }
}

export default renderField(TheField);
