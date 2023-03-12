import {Button, Container} from "@mui/material";
import React from "react";
import {CollectionTree} from "../components/CollectionTree";

export default function Home() {
    const [collection, setCollection] = React.useState();
    return (
        <Container>
            <Button
                variant="contained"
                component="label"
            >
                Upload File
                <input
                    type="file"
                    onChange={(e) => {
                        if (!e.target.files) return
                        const file = e.target.files[0]
                        if (!file) return
                        // read json file
                        const reader = new FileReader()
                        reader.onload = (e) => {
                            const text = e.target?.result
                            if (typeof text === 'string') {
                                const data = JSON.parse(text)
                                setCollection(data)
                            }
                        }
                        reader.readAsText(file)
                    }}
                    accept="application/json"
                    hidden
                />
            </Button>
            {collection && <Button onClick={async ()=>{
                await fetch('/api/record', {
                    method: 'POST',
                    body: JSON.stringify(collection)
                })
            }}>
                Start Recording
            </Button>}
            {collection && <CollectionTree collectionData={collection}/>}
        </Container>
    )
}
