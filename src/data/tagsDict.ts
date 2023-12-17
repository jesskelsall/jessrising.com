import { TagsDict } from "../types/tag";
import tagsDictJSON from "./tagsDict.json";

export const tagsDict = TagsDict.parse(tagsDictJSON);
