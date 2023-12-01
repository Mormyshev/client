import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import {Row, Card} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className="d-flex">
            {device.brands.map(brand => 
                <Card
                    key = {brand.id}
                    onClick={()=> device.setSelectedBrand(brand)}
                    border = {brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    className="p-2"
                    style={{width:'auto', 'min-width':'100px', 'text-align':'center', 'margin-left':'10px', cursor: 'pointer'}}
                >
                    {brand.name}
                </Card>    
            )}
        </Row>
    )
})

export default BrandBar;