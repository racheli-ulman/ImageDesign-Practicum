export interface Photo {
    Id?:number
    UserId: number,
    PhotoName: string,
    AlbumId:number,
    PhotoPath?: string,
    PhotoSize: number,
    // UploadedAt?:Date
    tagId:string
  } 