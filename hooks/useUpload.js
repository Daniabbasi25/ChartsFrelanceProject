import { Storage } from "aws-amplify"

const useUpload = () => {

  const upload = async ({ key, file, setProgress }) => {

    const result = await Storage.put(key, file, {
      contentType: file.type,
      progressCallback(progress) {
        setProgress(progress);
      },
    });

    return {
      filename: file.name,
      size: file.size,
      key: result.key,
    }
  }

  const download = async ({ key }) => {
    try {
      return await Storage.get(key);
    } catch (err) {
      console.error(err)
    }
  }

  const uploadAvatar = async ({ id, file, setProgress }) => {
    const fileName = file.name.split(".");
    const extension = fileName[fileName.length - 1];

    const key = `avatar/${id}.${extension}`;
    const res = await upload({ key, file, setProgress });
    const newAvatar = await download({ key: res.key });

    return {
      avatar: newAvatar,
      title: `${id}.${extension}`,
      contentType: file.type,
      url: key,
    };
  }

  return { upload, download, uploadAvatar }
}

export default useUpload;