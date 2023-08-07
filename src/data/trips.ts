import { Trip, TripSlug } from "../types/trip";
import tripsJSON from "./trips.json";

export const allTripsList: Trip[] = tripsJSON.map((trip) => Trip.parse(trip));

export const allTripsDict = allTripsList.reduce<Record<TripSlug, Trip>>(
  (acc, next) => ({ ...acc, [next.slug]: next }),
  {}
);

export const allTripSlugs: TripSlug[] = allTripsList.map((trip) => trip.slug);
