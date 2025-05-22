import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../authApi'
import { toast } from 'react-hot-toast';


export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async(userId, thunkAPI) => {
        const { data, error } = await supabase
            .from('todoss')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) return thunkAPI.rejectWithValue(error.message);
        return data;
    }
);

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async({ text, userId }, thunkAPI) => {
        const { data, error } = await supabase
            .from('todoss')
            .insert([{ text, user_id: userId, complete: false }])
            .select();
        if (error) return thunkAPI.rejectWithValue(error.message);
        return data[0];
    }
);

export const removeTodo = createAsyncThunk(
    'todos/removeTodo',
    async(id, thunkAPI) => {
        const { error } = await supabase.from('todoss').delete().eq('id', id);
        if (error) return thunkAPI.rejectWithValue(error.message);
        return id;
    }
);


export const toggleComplete = createAsyncThunk(
    'todos/toggleComplete',
    async({ id, current }, thunkAPI) => {
        const { data, error } = await supabase
            .from('todoss')
            .update({ complete: !current })
            .eq('id', id)
            .select();

        if (error) return thunkAPI.rejectWithValue(error.message);
        return data[0];
    }
);


const initialState = {
    items: [],
    loading: false,
    error: null,
};


const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // fetchTodos
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error('دریافت وظایف شکست خورد');
            })

        // addTodo
        .addCase(addTodo.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
                toast.success('وظیفه با موفقیت اضافه شد');
            })
            .addCase(addTodo.rejected, (_, action) => {
                toast.error('افزودن وظیفه شکست خورد');
            })

        // removeTodo
        .addCase(removeTodo.fulfilled, (state, action) => {
                state.items = state.items.filter((todo) => todo.id !== action.payload);
                toast.success('وظیفه حذف شد');
            })
            .addCase(removeTodo.rejected, (_, action) => {
                toast.error('حذف وظیفه شکست خورد');
            })

        // toggleComplete
        .addCase(toggleComplete.fulfilled, (state, action) => {
                const index = state.items.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(toggleComplete.rejected, () => {
                toast.error('تغییر وضعیت وظیفه شکست خورد');
            });
    },
});

export default todosSlice.reducer;