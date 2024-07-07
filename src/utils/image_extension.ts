// Check Image Extension
export const getImageExtension = (mimetype: string) => {
  switch (mimetype) {
    case 'image/png':
      return '.png';
    case 'image/PNG':
      return '.PNG';
    case 'image/jpg':
      return '.jpg';
    case 'image/JPG':
      return '.JPG';
    case 'image/JPEG':
      return '.JPEG';
    case 'image/jpeg':
      return '.jpeg';
    case 'image/webp':
      return '.webp';
    case 'video/mp4':
      return '.mp4';
    case 'video/quicktime':
      return '.mov';
    case 'video/webm':
      return '.webm';
    case 'video/x-msvideo':
      return '.avi';
    default:
      return false;
  }
};

export default getImageExtension;
