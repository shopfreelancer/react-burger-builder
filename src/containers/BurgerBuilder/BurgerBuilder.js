import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.6,
    meat: 3,
    bacon: 0.7,
    cheese: 0.5
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: true,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        /*
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
                const newPrice = this.calculateInitialPrice();
                this.setState({ totalPrice: newPrice });
            })
            .catch(err => this.setState({ error: true }));
            */

    }

    // needs to be arrow function as it is passed as a prop
    updatePurchasing = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({ pathname: '/checkout', search: '?' + queryString });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(iKey => {
                return ingredients[iKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    calculateInitialPrice() {
        if (this.state.ingredients == null) return;
        let price = 0;
        Object.keys(this.state.ingredients).forEach(i => {
            price += this.state.ingredients[i] * INGREDIENT_PRICES[i];
        });
        return price;
    }

    addIngredient = (type) => {

        // update state in immutable way
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = oldCount + 1;

        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredient = (type) => {

        const oldCount = this.state.ingredients[type];
        const oldPrice = this.state.totalPrice;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        if (oldCount >= 1) {
            updatedIngredients[type] = oldCount - 1;
            const newPrice = oldPrice - INGREDIENT_PRICES[type];
            this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
            this.updatePurchaseState(updatedIngredients);
        }
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        if (this.state.ingredients) {
            orderSummary = <OrderSummary
                ingredients={ this.state.ingredients }
                purchaseCancelled={ this.purchaseCancelHandler }
                purchaseContinue={ this.purchaseContinueHandler }
                totalPrice={ this.state.totalPrice.toFixed(2) }
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        let burger = this.state.error ? <p>Error loading ingredients.</p> : <Spinner/>;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={ this.state.ingredients }/>
                    <BuildControls
                        ordered={ this.updatePurchasing }
                        totalPrice={ this.state.totalPrice }
                        disabled={ disabledInfo }
                        addIngredientHandler={ this.addIngredient }
                        removeIngredientHandler={ this.removeIngredient }
                        purchasable={ !this.state.purchasable }
                    />
                </Aux>);
        }

        return (
            <Aux>
                <Modal show={ this.state.purchasing } modalClose={ this.purchasedCancelHandler }>
                    { orderSummary }
                </Modal>
                { burger }

            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);