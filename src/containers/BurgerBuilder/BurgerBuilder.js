import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {

    state = {
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
        this.props.history.push('/checkout');
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(iKey => {
                return ingredients[iKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    /*
    calculateInitialPrice() {
        if (this.state.ingredients == null) return;
        let price = 0;
        Object.keys(this.state.ingredients).forEach(i => {
            price += this.state.ingredients[i] * INGREDIENT_PRICES[i];
        });
        return price;
    }
    */

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        if (this.props.ings) {
            orderSummary = <OrderSummary
                ingredients={ this.props.ings }
                purchaseCancelled={ this.purchaseCancelHandler }
                purchaseContinue={ this.purchaseContinueHandler }
                totalPrice={ this.props.price.toFixed(2) }
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        let burger = this.state.error ? <p>Error loading ingredients.</p> : <Spinner/>;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={ this.props.ings }/>
                    <BuildControls
                        ordered={ this.updatePurchasing }
                        totalPrice={ this.props.price }
                        disabled={ disabledInfo }
                        addIngredientHandler={ this.props.onIngredientAdded }
                        removeIngredientHandler={ this.props.onIngredientRemoved }
                        purchasable={ !this.updatePurchaseState(this.props.ings) }
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));