/*
 *
 * MEDIA
 * **/
export interface ITokopediaMedia{
    type: string
    URLOriginal: string
    URLThumbnail: string
    description: string
    videoURLIOS: string
    isAutoplay: boolean
}


export interface ITokopediaMediaVideo{
    source: string
    url: string
}
