import { Button } from "@material-ui/core";
import * as React from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from 'react-dropzone';
import ContainerHeader from "../common/containerHeader";

// export interface IUserProfileProps {

// }

export interface IUserSettingState {
  file: File | null;
  editedImage: File | null;
  imageScale: number;
}

// const sliderStyles = {
//     width: 300
// };

class UserSetting extends React.Component<any, IUserSettingState> {
  constructor(props:any) {
    super(props);
    this.state = {
      file: null,
      editedImage: null,
      imageScale: 100
    }
  }
  public render() {
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader title="Account setting" />

        <div className="row">
          <div className="col-12">
            <div className="jr-card">
              <div className="jr-card-body ">
                <form>
                  Old password:
                  <br />
                  <input
                    className="form-control-sm m-2"
                    type="password"
                    name="firstname"
                  />
                  <br />
                  New password:
                  <br />
                  <input
                    className="form-control-sm m-2"
                    type="password"
                    name="lastname"
                  />
                  <br />
                  New username:
                  <br />
                  <input
                    className="form-control-sm m-2"
                    type="text"
                    name="lastname"
                  />
                  <br />
                  <h3>Please drop image into below area for changing profile picture.</h3>
                  <div>
                    <Dropzone
                      multiple={false}
                      accept="image/*"
                      disableClick={true}
                      style={{
                        width: "350px",
                        height: "350px"
                      }}
                      // tslint:disable-next-line:jsx-no-bind
                      onDrop={this.onImageDrop.bind(this)}>
                      <AvatarEditor
                        width={250}
                        height={250}
                        border={50}
                        scale={this.state.imageScale/100 }
                        image={this.state.file || ""}
                        // tslint:disable-next-line:jsx-no-bind
                        ref={this.setEditorRef.bind(this)}
                      />
                    </Dropzone>
                  </div>
                  <div>
                    <p>Scale:</p>
                    <input type="range" min="50" max="150" value={this.state.imageScale} onChange={this.scaleSliderHandler} />
                  </div>
                  <Button
                    className="jr-btn bg-primary text-white m-2"
                    type="submit"
                    value="Submit"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // private onFileChange = (event: any) => {
  //   this.setState({ file: event.target.files[0] });
  // }

  private onImageDrop(files: File[]) {
    this.setState({
      file: files[0]
    });
  }

  private setEditorRef(editor: any) {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const fileName = this.state.file ? this.state.file.name : "file.png";
      this.getCanvasBlob(canvas)
        .then((blob: Blob) => {
          const editedImage = new File([blob], fileName);
          this.setState({
            editedImage
          })
        })
    }
  }

  private getCanvasBlob(canvas: HTMLCanvasElement) {
    return new Promise((resolve, reject)=> {
      canvas.toBlob((blob: Blob)=> {
        resolve(blob);
      });
    });
  }

  private scaleSliderHandler = (e: any) => {
    this.setState({
      imageScale: +e.target.value
    })
  }
}

export default UserSetting;
