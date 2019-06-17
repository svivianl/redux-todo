const initialState = {
    todos: [],
    id: 0
};

function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'ADD_TODO':
            var newState = {...state};
            newState.id ++;
            return{
                ...newState,
                todos: [...newState.todos, {task: action.task, id: newState.id}]
            };

        case 'REMOVE_TODO':
            let todos = state.todos.filter(value => value.id !== +action.id);
            return {...state, todos};

        default:
            return state;
    }
}

const store = Redux.createStore(rootReducer);

$(document).ready(() => {
    $('ul').on('click', 'button', (e) => {
       store.dispatch({
           type: 'REMOVE_TODO',
           id: $(e.target).attr('id')
       });

       $(e.target).parent().remove();
    });

    $('form').on('submit', (e) => {
        e.preventDefault();
        let newTask = $('#task').val();
        store.dispatch({
            type: 'ADD_TODO',
            task: newTask
        });

        let newState = store.getState();
        let newLi = $('<li>', {text: newTask});
        let newButton = $('<button>', {text: 'X', id: newState.id});
        newLi.append(newButton);
        $('#todos').append(newLi);

        // reset clears any form values
        $('form').trigger('reset');
        /*
        //clear task
        $('#task').val('');
        */
    });
})