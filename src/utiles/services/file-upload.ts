export const handleFileUpload = (e: any) => {
  console.log('file ipload')
  const reader = new FileReader();
  if (e) {
    reader.onload = (onLoadEvent) => {
      if (onLoadEvent.target) {
        console.log(onLoadEvent.target.result)
        return onLoadEvent.target.result
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
};