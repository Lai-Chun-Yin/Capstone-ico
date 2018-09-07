import { ContentState, convertToRaw, EditorState } from "draft-js";
import * as React from "react";
import { FormFeedback } from "reactstrap";
import { compose, withHandlers, withPropsOnChange, withState } from "recompose";
// tslint:disable-next-line:no-var-requires
const Editor = require("react-draft-wysiwyg").Editor;
// tslint:disable-next-line:no-var-requires
const htmlToDraft = require("html-to-draftjs").default;
// tslint:disable-next-line:no-var-requires
const draftToHtml = require("draftjs-to-html").default;
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const WysiwygEditor = ({
  input: { value, onChange },
  meta: { touched, error },
  editorState,
  onEditorStateChange
}: any) => (
  <div className="WysiwygEditor">
    {editorState && (
      <Editor
        editorStyle={{
          width: "100%",
          minHeight: 100,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "lightgray"
        }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        wrapperClassName="demo-wrapper"
      />
    )}
    {touched && error && <FormFeedback>{error}</FormFeedback>}
  </div>
);

export default compose(
  withState("editorState", "setEditorState", EditorState.createEmpty()),
  withPropsOnChange(
    ["input"],
    ({ input: { value }, meta: { dirty }, setEditorState }) => {
      if (dirty) {
        return;
      }
      if (!value) {
        return;
      }
      const contentBlock = htmlToDraft(value);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  ),
  withHandlers({
    onEditorStateChange: ({ input: { onChange }, setEditorState }) => (
      editorState: any
    ) => {
      setEditorState(editorState);
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      onChange(html);
    }
  })
)(WysiwygEditor);
