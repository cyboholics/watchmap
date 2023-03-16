import React from "react";
import {Box, Container, Grid, Switch, Typography} from "@mui/material";

type EndpointService = {
    allEndPoints: string[],
    allServices: string[],
    mapping: {
        endpoint: string,
        services: string[]
    }[]
}

export default function Home() {
    const [data, setData] = React.useState<EndpointService>({
        allEndPoints: [],
        allServices: [],
        mapping: []
    })
    const [failedServices, setFailedServices] = React.useState<string[]>([])
    const {allEndPoints, allServices, mapping} = data

    const isEndpointDown = (endpoint: string) => {
        const services = mapping.find((m) => {
            return m.endpoint === endpoint
        })?.services
        if (!services) return false
        for (const service of services) {
            if (failedServices.includes(service)) {
                return true
            }
        }
        return false
    }

    React.useEffect(() => {
        fetch('/api/endpoint-services').then(async (res) => {
            setData(await res.json())
        })
    }, [])
    return <Container sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    }}>
        <Container sx={{
            width: '70%'
        }}>
            <Grid container={true} spacing={2}>
                {
                    allServices.map((service) => {
                        return <Grid key={service} item={true} xs={12} sm={6} md={4}>
                            <Box sx={{
                                backgroundColor: '#99ff99',
                                padding: '10px',
                                borderRadius: '10px',
                            }}>
                                <Typography>{service}</Typography>
                                <Switch
                                    checked={!failedServices.includes(service)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFailedServices(failedServices.filter((s) => s !== service))
                                        } else {
                                            setFailedServices([...failedServices, service])
                                        }
                                    }}
                                />
                            </Box>
                        </Grid>
                    })
                }
            </Grid>
        </Container>
        <Container sx={{
            width: '30%',
        }}>
            {
                allEndPoints.map((endpoint) => {
                    return <Box key={endpoint}>
                        <Typography sx={{
                            color: isEndpointDown(endpoint) ? 'red' : 'green'
                        }}>{endpoint}</Typography>
                    </Box>
                })
            }
        </Container>
    </Container>
}

