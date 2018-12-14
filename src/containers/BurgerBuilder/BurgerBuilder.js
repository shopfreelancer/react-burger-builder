import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
class BurgerBuilder extends Component {


    state = {
      ingredients: {
          salad: 1,
          bacon: 1,
          cheese: 2,
          meat: 2
      }
    };

    render() {
        return (
            <Aux>
                <Burger />
                <BuildControls/>´
            </Aux>
        )
    }
}

export default BurgerBuilder;