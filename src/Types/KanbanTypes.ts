export type kanbanColumsProps = {
    id:number,
    title:string
}

export type cardsProps = {
    id:number,
    date: string,
    description: string,
    status: string,
    source:string,
    rating:number,
    verified: boolean,
    title:string,
    order?:any
}