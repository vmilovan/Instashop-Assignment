interface DBFile {
  name: string;
  url: string;
}
export interface ILandmark {
  objectId: string;
  photo: DBFile;
  photo_thumb: DBFile;
  title: string;
  short_info: string;
  order: number;
  description?: string;
  url?: string;
}

export class Landmark implements ILandmark {
  objectId: string;
  photo_thumb: DBFile;
  photo: DBFile;
  title: string;
  short_info: string;
  order: number;
  description?: string;
  url?: string;

  constructor(landmark?: ILandmark) {
    this.objectId = landmark?.objectId ?? '';
    this.photo_thumb = landmark?.photo_thumb ?? { name: '', url: '' };
    this.photo = landmark?.photo ?? { name: '', url: '' };
    this.title = landmark?.title ?? '';
    this.short_info = landmark?.short_info ?? '';
    this.order = landmark?.order ?? -1;
    this.description = landmark?.description ?? '';
    this.url = landmark?.url ?? '';
  }

}