import ExifReader from "exifreader";

export type EXIFLoaded = ExifReader.Tags &
  ExifReader.XmpTags &
  ExifReader.IccTags;
