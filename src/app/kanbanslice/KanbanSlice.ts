import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { cardsProps, kanbanColumsProps } from "../../Types/KanbanTypes";

interface KanbanState {
  columns: kanbanColumsProps[];
  cards: cardsProps[];
}

const initialState: KanbanState = {
  columns: [
    {
      id: 1,
      title: "Draft",
    },
    {
      id: 2,
      title: "Unsolved",
    },
    {
      id: 3,
      title: "Under Review",
    },
    {
      id: 4,
      title: "Solved",
    },
    {
      id: 5,
      title: "Needs",
    },
  ],
  cards: [
    {
      id: 1,
      date: "3 Jan, 4:35 PM",
      description: "Server Side Template Injection (Blind)",
      status: "Critical",
      source: "Hypejab",
      rating: 8.8,
      verified: true,
      title: "Draft",
    },
    {
      id: 2,
      date: "3 Jan, 4:35 PM",
      description: "Pll Disclosure",
      status: "Medium",
      source: "Getastra",
      rating: 4.5,
      verified: false,
      title: "Draft",
    },
    {
      id: 3,
      date: "3 Jan, 4:35 PM",
      description: ".svn/entries Found",
      status: "Low",
      source: "Hypejab",
      rating: 2.3,
      verified: false,
      title: "Unsolved",
    },
    {
      id: 4,
      date: "3 Jan, 4:35 PM",
      description: "JSON Web Key Set Disclosed",
      status: "High",
      source: "Source Code",
      rating: 6.5,
      verified: false,
      title: "Under Review",
    },
    {
      id: 5,
      date: "3 Jan, 4:35 PM",
      description: "WordPress Database Backup File Found",
      status: "Medium",
      source: "Getastra",
      rating: 6.5,
      verified: true,
      title: "Under Review",
    },
    {
      id: 6,
      date: "3 Jan, 4:35 PM",
      description: "Phpmyadmin Information Schema Disclosure",
      status: "Critical",
      source: "Hypejab",
      rating: 6.5,
      verified: false,
      title: "Solved",
    },
    {
      id: 7,
      date: "3 Jan, 4:35 PM",
      description: "Server Side Template Injection (Blind)",
      status: "Critical",
      source: "Source Code",
      rating: 6.5,
      verified: false,
      title: "Solved",
    },
    {
      id: 8,
      date: "3 Jan, 4:35 PM",
      description: "Pll Disclosure",
      status: "Critical",
      source: "Getastra",
      rating: 6.5,
      verified: false,
      title: "Solved",
    },
    {
      id: 9,
      date: "3 Jan, 4:35 PM",
      description: ".svn/entries Found",
      status: "Medium",
      source: "Getastra",
      rating: 6.5,
      verified: false,
      title: "Solved",
    },
    {
      id: 10,
      date: "3 Jan, 4:35 PM",
      description: "JSON Web Key Set Disclosed",
      status: "Low",
      source: "Hypejab",
      rating: 6.5,
      verified: false,
      title: "Solved",
    },
    {
      id: 11,
      date: "3 Jan, 4:35 PM",
      description: "WordPress Database Backup File Found",
      status: "Low",
      source: "Hypejab",
      rating: 6.5,
      verified: false,
      title: "Needs",
    },
  ],
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    addCard: (
      state,
      action: PayloadAction<{
        date: string;
        description: string;
        status: string;
        source: string;
        rating: number;
        verified: boolean;
        title: string;
      }>
    ) => {
      const cardId =
        state.cards.length > 0 ? state.cards[state.cards.length - 1].id : 0;
        state.cards.push({
          order: state.cards.length + 1,
        id: cardId + 1,
        ...action.payload,
      });
    },
    sortCard: (state) => {
      const priority: Record<string, number> = {
        Critical: 4,
        High: 3,
        Medium: 2,
        Low: 1,
      };

      state.cards.sort((a, b) => {
        return (priority[a.status] ?? 99) - (priority[b.status] ?? 99);
      });
    },
    unsortCard: (state) => {
      state.cards.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    },
    deleteCard: (state, action: PayloadAction<number>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    editCard: (
      state,
      action: PayloadAction<{
        id: number;
        date: string;
        description: string;
        status: string;
        source: string;
        rating: number;
        verified: boolean;
        title: string;
      }>
    ) => {
      const index = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );
      if (index !== -1) {
        state.cards[index] = {
          ...state.cards[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addCard, sortCard, deleteCard, editCard, unsortCard } = kanbanSlice.actions;

export default kanbanSlice.reducer;
