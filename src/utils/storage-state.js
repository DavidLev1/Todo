// export const setUpdatedWholeData = updatedWholeData => {
//   return localStorage.setItem('wholeData', JSON.stringify(updatedWholeData));
// }

// export const getUpdatedWholeData = () => {
//   return JSON.parse(localStorage.getItem('wholeData'));
// }


export const setUpdatedTasksData = updatedTasksData => {
  // JSON.stringify - convert data to string format (Local Storage stores all data as strings)
  return localStorage.setItem('tasksData', JSON.stringify(updatedTasksData));
}

export const getUpdatedTasksData = () => {
  // JSON.parse - converts serialized string data stored in Local Storage to array/object
  return JSON.parse(localStorage.getItem('tasksData'));
}


export const setMaxId = maxIdValue => {
  return localStorage.setItem('maxId', JSON.stringify(maxIdValue));
}

export const getMaxId = () => {
  return JSON.parse(localStorage.getItem('maxId'));
}