export interface Event {
    event: EventData,
    sessions: EventSessions[]
}

export interface EventData {
    id: string,
    title: string,
    subtitle: string,
    image: string
}

export interface ShoppingCartEvent {
    id: string,
    title: string,
    subtitle: string,
    sessions: EventSessions[]
}

export interface EventSessions {
    date: string,
    availability: number
}

export interface AllEvents {
    id: string,
    title: string,
    subtitle: string,
    image: string,
    place: string,
    startDate: number,
    endDate: number,
    description: string
}
