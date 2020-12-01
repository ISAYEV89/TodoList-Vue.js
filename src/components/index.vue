<template>
    <div>
        <nav class="navbar navbar-inverse">
            <div class='container'>
                <span class="navbar-brand">Todos</span>
            </div>
        </nav>

        <!-- Main -->
        <div class="main container rounded p-3 mt-3">
            <form class="form-group mb-5">
                <input type="text" id="input" class="form-control mb-2"
                       placeholder="What do you want to do?"
                       v-model="newTodo"
                       @keyup.enter="addNewTodo">
            </form>

            <div class="cards">
                <appCard v-for="(list, index) in todoList" :key="index" :id="list.id" :list="list" v-if="!list.status"></appCard>
                <appCard v-for="(list, index) in todoList" :key="index" :id="list.id" :list="list" v-if="list.status"></appCard>
            </div>

        </div>
        <footer class="footer">
            <div class="container">
                <a href="" @click.prevent="deleteTodo">🔴&nbsp;Reset</a>
            </div>
        </footer>

        <!--Modal-->

        <div class="modal" v-if="todoModal">
            <div>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Are you sure you want to delete</h5>
                            <button type="button" class="close" @click="todoModal = !todoModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <p><strong>{{deleteItemTitle}}</strong></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="todoModal = !todoModal">Cancel
                            </button>
                            <button type="button" class="btn btn-danger" @click="deleteItem">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import Swal from "sweetalert2";
    import appCard from './card';
    import {eventBus} from "../main";


    export default {
        components: {
            appCard
        },
        data() {
            return {
                todoList: [],
                newTodo: '',
                todoModal: false,
                deleteItemId: '',
                deleteItemTitle: '',
                changeTodo: true,
                changeInfo: '',
            }
        },
        methods: {

            addNewTodo() {
                let todos;
                if (localStorage.getItem("todos") === null) {
                    todos = []
                } else {
                    todos = JSON.parse(localStorage.getItem("todos"))
                }

                let todosId;
                if (localStorage.getItem("todosId") === null) {
                    todosId = 0;
                } else {
                    todosId = JSON.parse(localStorage.getItem("todosId"))
                }
                todosId++;

                let repeat = false;

                for (let i = 0; i < todos.length; i++) {
                    if (todos[i].title === this.newTodo) {
                        repeat = true;
                    }
                }
                if (repeat) {
                    Swal.fire({
                        icon: "error",
                        text: "Movcuddur"
                    });
                } else {
                    let data = {"id": todosId, "title": this.newTodo, "status": false};
                    todos.push(data);
                    this.newTodo = '';
                    localStorage.setItem("todos", JSON.stringify(todos));
                    localStorage.setItem("todosId", JSON.stringify(todosId));
                    this.todoList = this.todoList || [];
                    this.todoList.push(data);
                }
            },
            deleteTodo() {
                window.localStorage.clear();
                this.todoList = [];
            },
            deleteItem() {

                let todos = JSON.parse(localStorage.getItem("todos"));
                for (let i = 0; i < todos.length; i++) {
                    if (todos[i].id === this.deleteItemId) {
                        todos.splice(i, 1);
                    }
                }
                this.todoList = todos;
                localStorage.setItem("todos", JSON.stringify(todos));
                this.todoModal = !this.todoModal;
            },
        },
        created() {
            this.todoList = JSON.parse(localStorage.getItem("todos"));

            eventBus.$on('todoData', (data) => {
                this.todoList = data;
            });

            eventBus.$on('modal', (id , title)=> {
                this.todoModal = !this.todoModal;
                this.deleteItemTitle = title;
                this.deleteItemId = id;
            })
        }
    }


</script>

<style>

</style>
