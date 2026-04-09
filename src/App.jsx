import './App.css'
import { useState } from 'react'

import ExerciseRunner from './components/exercices-runner/ExerciseRunner'
import UserList from './components/mock_1_user_list/UserList'
import TasksManager from './components/mock_2_task_list/TasksManager'
import InfiniteScrollPosts from './components/mock_3_infinity_scroll/InfiniteScrollPosts'
import DataTable from './components/mock_4_table/DataTable'
import Autocomplete from './components/mock_5_autocomplete/Autocomplete'
import EditableList from './components/mock_6_editable_list/EditableList'
import DebouncedSearchWithCache from './components/mock_7_debounce_with-cache/DebouncedSearchWithCache'
import VirtualizedInfiniteList from './components/mock_8_optimized_infinite_list_without_duplicates/OptimizedList'
import OTPInput_1 from './components/mock_9_one_time_password/OTPInput_1'
import OTPInput_2 from './components/mock_9_one_time_password/OTPInput_2'
import JobBoard from './components/mock_10_job_board/JobBoard'
import LikeButton from './components/mock_11_like_button/with_rollback/LikeButton_1'
import LikeButton_2 from './components/mock_11_like_button/likeBtn/LikeButton_2'
import MultiSelect from './components/mock_12_multi-select-dropdown-with-async-search/MultiSelect'


// const dataTabla = [
//   { id: 1, name: "John", age: 28 },
//   { id: 2, name: "Ana", age: 22 },
//   { id: 3, name: "b", age: 28 },
//   { id: 4, name: "c", age: 22 },
//   { id: 5, name: "d", age: 28 },
//   { id: 6, name: "e", age: 22 },
//   { id: 7, name: "lala", age: 28 },
//   { id: 8, name: "Ansdfdsfa", age: 22 },
//   { id: 9, name: "f", age: 28 },
//   { id: 10, name: "g", age: 22 },
//   { id: 11, name: "h", age: 28 },
//   { id: 12, name: "i", age: 22 },
//   { id: 13, name: "j", age: 28 },
//   { id: 14, name: "k", age: 22 },
//   { id: 15, name: "l", age: 28 },
//   { id: 16, name: "m", age: 22 },
// ]

function App() {

  return (
    <>
      <section id="center">
       {/* <ExerciseRunner /> */}

       {/* <UserList /> */}
       {/* <TasksManager /> */}
       {/* <InfiniteScrollPosts /> */}
       {/* <DataTable data={dataTabla} /> */}
       {/* <Autocomplete /> */}
        {/* <EditableList /> */}
        {/* <DebouncedSearchWithCache /> */}
        {/* <VirtualizedInfiniteList /> */}
        {/* <OTPInput_1 onComplete={(code) => {
          console.log('CODE: ', code)
        }} /> */}
        {/* <OTPInput_2 /> */}
        {/* <JobBoard /> */}
        {/* <LikeButton /> */}
        {/* <LikeButton_2 /> */}
        <MultiSelect />
      </section>
    </>
  )
}

export default App
