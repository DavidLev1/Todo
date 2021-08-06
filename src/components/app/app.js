import React, { Component } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import ModalComponent from '../modal-component';
import './app.css';
import { 
  setUpdatedTasksData, 
  getUpdatedTasksData,
  setMaxId,
  getMaxId
} from '../../utils/storage-state';


export default class App extends Component {
  // TODO: Save state value and get it from local storage
  

  state = {
    // TODO: Get all tasks/items array from the Local Storage, it's 'items' value
    items: [
      // { id: 1, label: 'Drink Coffee', important: false, done: false },
      // { id: 2, label: 'Learn React', important: true, done: false },
      // { id: 3, label: 'Make Awesome App', important: false, done: false },
      // this.createItem('Drink Coffee'),
      // this.createItem('Learn React'),
      // this.createItem('Make Awesome App'),
    ],
    filter: 'all', // Filter button type (All, Undone, Done)
    search: '', // Todos search
    toShowModal: false,
    isAddTaskBtnActive: true,
    maxId: 100
  };


  componentDidMount() {
    if(!getUpdatedTasksData()) setUpdatedTasksData(this.state.items);
    if(!getMaxId()) setMaxId(this.state.maxId);

    this.setState({ items: getUpdatedTasksData()});
    this.setState({ maxId: getMaxId()});
  };


  toggleModal = () => {
    this.setState({ toShowModal: !this.state.toShowModal });
    this.setState({ isAddTaskBtnActive: !this.state.isAddTaskBtnActive });
  };


  // Add Todo item by its text
  onItemAdded = (todoText) => {
    if (!todoText) {
      this.toggleModal();

      setTimeout(() => {
        this.toggleModal();
      }, 5000);
      return;
    };

    // When user inserted any text to a new task - add that task/todo data to Local Storage (and state)
    const item = this.createItem(todoText);

    // setState is async, but its callback func executed after the state updated
    this.setState((state) => ({
      items: [...state.items, item]
    }), () => {
      setUpdatedTasksData(this.state.items);
      console.log(getUpdatedTasksData());
      return this.state.items;  // = return getUpdatedTasksData();
    });


    // this.setState((state) => {
    //   const item = this.createItem(todoText);
    //   return { items: [...state.items, item] };
    // });
  };



  // Param 1 - array of Todo/Tasks objects (get it from the Local Storage)
  // Param 2 - id of wanted Todo object
  // Param 3 - property name
  toggleProperty = (arr, id, propName) => {
    // Index of arr on which found the item (by its id)
    const idx = arr.findIndex((item) => item.id === id);

    const oldItem = arr[idx];

    // value of toggled property
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value };

    // TODO: Set this new array to the Local Storage
    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  };


  // Toggle Todo/Task item (by its id) as done/Not done
  onToggleDone = (id) => {
    this.setState((state) => {
      // TODO: Instead state.items get items/tasks array from the Local Storage?
      const items = this.toggleProperty(state.items, id, 'done');
      return { items };
    }, () => {
      setUpdatedTasksData(this.state.items);
      console.log(getUpdatedTasksData());
    });
  };


  // Toggle TODO item (by its id) as important/unimportant 
  onToggleImportant = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'important');
      return { items };
    }, () => {
      setUpdatedTasksData(this.state.items);
      console.log(getUpdatedTasksData());
    });
  };


  // Delete Todo/Task item by its id
  onDelete = (id) => {
    //console.log(id);

    this.setState((prevState) => {
      // idx - index of wanted Todo/Task in the array
      const idx = prevState.items.findIndex((item) => item.id === id);

      // Delete from items/tasks the Todo/Task by its idx
      const updatedItems = [
        // Can't change fields of original state (prevState), so we copy them
        // 'slice' method doesn't change the original array
        ...prevState.items.slice(0, idx),
        ...prevState.items.slice(idx + 1),
      ];
      {prevState.items = updatedItems}
      return {updatedItems};
      }, () => {
        setUpdatedTasksData(this.state.items);
        console.log(getUpdatedTasksData());

        if(getUpdatedTasksData().length === 0) {
          localStorage.removeItem('tasksData');
          localStorage.removeItem('maxId');
          //localStorage.clear();
        }
      }); 
  };


  onFilterChange = (filter) => {
    this.setState({ filter });
  };


  onSearchChange = (search) => {
    this.setState({ search });
  };


  // Called when we call to 'onItemAdded' method
  // Creates Todo item
  createItem(todoText) {
    setMaxId(++this.state.maxId);

    return {
      id: getMaxId(),
      label: todoText,
      important: false,
      done: false,
    };
  }


  // TODO: That finction must get 'items' array from the Local Storage
  // items - array of Todo objects
  // filter - which type of Todos objs to show
  filterItems(items, filter) {
    // if (filter === 'all') {
    //   return items;
    // } else if (filter === 'active') {
    //   return items.filter((item) => (!item.done));
    // } else if (filter === 'done') {
    //   return items.filter((item) => item.done);
    // }

    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }


  // TODO: That finction must get 'items' array from the Local Storage
  // items - array of Todo objects
  // search -
  searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }


  render() {
    // TODO: Get all taht data from the Local Storage enstead get it from the state
    const { items, filter, search, toShowModal } = this.state;

    // 'filter' method creates a new array, so we don't change the original array
    const doneCount = items.filter((item) => item.done).length;
    //const doneCount = items.filter((item) => item.done).length;


    // Number of undone Todos
    const todoCount = items.length - doneCount;

    const visibleItems = this.searchItems(
      this.filterItems(items, filter),
      search
    );

    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className='search-panel d-flex'>
          <SearchPanel onSearchChange={this.onSearchChange} />
          {/* &nbsp; */}
        </div>

        <div className='filter-btns'>
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        

        <TodoList
          items={visibleItems}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          onDelete={this.onDelete}
        />

        <div className='add-task-form'>
          <ItemAddForm
            onItemAdded={this.onItemAdded}
            isFormBtnActive={this.state.isAddTaskBtnActive}
          />
        </div>

        {toShowModal && <ModalComponent />}
      </div>
    );
  }
}
