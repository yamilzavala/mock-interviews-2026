import './App.css'
import {fileData} from './components/core-mocks/8-FileExplorer-mock/data'
import FileExplorer from './components/core-mocks/8-FileExplorer-mock/FIleExplorer'
import Autocomplete from './components/full-interview/autocomplete/Autocomplete'
import DataTable from './components/full-interview/dataTable/DataTable'
import LikeButton from './components/full-interview/optimisticLikeButton/LikeButton'
import Dashboard from './components/full-interview/searchUsersLoadMore/Dashboard'

// const dataTabla = [
//   { id: 1, name: "John", age: 28 },
//   { id: 2, name: "Ana", age: 22 },
//   { id: 3, name: "Paul", age: 32 },
//   { id: 4, name: "Jack", age: 40 },
//   { id: 5, name: "Marie", age: 35 },
//   { id: 6, name: "Stefany", age: 56 },
//   { id: 7, name: "Angie", age: 33 },
//   { id: 8, name: "Luck", age: 19 },
//   { id: 9, name: "John", age: 22 },
//   { id: 10, name: "Sofie", age: 46 },
// ]

function App() {
  return (
    <>
      <section id="center">
       {/* <ExerciseRunner /> */}

        {/* <FileExplorer data={fileData} /> */}
        <Autocomplete />

      </section>
    </>
  )
}

export default App
