import { Photo } from "./photo"

export interface Member {
knownAs: any
    id: number
    username: string
    photoUrl: string
    age: number
    knowAs: string
    created: Date
    lastActive: Date
    gender: string
    introduction: string
    lookingFor: string
    interests: string
    city: string
    country: string
    photos: Photo[]
}