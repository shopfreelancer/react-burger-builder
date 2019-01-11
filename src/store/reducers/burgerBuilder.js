import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.6,
    meat: 3,
    bacon: 0.7,
    cheese: 0.5
};

const calculateBurgerPrice = (ingredients) => {
    let price = 0;
    if (ingredients == null) return 0;
    Object.keys(ingredients).forEach(i => {
        price += ingredients[i] * INGREDIENT_PRICES[i];
    });
    return price;
}

const burger = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case(actionTypes.REMOVE_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case(actionTypes.SET_INGREDIENTS):
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: calculateBurgerPrice(action.ingredients),
                error: false
            };
        case(actionTypes.FETCH_INGREDIENTS_FAILED):
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }

};
export default burger;