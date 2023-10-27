import React from "react";
import { Divider, Image } from "@/components/UI";
import { UploadImage, UploadImages } from "@/components/Control/type";

interface ViewAreaProps {
  title: string;
  items: UploadImages;
  handleRemove?: (image: UploadImage) => void;
}

const ViewArea: React.FC<ViewAreaProps> = ({ title = "", items = [], handleRemove }) => {
  return (
    <div className="upload-view-area">
      <Divider>{title}</Divider>
      <div className="area-images">
        {items.map((item) => (
          <Image
            key={item.id}
            src={item.url}
            objectFit="cover"
            hasView
            hasRemove
            onRemove={() => handleRemove?.(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewArea;
