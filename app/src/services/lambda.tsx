import http from '../utils/http';

import { IMAGE_UPLOADER_URL } from '../constants/endpoints';

const NAMESPACE = 'generic';
const FOLDER = 'files';
const NAME = 'file';

export const uploadImage = async (
  image: any,
  name = NAME,
  folder = FOLDER,
  namespace = NAMESPACE
): Promise<any> => {
  const { data } = await http.post(IMAGE_UPLOADER_URL, {
    body: { namespace, folder, name, image },
  });

  return data;
};
