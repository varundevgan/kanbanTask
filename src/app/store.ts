import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from '../app/kanbanslice/KanbanSlice'

export const store = configureStore({
    reducer:{
        kanban: kanbanReducer
    }
})

export type RootState = ReturnType<typeof store.getState>