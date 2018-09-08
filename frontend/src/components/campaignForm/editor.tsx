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
  editorState,
  input: { value, onChange },
  label,
  meta: { touched, error },
  onEditorStateChange
}: any) => (
  <div className="WysiwygEditor col-12 mb-4 mt-2">
    <label className="h2">{label}</label>
    {editorState && (
      <Editor
        editorStyle={{
          width: "100%",
          minHeight: 400,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "lightgray"
        }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        wrapperClassName="demo-wrapper"
        toolbar={{
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: false }
          },
          link: { inDropdown: true }
        }}
      />
    )}
    <p>
      If you can’t make a video, just write your story here instead. Tell what
      your goal is, why you want to reach it, and what will happen when you do.
      You can add formatting elements, pictures, links using the buttons above.
    </p>

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

function uploadImageCallBack(file: any) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID 7974689bac80017");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}
