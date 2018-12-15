import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 3,
    bacon: 0.7,
    cheese: 0.5
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        },
        totalPrice: 4
    };

    addIngredient = (type) => {

        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = oldCount + 1;

        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({ingredients:updatedIngredients, totalPrice: newPrice});
    };

    removeIngredient = (type) => {

        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };

        if(oldCount > 0) {
            updatedIngredients[type] = oldCount - 1;
            const newPrice = INGREDIENT_PRICES[type] - this.state.totalPrice;
            this.setState({ingredients:updatedIngredients, totalPrice: newPrice});
        }

    };


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    disabled={disabledInfo}
                    addIngredientHandler={this.addIngredient}
                    removeIngredientHandler={this.removeIngredient}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;