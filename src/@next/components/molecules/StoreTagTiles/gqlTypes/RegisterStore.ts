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
