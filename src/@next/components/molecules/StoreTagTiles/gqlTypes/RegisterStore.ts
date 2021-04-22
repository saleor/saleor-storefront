export interface RegisterStore_storeRegister_errors {
    __typename: "Error";
    /**
     * Name of a field that caused the error. A value of `null` indicates that the
     * error isn't associated with a particular field.
     */
    field: string | null;
    /**
     * The error message.
     */
    message: string | null;
  }

export interface RegisterStore_storeRegister {
    __typename: "AccountRegister";
    /**
     * List of errors that occurred executing the mutation.
     */
    errors: RegisterStore_storeRegister_errors[];
    /**
     * Informs whether users need to confirm their email address.
     */
    requiresConfirmation: boolean | null;
  }
  
  export interface RegisterStore {
    /**
     * Register a new user.
     */
    accountRegister: RegisterStore_storeRegister | null;
  }

  export interface UpdateStore {
    /**
     * Register a new user.
     */
     storeUpdate: UpdateStore_storeUpdate | null;
  }

  export interface UpdateStore_storeUpdate {
    __typename: "StoreUpdate";
    /**
     * List of errors that occurred executing the mutation.
     */
    StoreErrors: UpdateStore_storeUpdate_errors[];
    /**
     * Informs whether users need to confirm their email address.
     */
    requiresConfirmation: boolean | null;
    store:StoreResponse
  }


  export interface StoreResponse {
    backgroundImage:{alt: string; __typename: "Image";};
    description: string;
    id: string;
    latlong: string;
    name: string;
    phone: string;
    __typename: "Store";
  }

  export interface UpdateStore_storeUpdate_errors {
    __typename: "StoreError";
    /**
     * Name of a field that caused the error. A value of `null` indicates that the
     * error isn't associated with a particular field.
     */
    field: string | null;
    /**
     * The error message.
     */
    message: string | null;
  }
  

export interface RegisterStoreVariables { 
    name: string;
    description?: string;
    storeTypeId: string;
    phone?: string;
    acreage?: number;
    latlong?: string;
    backgroundImage?: string;
    backgroundImageAlt?: string;
}
export interface UpdateStoreVariables { 
  name: string;
  id:string
  description?: string;
  storeTypeId: string;
  phone?: string;
  acreage?: number;
  latlong?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}


export interface IStoreType {
  storeTypes: StoreType | null;
}

export interface StoreType {
  __typename: "StoreTypeCountableConnection";
  edges: StoreTypeList_edges[];
}

export interface StoreTypeList_edges {
  __typename: "CategoryCountableEdge";
  node: StoreType_edges_node;
}

export interface StoreType_edges_node {
  __typename: "StoreType";
  id: string;
  name: string;
}

export interface IStoreUser{
  user:StoreUser | null
}

export interface StoreUser {
  store:{id:string, name:string}
}

export interface IStoreForUser{
  store:{
    name: string;
    description?: string;
    storeType:{
      id:string;
      name:string;
    }
    phone?: string;
    acreage?: number;
    latlong?: string;
    backgroundImage?: string;
    backgroundImageAlt?: string;
  }
}
