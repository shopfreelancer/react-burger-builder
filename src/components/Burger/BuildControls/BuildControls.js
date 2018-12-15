import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map((control,index) => (
            <BuildControl
                disabled={props.disabled[control.type]}
                label={control.label}
                key={index}
                addIngredientHandler={ () => props.addIngredientHandler(control.type)}
                removeIngredientHandler={ () => props.removeIngredientHandler(control.type)}
            />
        ))}
    </div>
);

export default buildControls;