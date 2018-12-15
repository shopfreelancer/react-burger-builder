import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(i => {
            return (
                <li key={i}>
                    <span style={ { textTransform: 'capitalize' } }>{ i }: </span>
                    { props.ingredients[i] }
                </li>
            )
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your burger has the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    )
};

export default orderSummary;