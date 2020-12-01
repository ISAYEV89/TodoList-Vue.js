<template>

        <div class="card">
            <div class="card-block">

                <button type="button" class="btn btn-link float-right"
                        @click="listDelete(list.id,  list.title)">❌
                </button>

                <button type="button" class="btn btn-link float-right mr-3" @click="listDone(list.id)">✔️
                </button>

                <button type="button" class="btn btn-link float-right js-change" @click="dataUpdate(list.id)">Change
                </button>

                <p class="card-title lead" :class="list.status ? 'done' : ''" v-if="!showInput">
                    {{list.title}} </p>

                <input v-on:keyup.enter="todoUpdate($event, list.id)"
                       type="text"
                       class="form-control input w-75"
                       placeholder="Enter text"
                       :value="list.title"
                       v-else>
            </div>
        </div>

</template>

<script>

    import {eventBus} from "../main";

    export default {
        data() {
            return {
                showInput: false,
            }
        },
        props: ['list'],
        methods: {
            listDone(event) {

                let todos = JSON.parse(localStorage.getItem("todos"));
                for (let i = 0; i < todos.length; i++) {
                    if (todos[i].id === event) {
                        todos[i].status = !todos[i].status;
                    }
                }
                eventBus.$emit('todoData', todos);
                localStorage.setItem("todos", JSON.stringify(todos));

            },
            dataUpdate(event) {

                this.showInput = !this.showInput;

            },
            todoUpdate(e, event) {
                let todos = JSON.parse(localStorage.getItem("todos"));

                console.log(e.target.value);

                for (let i = 0; i < todos.length; i++) {
                    if (todos[i].id === event) {
                        todos[i].title = e.target.value;
                    }
                }

                eventBus.$emit('todoData', todos);

                localStorage.setItem("todos", JSON.stringify(todos));
                // this.changeTodo = !this.changeTodo;
            },
            listDelete(id, title) {



                // this.todoModal = !this.todoModal;


                eventBus.$emit('modal', id, title  )
            },
        }
    }


</script>