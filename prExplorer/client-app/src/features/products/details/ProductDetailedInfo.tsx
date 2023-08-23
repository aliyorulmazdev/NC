import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { Product } from "../../../app/models/product";

interface Props {
    product: Product
}

export default observer(function ProductDetailedInfo({product}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='orange' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{product.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='tag' size='large' color='orange'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              Category: {product.category}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='money bill alternate' size='large' color='orange'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
            ₺{product.price} /  ₺{product.discountPercentage} Discount
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='cubes' size='large' color='orange'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {product.stock} PCS
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='heart outline' size='large' color='orange'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        AVG : <span>{product.rating}</span> Rating
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})