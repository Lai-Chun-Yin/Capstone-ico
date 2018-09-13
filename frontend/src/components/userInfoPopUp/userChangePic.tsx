import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import * as React from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { IRootState } from "../../reducers";
import { userPicThunk } from "../../reducers/auth/actions";

export interface IUserChangePicProps {
  changePic: (request: any) => void;
}

export interface IUserChangePicState {
  file: File | null;
  editedImage: File | null;
  imageScale: number;
  dialog: any;
}

class UserChangePic extends React.Component<IUserChangePicProps, IUserChangePicState> {
  constructor(props: IUserChangePicProps) {
    super(props);
    this.state = {
      file: null,
      editedImage: null,
      imageScale: 100,
      dialog: {
        open: false,
        trial: false,
        message: ""
      }
    };
  }

  public render() {
    const newPicReady = this.state.file ? true : false;
    return (
      <div className="dropzone-card text-center mb-4">
        <div className="dropzone">
          <p className="h2">
            Please drop image into below area for changing profile picture.
          </p>
          <div>
            <Dropzone
              className="p-0"
              multiple={false}
              accept="image/*"
              // tslint:disable-next-line:jsx-no-bind
              onDrop={this.onImageDrop.bind(this)}
            >
              <AvatarEditor
                // @ts-ignore
                className="col-12 p-0"
                height={150}
                scale={this.state.imageScale / 100}
                image={this.state.file || ""}
                // tslint:disable-next-line:jsx-no-bind
                ref={this.setEditorRef.bind(this)}
              />
            </Dropzone>
          </div>

          <div>
            <p className="h2">Scale:</p>
            <input
              type="range"
              min="50"
              max="150"
              value={this.state.imageScale}
              onChange={this.scaleSliderHandler}
            />
          </div>
          <Button
            disabled={!newPicReady}
            onClick={this.onSubmit}
            color="primary"
          >
            Confirm Change
          </Button>
        </div>
        <Dialog open={this.state.dialog.open} onClose={this.handleDialogClose}>
          <DialogTitle>Notice</DialogTitle>
          <DialogContent>
            <p>{this.state.dialog.message}</p>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  private onImageDrop = (files: File[]) => {
    this.setState({
      file: files[0]
    });
  };

  private setEditorRef(editor: any) {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const fileName = this.state.file ? this.state.file.name : "file.png";
      this.getCanvasBlob(canvas).then((blob: Blob) => {
        const editedImage = new File([blob], fileName);
        this.setState({
          editedImage
        });
      });
    }
  }

  private getCanvasBlob(canvas: HTMLCanvasElement) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob: Blob) => {
        resolve(blob);
      });
    });
  }

  private scaleSliderHandler = (e: any) => {
    this.setState({
      imageScale: +e.target.value
    });
  };

  private onSubmit = async (event: any) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (this.state.file && this.state.editedImage) {
      const fileType = this.state.file.type.replace("image/", "");
      try {
        const uploadConfig = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/upload?fileType=${fileType}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // upload the file to S3 directly after
        await axios.put(uploadConfig.data.url, this.state.editedImage, {
          headers: {
            "Content-Type": this.state.file.type
          }
        });
        this.props.changePic(uploadConfig.data.key);
        this.setState({
          dialog: {
            open: true,
            trial: true,
            message: "Image has been uploaded."
          }
        });
      } catch (err) {
        this.setState({
          dialog: {
            open: true,
            trial: true,
            message: "Fail to change image."
          }
        });
      }
    }
  };

  private handleDialogClose = () => {
    this.setState({
      dialog: {
        open: false,
        trial: false,
        message: ""
      }
    });
  };
}

const mapStateToProps = (state: IRootState) => {
  return {
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changePic: (image: any) => dispatch(userPicThunk({ url: image }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserChangePic);
