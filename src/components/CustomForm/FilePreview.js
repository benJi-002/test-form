import { FileIcon, DeleteIcon } from "../Icons";
import styles from "../styles/FilePreview.module.css";

const {
  fileList,
  file,
  fileIcon,
  deleteIcon
} = styles;

const FilePreview = ({ data, dispatch }) => {

  const handleFileDelete = (e) => {
    let file = e.target.outerText;
    
    if (file && file.length > 0) {
      const files = data.fileList.filter((f) => f.name !== file);

      dispatch({ type: "REMOVE_FILE_FROM_LIST", files });
    }
  }

  return (
      <ol className={fileList}>
        {data.fileList.map((f) => {
          return (
              <li key={f.lastModified} className={file} onClick={(e) => handleFileDelete(e)}>
                <div className={fileIcon}><FileIcon className={'w-max'}/></div>
                {f.name}
                <div className={deleteIcon}><DeleteIcon className={'w-max pointer-events-none'}/></div>
              </li>
          );
        })}
      </ol>
  );
};

export default FilePreview;