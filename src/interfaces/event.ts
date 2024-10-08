export interface Event {
    event: EventData,
    sessions: EventSessions[]
}

export interface EventData {
    id: number,
    title: string,
    subtitle: string,
    image: string
}

export interface ShoppingCartEvent {
    id: number,
    title: string,
    subtitle: string,
    sessions: EventSessions[]
}

export interface EventSessions {
    date: number,
    availability: number
}

export interface AllEvents {
    id: number,
    title: string,
    subtitle: string,
    image: string,
    place: string,
    startDate: number,
    endDate: number,
    description: string
}
