import React, {createContext} from "react";
type EndpointService = {
    allEndPoints: string[],
    allServices: string[],
    mapping: {
        endpoint: string,
        services: string[]
    }[]
}
export const EndpointServiceContext = createContext<{
    data: EndpointService,
    setData: (data: EndpointService) => void
}>({
    data: {
        allEndPoints: [],
        allServices: [],
        mapping: []
    }, setData: (data: EndpointService) => {}
})

export const EndpointServiceProvider = ({children}:any) => {
    const [data, setData] = React.useState<EndpointService>({
        allEndPoints: [],
        allServices: [],
        mapping: []
    })

    return <EndpointServiceContext.Provider value={{data, setData}}>
        {children}
    </EndpointServiceContext.Provider>
}