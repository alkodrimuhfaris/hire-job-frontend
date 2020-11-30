import React from 'react'
import Main from './screens'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import store from './redux/store'

const App = () => {
  return (
    <Provider store={store().store}>
      <PersistGate loading={null} persistor={store().persistore}>
        <Main />
      </PersistGate>
    </Provider>
  )
}

export default App
