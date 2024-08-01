import { useState } from "react";
import { LoadingComponent } from "../loading/LoadingComponent";

interface ImageProp{
  srcImage: string,
  altImage: string
}

export const ImageComponent = ({srcImage, altImage}: ImageProp) => {

  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = () => {
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <LoadingComponent />}
      <img 
        src={srcImage} 
        alt={altImage}
        onLoad={handleImageLoaded}
        hidden={isLoading}
      ></img>
    </>
  )
}