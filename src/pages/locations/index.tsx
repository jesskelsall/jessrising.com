import { TContentArea } from "@/components/Header";
import { allGalleryPhotosList } from "@/data/galleryPhotos";
import { locationsDict } from "@/data/locationsDict";
import { tagsDict } from "@/data/tagsDict";
import { getLocationHierarchy } from "@/functions/locationsDict";
import { queryParamToStrings } from "@/functions/params";
import { isPhotoShown } from "@/functions/photo";
import { TQueryParam } from "@/types/gallery";
import { Location } from "@/types/location";
import _ from "lodash";
import { LucideChevronRight } from "lucide-react";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { createContext, useContext, useMemo, useState } from "react";

/* Prepare location & photo data */

const locationsList = Object.values(locationsDict);
const topLevelLocations = locationsList.filter((loc) => !loc.parent);

type LocationCounts = {
  self: number;
  total: number;
};

const locationCountsDict: Record<string, LocationCounts> = {};

locationsList.forEach((location) => {
  locationCountsDict[location.slug] = { self: 0, total: 0 };
});
allGalleryPhotosList.forEach((photo) => {
  const [location, ...nestedLocations] = getLocationHierarchy(
    photo.meta.location
  ).map((loc) => loc.slug);
  const photoIsShown = isPhotoShown({
    appliedLocationSlug: null,
    appliedTagSlugs: [],
    photo,
    tagsDict,
  });

  locationCountsDict[location].self += 1;
  locationCountsDict[location].total += 1;

  if (photoIsShown) {
    nestedLocations.forEach((loc) => {
      locationCountsDict[loc].total += 1;
    });
  }
});

/* Location components */

const FocusContext = createContext<string[]>([]);

const LocationList = ({
  isTopLevel,
  locations,
}: {
  isTopLevel?: boolean;
  locations: Location[];
}) => {
  const sortedLocations = _.sortBy(locations, "title");

  return (
    <div
      className={
        isTopLevel
          ? ""
          : "ml-2 border-l border-rising-700 pl-2 dark:border-rising-600"
      }
    >
      {sortedLocations.map((loc) => (
        // eslint-disable-next-line no-use-before-define
        <CollapsibleLocation key={loc.slug} location={loc} />
      ))}
    </div>
  );
};

const CollapsibleLocation = ({ location }: { location: Location }) => {
  const [focusLocation, ...focusParents] = useContext(FocusContext);

  const [isOpen, setIsOpen] = useState(focusParents.includes(location.title));
  const onCollapse = () => setIsOpen((currentOpen) => !currentOpen);

  const childLocations = locationsList.filter(
    (loc) => loc.parent === location.title
  );
  const hasChildLocations = childLocations.length > 0;

  const counts = locationCountsDict[location.slug];

  return (
    <div className="">
      <div className="flex">
        <button
          className={`flex ${hasChildLocations ? "cursor-pointer" : ""}`}
          onClick={hasChildLocations ? onCollapse : undefined}
          type="button"
        >
          <div
            className={`flex w-5 items-center justify-center transition duration-200 ${
              hasChildLocations ? "" : "invisible"
            } ${isOpen ? "rotate-90" : ""}`}
          >
            <LucideChevronRight
              height="16"
              width="16"
              className="text-rising-700 dark:text-rising-600"
            />
          </div>
          <div className="w-5">{location.emoji}</div>
        </button>
        <div>
          <span
            className={
              focusLocation === location.title
                ? "mx-[-2px] bg-rising-600 px-[2px] text-mono-900"
                : ""
            }
          >
            {location.title}
          </span>
          <a
            className="px-2 text-mono-500 no-underline visited:text-mono-500 hover:underline"
            href={`/gallery?location=${location.slug}${
              isOpen ? "&strict=1" : ""
            }`}
            target="_blank"
            rel="noreferrer"
          >
            {isOpen ? counts.self : counts.total}
          </a>
        </div>
      </div>
      {hasChildLocations && isOpen && (
        <LocationList locations={childLocations} />
      )}
    </div>
  );
};

/* Page */

interface IProps {
  contentArea: TContentArea;
  focus: string | null;
}

interface ILocationQuery extends ParsedUrlQuery {
  focus: TQueryParam;
}

export const getServerSideProps: GetServerSideProps<
  IProps,
  ILocationQuery
> = async (context) => {
  const focus = queryParamToStrings(context.query.focus)[0] || null;

  return {
    props: {
      contentArea: "blog",
      focus,
    },
  };
};

const LocationsPage: NextPage<IProps> = ({ focus }) => {
  const locationHierarchy = useMemo(() => {
    const focusLocation = locationsList.find((loc) => loc.slug === focus);
    return focusLocation
      ? getLocationHierarchy(focusLocation.title).map((loc) => loc.title)
      : [];
  }, [focus]);

  return (
    <main className="mx-auto max-w-screen-md select-none px-2">
      <h1>Locations</h1>
      <FocusContext.Provider value={locationHierarchy}>
        <LocationList locations={topLevelLocations} isTopLevel />
      </FocusContext.Provider>
    </main>
  );
};

export default LocationsPage;
