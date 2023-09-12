import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { Category } from '../../../app/models/category';

interface Props {
    category: Category
}

export default observer(function CategoryDetailedInfo({category}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='orange' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{category.description}</p>
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
              Category: {category.title}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='money bill alternate' size='large' color='orange'/>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='cubes' size='large' color='orange'/>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='heart outline' size='large' color='orange'/>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})