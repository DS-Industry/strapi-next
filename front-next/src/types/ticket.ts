import { UUID } from "crypto";

export type StrapiResponse<A> = {
    data: {
        data : Array<{
            id: number,
            attributes: A
        }>        
    }

}

export type StrapiData<A> = {
    id: number,
    attributes: A
}

export type TicketAttributes = {
    name: string,
    body: string,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    slug: UUID,
    isClosed: boolean,
    createdDate: Date,
    closedDate: Date,
    timeSpent: number,
    createdUserBy: StrapiResponse<UserAttributes>,
    todos: StrapiResponse<TodoAttributes>,

}

export type TodoAttributes = {
    name: string,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    slug: UUID,
    body: string,
    ticketId: number
}


export type UserAttributes = {
    username: string,
    email: string,
    provider: string,
    cofirmed: boolean,
    blocked: boolean,
    createdAt: Date,
    updatedAt: Date,
    lastname: string,
    lastLoginAt: Date,
    name: string,
}

export type CarWashAttributes = {
    name: string,
    address: string,
    city: string,
    createdAt: Date,
    updatedAt: Date,
    carWashType: string,
    slug : UUID,
    latitude: number,
    lonitude: number,
    publishedAt: Date
}

export type StatusAttributes = {
    name: string,
    slig: UUID,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date

}
/* 

export type CommentAttributes = {
    ... some data ...
}

*/

export type PriorityAttributes = {
    name: string,
    slug: string,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date
}

export type DepartmentAttributes = {
    name: string,
    slug: string,
    createdAt : Date,
    updatedAt: Date,
    publishedAt: Date
}