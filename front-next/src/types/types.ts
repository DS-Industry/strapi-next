import { UUID } from "crypto";

export type StrapiResponseArray<A> = {
        data : Array<StrapiData<A>>        
}

export type StrapiResponseObject<A> = {
    data : StrapiData<A>
}

export type StrapiData<A> = {
    id: number,
    attributes: A
}

type TaskBody = Array<{
        type: string,
        children: [
            {
                type: string,
                text: string
            }
        ]
    }>

export type TaskAttributes = {
    title: string,
    slug: UUID,
    body: TaskBody,
    type: string,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    priority: string,
    isClosed: boolean,
    isDeleted: boolean,
    dueDate: Date,
    timeSpent: number,
    parentTask: StrapiResponseObject<TaskAttributes>,
    asiignees: StrapiResponseArray<UserAttributes>,
    status: StrapiResponseObject<StatusAttributes>,
    departments: StrapiResponseArray<DepartmentAttributes>,    
    subCategory: StrapiResponseObject<SubCategoryAttributes>,
    attachments: StrapiResponseArray<any> | null,
    resolution: StrapiResponseObject<CommentAttributes>,  
    comments: StrapiResponseArray<CommentAttributes>,      
    closedBy: StrapiResponseObject<UserAttributes>  | null
    category: StrapiResponseObject<CategoryAttributes>,
    carWashes: StrapiResponseArray<CarWashAttributes>,    
    createdUserBy: StrapiResponseObject<UserAttributes>,
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
    publishedAt: Date,
    type: string
}

export type StatusAttributes = {
    name: string,
    slig: UUID,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date
    tasks: StrapiResponseArray<TaskAttributes>,
    taskTemplates:StrapiResponseArray<TaskTemplateAttributes>

}

export type CommentAttributes = {
    text: string,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    createdUserBy: StrapiResponseObject<UserAttributes>,
    tasks: StrapiResponseObject<TaskAttributes>,
}


export type PriorityAttributes = {
    name: string,
    slug: string,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    taskTemplates: StrapiResponseArray<TaskTemplateAttributes>
}

export type DepartmentAttributes = {
    name: string,
    slug: string,
    createdAt : Date,
    updatedAt: Date,
    publishedAt: Date,
    categories: StrapiResponseArray<CategoryAttributes>,
    taskTemplates: StrapiResponseArray<TaskTemplateAttributes>,
    tasks: StrapiResponseArray<TaskAttributes>,
}

export type CategoryAttributes = {
    name: string,
    slug: string,
    createdAt : Date,
    updatedAt: Date,
    publishedAt: Date,
    department: StrapiResponseObject<DepartmentAttributes>,
    tasks: StrapiResponseArray<TaskAttributes>,
    subCategories: StrapiResponseArray<SubCategoryAttributes>,
    taskTemplates: StrapiResponseArray<TaskTemplateAttributes>
}

export type SubCategoryAttributes = {
    name: string,
    slug: string,
    createdAt : Date,
    updatedAt: Date,
    publishedAt: Date,
    tasks: StrapiResponseArray<TaskAttributes>,
    category: StrapiResponseObject<CategoryAttributes>,
    taskTemplates: StrapiResponseArray<TaskTemplateAttributes>
}

export type AttachmentsAttributes = {
    name: string,
    alternativeText: string,
    captiom: string,
    createdAt: Date,
    updatedAt: Date,
    mime: string,
    size: number,
    url: string,
}

export type TaskTemplateAttributes = {
    name: string,
    slug: string,
    createdAt : Date,
    updatedAt: Date,
    publishedAt: Date,
    assignToUsers: StrapiResponseArray<UserAttributes>,
    department: StrapiResponseObject<DepartmentAttributes>,
    category: StrapiResponseObject<CategoryAttributes>,
    subCategory: StrapiResponseObject<SubCategoryAttributes>,
    status: StrapiResponseObject<StatusAttributes>,
    priority: StrapiResponseObject<PriorityAttributes>,

}