import { GalleryEvent } from "./gallery-event";
import { GalleryImage } from "./gallery-image";

export class GalleryResponse {
    constructor(
        public events: GalleryEvent[],
        public images: GalleryImage[],
    ) { }
}