export type ItineraryCategory = 'food' | 'sightseeing' | 'nightlife' | 'transport' | 'other';
export type TimeSlot = 'morning' | 'afternoon' | 'evening';

export interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
}

export interface Trip {
    id: string;
    name: string;
    organizerId: string;
    memberIds: string[];
    destinationIds: string[];
    chosenDestinationId: string | null;
    departureDate: string;
    returnDate: string;
    createdAt: string;
}

export interface TripDetail extends Trip {
    members: User[];
    destinations: Destination[];
    chosenDestination: Destination | null;
}

export interface TripSummary {
    id: string;
    name: string;
    departureDate: string;
    returnDate: string;
    members: User[];
    chosenDestination: Destination | null;
}

export interface Destination {
    id: string;
    name: string;
    tripId: string;
    nominatedById: string;
    aiSummary: string | null;
    weatherData: WeatherData | null;
    flightEstimate: number | null;
    voteCount: number;
    hasVoted: boolean;

}

export interface Expense {
    id: string;
    tripId: string;
    name: string;
    description: string;
    amountCents: number;
    paidById: string;
    splitBetweenIds: string[];
    createdAt: string;
}

export interface WeatherData {
    tempC: number;
    condition: string;
    icon?: string;
}

export interface ItineraryItem {
    id: string;
    tripId: string;
    day: number;
    title: string;
    description: string;
    location: string;
    category: ItineraryCategory;
    timeSlot: TimeSlot;
}

export interface Message {
    id: string;
    tripId: string;
    senderId: string | null;
    content: string;
    isAi: boolean;
    timestamp: string;
}

export interface SettlementTransaction {
    payerId: string;
    payeeId: string;
    amountCents: number;
}

