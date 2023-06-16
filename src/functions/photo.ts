import { CAMERA_DISPLAY_NAME } from "../consts/photo";

// Get the camera's display name instead of the data name, if possible
export const getCameraDisplayName = (camera: string): string =>
  CAMERA_DISPLAY_NAME[`${camera}`] || camera;
