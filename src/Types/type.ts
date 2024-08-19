
export interface Widget{
    id:string;
    title:string;
    text:string;

}

export interface Category{
    id:number;
    category:string;
    widgets:Widget[];
}

export interface RenderDataProp{
    Data:Category[];
    searchTerm:string;
}

export interface WidgetBoxProp{
    title:string;
    text:string;
    handleDeleteClick:(Cid:number,Wid:string)=>void;
    Cid:number;
    Wid:string;
    searchTerm:string
}
export interface ModalProp{
    Data:Category[];
    selectedId:number
}