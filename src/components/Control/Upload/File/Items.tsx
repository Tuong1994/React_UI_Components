import React from "react";
import { UploadImage, UploadImages } from "../../type";
import { HiTrash } from "react-icons/hi2";

interface FileUploadItemsProps {
  files: UploadImages;
  handleRemove: (file: UploadImage) => void;
}

const FileUploadItems: React.FC<FileUploadItemsProps> = ({ files = [], handleRemove }) => {
  return (
    <div className="upload-items">
      {files &&
        files.map((file) => {
          const { file: uploadFile, id } = file;
          return (
            <div key={id} className="items-inner">
              <span>{uploadFile?.name}</span>
              <HiTrash className="inner-icon" onClick={() => handleRemove(file)} />
            </div>
          );
        })}
    </div>
  );
};

export default FileUploadItems;
