import { LocationsDict } from "../types/location";
import locationsDictJSON from "./locationsDict.json";

export const locationsDict = LocationsDict.parse(locationsDictJSON);
