import FilePreview from "./FilePreview";
import { AddIcon } from "../Icons";
import clsx from "clsx";
import styles from "../styles/DropZone.module.css";

const {
  dropzone,
  title,
  subtitle,
  fileInput,
  fileWindow,
  wrapper,
  errorMessage,
  fileWindowError
} = styles;

const DropZone = ({ data, dispatch, error }) => {

  const handleFileSelect = (e) => {
    let files = [...e.target.files];
    
    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);
      files = files.filter((f) => !existingFiles.includes(f.name));
      
      dispatch({ type: "ADD_FILE_TO_LIST", files });
    }
  };

  return (
    <>
      <div
        className={dropzone}
      >
        <div className={wrapper}>
          <h2 className={title}>
            Dokument hochladen
          </h2>
          <h3 className={subtitle}>
            Klicken Sie auf die Schaltfläche oder ziehen Sie ein Dokument im PDF-, DOCX-, PNG.
          </h3>

          <FilePreview data={data} dispatch={dispatch}/>
        </div>

        <div>
          <label className={error ? fileWindowError : fileWindow} htmlFor="files">
            <AddIcon/>
            <input
              className={fileInput}
              id="files"
              type="file"
              multiple
              accept=".pdf,.docx,.png"
              onChange={(e) => handleFileSelect(e)}
            />
          </label>
          <p className={clsx(errorMessage, error ? '!block' : null)}>{error}</p>
        </div>
      </div>
    </>
  );
};

export default DropZone;