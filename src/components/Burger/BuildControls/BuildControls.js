import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={ classes.BuildControls }>
        <div>Current price: <strong>{ props.totalPrice.toFixed(2) }</strong></div>
        { controls.map((control, index) => (
            <BuildControl
                disabled={ props.disabled[control.type] }
                label={ control.label }
                key={ index }
                addIngredientHandler={ () => props.addIngredientHandler(control.type) }
                removeIngredientHandler={ () => props.removeIngredientHandler(control.type) }
            />
        )) }
        <button
            onClick={props.ordered }
            disabled={ props.purchasable }
            className={ classes.OrderButton }>
            Order Now
        </button>
    </div>
);

export default buildControls;